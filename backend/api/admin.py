from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Event, Booking

class CustomUserAdmin(UserAdmin):
    list_display = ('email', 'name', 'role', 'is_active', 'is_staff')
    search_fields = ('email', 'name')
    ordering = ('email',)
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('name', 'role')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser',
                                    'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'name', 'password1', 'password2'),
        }),
    )

class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'date', 'price')
    search_fields = ('title', 'description', 'category')
    list_filter = ('category',)

class BookingAdmin(admin.ModelAdmin):
    list_display = ('user', 'event', 'created_at', 'status')
    list_filter = ('status',)
    search_fields = ('user__email', 'event__title')

admin.site.register(User, CustomUserAdmin)
admin.site.register(Event, EventAdmin)
admin.site.register(Booking, BookingAdmin)
