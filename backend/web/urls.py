from django.urls import path, include
from rest_framework import routers
from .views import *

router = routers.DefaultRouter()
router.register(r'users', UserView, basename='user')
router.register(r'cities', CityView, basename='city')
router.register(r'institutions', InstitutionView, basename='institution')
router.register(r'menu-item-types', MenuItemTypeView, basename='menuitemtype')
router.register(r'roles', RoleView, basename='role')
router.register(r'type-documents', TypeDocumentView, basename='typedocument')
router.register(r'collaborators', CollaboratorView, basename='collaborator')
router.register(r'departments', DepartmentView, basename='department')
router.register(r'districts', DistrictView, basename='district')
router.register(r'menu-items', MenuItemView, basename='menuitem')
router.register(r'customers', CustomerView, basename='customer')
router.register(r'delivery-points', DeliveryPointView, basename='deliverypoint')
router.register(r'menu-availabilities', MenuAvailabilityView, basename='menuavailability')
router.register(r'orders', OrderView, basename='order')
router.register(r'bags', BagView, basename='bag')
router.register(r'bag-items', BagItemView, basename='bagitem')

urlpatterns = [
    path('', include(router.urls))
]