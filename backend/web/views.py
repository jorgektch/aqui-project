from django.shortcuts import render
from rest_framework import viewsets
from .models import *
from .serializers import *

class CityView(viewsets.ModelViewSet):
    serializer_class = CitySerializer
    queryset = City.objects.all()

class InstitutionView(viewsets.ModelViewSet):
    serializer_class = InstitutionSerializer
    queryset = Institution.objects.all()

class TypeDocumentView(viewsets.ModelViewSet):
    serializer_class = TypeDocumentSerializer
    queryset = TypeDocument.objects.all()

class DepartmentView(viewsets.ModelViewSet):
    serializer_class = DepartmentSerializer
    queryset = Department.objects.all()

class DistrictView(viewsets.ModelViewSet):
    serializer_class = DistrictSerializer
    queryset = District.objects.all()

class DeliveryPointView(viewsets.ModelViewSet):
    serializer_class = DeliveryPointSerializer
    queryset = DeliveryPoint.objects.all()
