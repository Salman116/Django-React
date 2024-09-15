
from django.urls import path, include
from . import views

urlpatterns = [
    path('books/', views.getBookings, name="bookings"),
    path('create-book', views.createBook, name="create-book")
]