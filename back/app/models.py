from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError
from django.core.validators import MaxValueValidator, MinValueValidator, RegexValidator, MinLengthValidator
from datetime import date

class Funcionario(AbstractUser):
    NI = models.IntegerField(
        unique=True, 
        null=True, 
        blank=True, 
        validators=[
            MaxValueValidator(9999),
            MinValueValidator(1000)
        ]
    )
    
    dt_nascimento = models.DateField(null=True, blank=True)
    data_contratacao = models.DateField(null=False, blank=False, default=date.today)
    
    telefone = models.CharField (
        max_length=14,
        unique=True,
        validators=[
            MinLengthValidator(13),
            RegexValidator(
                regex='^\(\d{2}\)\d{5}-\d{4}$',
                message='Formato (00)00000-0000'
            )
        ],
        help_text="O telefone deve seguit o formato (00)00000-0000"
    )
    
    tipo_cargo = [
        ('G', 'Gestor'),
        ('P', 'Professor')
    ]
    cargo = models.CharField(max_length=1, choices=tipo_cargo, null=False, blank=False)

    def clean(self):
        super().clean()

        hoje = date.today()

        # Validação de contratação
        if self.data_contratacao > hoje:
            raise ValidationError("A data de contratação não pode ser futura.")

class Disciplina(models.Model):
    nome = models.CharField(max_length=60)
    carga_horaria = models.PositiveIntegerField()
    descricao = models.TextField(max_length=255)
    professor = models.ForeignKey(Funcionario, on_delete=models.CASCADE, limit_choices_to={'cargo':'P'})

    def __str__(self):
        return self.nome
    
    class Meta:
        verbose_name = 'Disciplina'
        verbose_name_plural = 'Disciplinas'

class SalaDeAula(models.Model):
    nome = models.CharField(max_length=20)

    def __str__(self):
        return self.nome

class AmbienteAula(models.Model):
    dt_inicio = models.DateField()
    dt_termino = models.DateField()
    sala_reservada = models.ForeignKey(SalaDeAula, on_delete=models.CASCADE)
    opcoes_periodo = [
        ('M', 'Manhã'),
        ('T', 'Tarde'),
        ('N', 'Noite')
    ]
    periodo = models.CharField(max_length=1, choices=opcoes_periodo)
    professor = models.ForeignKey(Funcionario, on_delete=models.CASCADE, limit_choices_to={'cargo':'P'})
    disciplina = models.ForeignKey(Disciplina, on_delete=models.CASCADE)

    def clean(self):
        super().clean()
        
        # Validação professor-disciplina
        if self.disciplina.professor != self.professor:
            raise ValidationError("A disciplina selecionada não está associada a este professor!")
        
        # Validação datas
        if self.dt_termino < self.dt_inicio:
            raise ValidationError("A data de término deve ser posterior à data de início!")
        
        # Validação de conflito de reserva 
        queryset = AmbienteAula.objects.filter(
            sala_reservada=self.sala_reservada,
            periodo=self.periodo,
            dt_inicio__lte=self.dt_termino,
            dt_termino__gte=self.dt_inicio
        )
        
        # Exclui a própria instância se já existir no banco
        if self.pk:
            queryset = queryset.exclude(pk=self.pk)
        
        if queryset.exists():
            conflito = queryset.first()
            raise ValidationError(
                f"Reserva existente na mesma data e perído de {conflito.disciplina}"
            )

    def save(self, *args, **kwargs):
        self.full_clean()  # Executa validações do modelo
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.disciplina} - {self.sala_reservada} ({self.get_periodo_display()})"