from django.urls import path, include
from rest_framework import routers
from .views import *

router = routers.DefaultRouter()
router.register(r'cities', CityView, 'cities')
router.register(r'institutions', InstitutionView, 'institutions')
router.register(r'types-document', TypeDocumentView, 'types-document')
router.register(r'departments', DepartmentView, 'departments')
router.register(r'districts', DistrictView, 'districts')
router.register(r'delivery-points', DeliveryPointView, 'delivery-points')

urlpatterns = [
    path('', include(router.urls))
]