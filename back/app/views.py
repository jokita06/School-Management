from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import FuncionarioSerializer, AmbienteAulaSerializer, DisciplinaSerializer, LoginSerializer
from .models import Funcionario, Disciplina, AmbienteAula
from .permissions import permissao_gestor
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework import permissions

class Login(TokenObtainPairView):
    serializer_class = LoginSerializer

# Listar e Criar funcionários
class Funcionario_GET_POST(ListCreateAPIView): # Criar e listar objetos
    queryset = Funcionario.objects.all() # Pegar todos os objetos de Funcionário
    serializer_class = FuncionarioSerializer # Quais informações serão exibidas
    permission_classes = [permissao_gestor] # Apenas o gestor pode efetuar 

# Mostrar (id), atualizar e deletar um funcionário
class Funcionario_GET_PUT_PATCH_DELETE(RetrieveUpdateDestroyAPIView):
    queryset = Funcionario.objects.all()
    serializer_class = FuncionarioSerializer
    permission_classes = [permissao_gestor] # Apenas o gestor pode efetuar 
    lookup_field = 'pk' # Define que a busca será feita pela chave primária

# Listar e Criar disciplina
class Disciplina_GET_POST(ListCreateAPIView):
    queryset = Disciplina.objects.all()
    serializer_class = DisciplinaSerializer
    
    def get_permissions(self):

        # Se o metódo for GET todos os que estão autenticados podem ver
        if self.request.method == 'GET':
            return [permissions.IsAuthenticated()]
        # Caso contrário, apenas o gestar podem criar
        return [permissao_gestor()]
    
    def get_queryset(self):
        user = self.request.user
        if user.cargo == 'P':
            return Disciplina.objects.filter(professor=user)
        return Disciplina.objects.all()
    
# Mostrar (id), atualizar e deletar um Disciplina
class Disciplina_GET_PUT_PATCH_DELETE(RetrieveUpdateDestroyAPIView):
    queryset = Disciplina.objects.all()
    serializer_class = DisciplinaSerializer
    permission_classes = [permissao_gestor] # Apenas o gestor pode efetuar 
    lookup_field = 'pk'

# Listar e Criar Ambiente de aula
class AmbienteAula_GET_POST(ListCreateAPIView):
    queryset = AmbienteAula.objects.all()
    serializer_class = AmbienteAulaSerializer

    def get_permissions(self):
        
        # Se o metódo for GET todos os que estão autenticados podem ver
        if self.request.method == 'GET':
            return [permissions.IsAuthenticated()]
        # Caso contrário, apenas o gestar podem criar
        return [permissao_gestor()]
    
    def get_queryset(self):
        user = self.request.user
        if user.cargo == 'P':
            return AmbienteAula.objects.filter(professor=user)
        return AmbienteAula.objects.all()
    
# Mostrar (id), atualizar e deletar um Ambiente de aula
class AmbienteAula_GET_PUT_PATCH_DELETE(RetrieveUpdateDestroyAPIView):
    queryset = AmbienteAula.objects.all()
    serializer_class = AmbienteAulaSerializer
    permission_classes = [permissao_gestor] # Apenas o gestor pode efetuar 
    lookup_field = 'pk' 