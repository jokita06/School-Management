from rest_framework.permissions import BasePermission

# Permissão para usuários do tipo Gestor
class permissao_gestor(BasePermission):
    def has_permission(self, request, view):
        # Verifica se o usuário está autenticado e se o cargo é 'G' (Gestor)
        if request.user.is_authenticated and request.user.cargo == 'G':
            return True
        # Caso contrário, nega permissão
        return False

# Permissão para usuários do tipo Professor
class permissao_professor(BasePermission):
    def has_permission(self, request, view):
        # Verifica se o usuário está autenticado e se o cargo é 'P' (Professor)
        if request.user.is_authenticated and request.user.cargo == 'P':
            return True
        # Caso contrário, nega permissão
        return False

# Permissões para ações específicas 
class Funcoes_Gestor_Professor(BasePermission):
    def has_object_permission(self, request, view, obj):
        # Permissão total se for Gestor
        if request.user.cargo == 'G':
            return True
        # Se não for Gestor, só permite acesso ao objeto (ver)
        return obj.id == request.user.id