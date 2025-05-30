from django.urls import path, include
from rest_framework.routers import DefaultRouter
from tasks.views import TaskViewSet, register_user  # ✅ Absolute import

router = DefaultRouter()
router.register(r'tasks', TaskViewSet)                          # ✅ Register Task API routes

urlpatterns = [
    path('', include(router.urls)),                                    # ✅ Now accessible via `/api/tasks/`
    path('register/', register_user, name='register'),
]