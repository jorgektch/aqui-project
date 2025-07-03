from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import *
from .serializers import *

from rest_framework import generics
from rest_framework_simplejwt.views import (
    TokenObtainPairView, TokenRefreshView
)

# Registro
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]  #  <-- público

# Login (JWT ya implementado por SimpleJWT)
class LoginView(TokenObtainPairView):
    permission_classes = [AllowAny]  #  <-- público




class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated]

class CityView(viewsets.ModelViewSet):
    serializer_class = CitySerializer
    queryset = City.objects.all()
    permission_classes = [IsAuthenticated]

class InstitutionView(viewsets.ModelViewSet):
    serializer_class = InstitutionSerializer
    queryset = Institution.objects.all()
    permission_classes = [IsAuthenticated]

class MenuItemTypeView(viewsets.ModelViewSet):
    serializer_class = MenuItemTypeSerializer
    queryset = MenuItemType.objects.all()
    permission_classes = [IsAuthenticated]

class RoleView(viewsets.ModelViewSet):
    serializer_class = RoleSerializer
    queryset = Role.objects.all()
    permission_classes = [IsAuthenticated]

class TypeDocumentView(viewsets.ModelViewSet):
    serializer_class = TypeDocumentSerializer
    queryset = TypeDocument.objects.all()
    permission_classes = [IsAuthenticated]

class CollaboratorView(viewsets.ModelViewSet):
    serializer_class = CollaboratorSerializer
    queryset = Collaborator.objects.all()
    permission_classes = [IsAuthenticated]

class DepartmentView(viewsets.ModelViewSet):
    serializer_class = DepartmentSerializer
    queryset = Department.objects.all()
    permission_classes = [IsAuthenticated]

class DistrictView(viewsets.ModelViewSet):
    serializer_class = DistrictSerializer
    queryset = District.objects.all()
    permission_classes = [IsAuthenticated]

class MenuItemView(viewsets.ModelViewSet):
    serializer_class = MenuItemSerializer
    queryset = MenuItem.objects.all()
    permission_classes = [IsAuthenticated]

class CustomerView(viewsets.ModelViewSet):
    serializer_class = CustomerSerializer
    queryset = Customer.objects.all()
    permission_classes = [IsAuthenticated]

class DeliveryPointView(viewsets.ModelViewSet):
    serializer_class = DeliveryPointSerializer
    queryset = DeliveryPoint.objects.all()
    permission_classes = [IsAuthenticated]

class MenuAvailabilityView(viewsets.ModelViewSet):
    serializer_class = MenuAvailabilitySerializer
    queryset = MenuAvailability.objects.all()
    permission_classes = [IsAuthenticated]

class OrderView(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    queryset = Order.objects.all()
    permission_classes = [IsAuthenticated]

class BagView(viewsets.ModelViewSet):
    serializer_class = BagSerializer
    queryset = Bag.objects.all()
    permission_classes = [IsAuthenticated]

class BagItemView(viewsets.ModelViewSet):
    serializer_class = BagItemSerializer
    queryset = BagItem.objects.all()
    permission_classes = [IsAuthenticated]