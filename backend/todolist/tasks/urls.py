from django.urls import path, include
from rest_framework.routers import DefaultRouter
from tasks.views import TaskViewSet, register_user , UserInfoAPIView # ✅ Absolute import

router = DefaultRouter()
router.register(r'tasks', TaskViewSet)                          # ✅ Register Task API routes

urlpatterns = [
    path('', include(router.urls)),                                    # ✅ Now accessible via `/api/tasks/`
    path('register/', register_user, name='register'),
    path('user/', UserInfoAPIView.as_view(), name='user-info'),         # ✅ get user info endpoint
]