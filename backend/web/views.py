from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import *
from .serializers import *

class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = [AllowAny]  # Acceso público

class CityView(viewsets.ModelViewSet):
    serializer_class = CitySerializer
    queryset = City.objects.all()
    permission_classes = [AllowAny]  # Acceso público

class InstitutionView(viewsets.ModelViewSet):
    serializer_class = InstitutionSerializer
    queryset = Institution.objects.all()
    permission_classes = [AllowAny]  # Acceso público

class MenuItemTypeView(viewsets.ModelViewSet):
    serializer_class = MenuItemTypeSerializer
    queryset = MenuItemType.objects.all()
    permission_classes = [AllowAny]  # Acceso público

class RoleView(viewsets.ModelViewSet):
    serializer_class = RoleSerializer
    queryset = Role.objects.all()
    permission_classes = [AllowAny]  # Acceso público

class TypeDocumentView(viewsets.ModelViewSet):
    serializer_class = TypeDocumentSerializer
    queryset = TypeDocument.objects.all()
    permission_classes = [AllowAny]  # Acceso público

class CollaboratorView(viewsets.ModelViewSet):
    serializer_class = CollaboratorSerializer
    queryset = Collaborator.objects.all()
    permission_classes = [AllowAny]  # Acceso público

class DepartmentView(viewsets.ModelViewSet):
    serializer_class = DepartmentSerializer
    queryset = Department.objects.all()
    permission_classes = [AllowAny]  # Acceso público

class DistrictView(viewsets.ModelViewSet):
    serializer_class = DistrictSerializer
    queryset = District.objects.all()
    permission_classes = [AllowAny]  # Acceso público

class MenuItemView(viewsets.ModelViewSet):
    serializer_class = MenuItemSerializer
    queryset = MenuItem.objects.all()
    permission_classes = [AllowAny]  # Acceso público

class CustomerView(viewsets.ModelViewSet):
    serializer_class = CustomerSerializer
    queryset = Customer.objects.all()
    permission_classes = [AllowAny]  # Acceso público

class DeliveryPointView(viewsets.ModelViewSet):
    serializer_class = DeliveryPointSerializer
    queryset = DeliveryPoint.objects.all()
    permission_classes = [AllowAny]

class MenuAvailabilityView(viewsets.ModelViewSet):
    serializer_class = MenuAvailabilitySerializer
    queryset = MenuAvailability.objects.all()
    permission_classes = [AllowAny]

class OrderView(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    queryset = Order.objects.all()
    permission_classes = [AllowAny]

class BagView(viewsets.ModelViewSet):
    serializer_class = BagSerializer
    queryset = Bag.objects.all()
    permission_classes = [AllowAny] 

class BagItemView(viewsets.ModelViewSet):
    serializer_class = BagItemSerializer
    queryset = BagItem.objects.all()
    permission_classes = [AllowAny]