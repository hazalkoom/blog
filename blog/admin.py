from django.contrib import admin
from blog.models import Post, Tag, Comment, AuthorProfile
# Register your models here.

admin.site.register(Tag)
admin.site.register(AuthorProfile)

class PostAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ("title",)}
    list_display = ('slug', 'published_at')
admin.site.register(Post, PostAdmin)
admin.site.register(Comment)
