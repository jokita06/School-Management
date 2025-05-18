from rest_framework import serializers
from .models import Funcionario, Disciplina, AmbienteAula
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class FuncionarioSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()
    class Meta:
        model = Funcionario
        fields = ['id', 'NI', 'username',  'email', 'telefone', 'dt_nascimento', 'cargo', 'full_name'] 
    def get_full_name(self,obj):
        return obj.get_full_name()

class DisciplinaSerializer(serializers.ModelSerializer):
    professor = serializers.StringRelatedField()
    class Meta:
        model = Disciplina
        fields = ['nome', 'carga_horaria', 'descricao','professor_id', 'professor']

class AmbienteAulaSerializer(serializers.ModelSerializer):
    class Meta:
        model = AmbienteAula
        fields = '__all__'

class LoginSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        
        data['funcionario'] = {
            'username': self.user.username,
            'cargo': self.user.cargo,
            'user_id': self.user.id
        }
        return data