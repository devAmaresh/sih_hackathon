from django.contrib import admin
from django.urls import path
from django.urls import include
from django.http import HttpResponse

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("sih.urls")),
    path("", lambda request: HttpResponse("Welcome to the backend of the SIH project")),
]
