from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError
from django.core.validators import MaxValueValidator, MinValueValidator, RegexValidator, MinLengthValidator

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
    
    telefone = models.CharField (
        max_length=13,
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

    def save(self, *args, **kwargs):
        self.full_clean()  # Executa validações do modelo
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.disciplina} - {self.sala_reservada} ({self.get_periodo_display()})"