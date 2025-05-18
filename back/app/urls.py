from .views import Funcionario_GET_POST, Funcionario_GET_PUT_PATCH_DELETE, Disciplina_GET_POST, Disciplina_GET_PUT_PATCH_DELETE, AmbienteAula_GET_POST, AmbienteAula_GET_PUT_PATCH_DELETE, Login
from rest_framework_simplejwt.views import TokenRefreshView
from django.urls import path

urlpatterns = [
    # Autenticação
    path('login/', Login.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),
    
    # Funcionários (Gestores e Professores)
    path('funcionarios/', Funcionario_GET_POST.as_view()),
    path('funcionarios/<int:pk>/', Funcionario_GET_PUT_PATCH_DELETE.as_view()),
    
    # Disciplinas
    path('disciplinas/', Disciplina_GET_POST.as_view()),
    path('disciplinas/<int:pk>/', Disciplina_GET_PUT_PATCH_DELETE.as_view()),
    
    # Ambientes de Aula (Reservas)
    path('ambientes/', AmbienteAula_GET_POST.as_view()),
    path('ambientes/<int:pk>/', AmbienteAula_GET_PUT_PATCH_DELETE.as_view()),
]