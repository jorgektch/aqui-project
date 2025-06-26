from django.urls import path, include
from rest_framework import routers
from .views import *

router = routers.DefaultRouter()
router.register(r'cities', CityView, 'cities')
router.register(r'food-categories', FoodCategoryView, 'food-categories')
router.register(r'institutions', InstitutionView, 'institutions')
router.register(r'types-document', TypeDocumentView, 'types-document')
router.register(r'departments', DepartmentView, 'departments')
router.register(r'districts', DistrictView, 'districts')
router.register(r'foods', FoodCategoryView, 'foods')
router.register(r'delivery-points', DeliveryPointView, 'delivery-points')
router.register(r'orders', OrderView, 'orders')
router.register(r'order-items', OrderItemView, 'order-items')
router.register(r'additionals', AdditionalView, 'additionals')

urlpatterns = [
    path('', include(router.urls))
]