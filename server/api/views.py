from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .serializer import *
from .models import *
# Create your views here.

@api_view(['GET'])
def getBookings(request):
    qs = Book.objects.all()
    serializer = BookSerializer(qs, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

# {
#  "title": "Pirates of Carabian",
#  "release_year": 2002
# }

@api_view(['POST'])
def createBook(request):
    serializer = BookSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT', 'DELETE'])
def updatedeleteBook(request, pk):
    qs = Book.objects.filter(pk=pk).first()
    if not qs:
        return Response("Doesnot exists", status=status.HTTP_404_NOT_FOUND)
    if request.method == 'PUT':
        serializer = BookSerializer(qs, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        qs.delete()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response()