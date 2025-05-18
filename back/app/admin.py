from django.contrib import admin
from .models import Funcionario, Disciplina, AmbienteAula
from django.contrib.auth.admin import UserAdmin

class FuncionarioAdmin(UserAdmin):

    # Campos para edição do admin
    fieldsets = UserAdmin.fieldsets + (
        ('Informações Adicionais', {'fields': ('NI', 'dt_nascimento', 'telefone', 'cargo',)}),
    )
    # Campos para criação 
    add_fieldsets = UserAdmin.add_fieldsets + (
        (None, {'fields': ('NI', 'first_name', 'last_name', 'email', 'telefone', 'dt_nascimento', 'cargo',)}),
    )


# Registro dos modelos
admin.site.register(Funcionario, FuncionarioAdmin)  
admin.site.register(Disciplina)  
admin.site.register(AmbienteAula)  