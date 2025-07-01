from django.db import models
import uuid
from django.contrib.auth.models import User, Group, AbstractUser

# Variables

DAYS = [
    ('lunes', 'Lunes'),
    ('martes', 'Martes'),
    ('miércoles', 'Miércoles'),
    ('jueves', 'Jueves'),
    ('viernes', 'Viernes'),
    ('sábado', 'Sábado'),
    ('domingo', 'Domingo'),
]

TYPES = [
    ('entrada', 'Entrada'),
    ('fondo', 'Plato de fondo'),
    ('bebida', 'Bebida'),
    ('postre', 'Postre')
]

STATUS = [
    ('generado', 'Generado'),
    ('cancelado', 'Cancelado'),
    ('entregado', 'Entregado'),
]

# Django classes

class User(AbstractUser):
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    username = None
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    

# Classes w/o FK

class City(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=20)

    def __str__(self):
        return self.name

class Institution(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=50, db_index=True)
    domain = models.CharField(max_length=15)

    def __str__(self):
        return self.name

class MenuItemType(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=10, choices=TYPES, unique=True)

    def _str_(self):
        return self.name

class Role(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    id_group = models.ForeignKey(Group, on_delete=models.CASCADE)
    name = models.CharField(max_length=50) 

    def __str__(self):
        return self.name

class TypeDocument(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=30)

    def __str__(self):
        return self.name


# Classes w FK (1)

class Collaborator(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    id_user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=30)
    p_surname = models.CharField(max_length=15, db_index=True)
    m_surname = models.CharField(max_length=15, db_index=True)
    id_type_document = models.ForeignKey(TypeDocument, on_delete=models.CASCADE)
    document = models.CharField(max_length=20) 
    cellphone = models.CharField(max_length=15)

    def __str__(self):
        return f"{self.name} {self.p_surname} {self.m_surname}"

class Department(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    id_institution = models.ForeignKey(Institution, on_delete=models.CASCADE)
    name = models.CharField(max_length=30)

    def __str__(self):
        return f"{self.name} - {self.id_institution.name}"
    
class District(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    id_city = models.ForeignKey(City, on_delete=models.CASCADE)
    name = models.CharField(max_length=30)

    def __str__(self):
        return f"{self.name}, {self.id_city.name}"

class MenuItem(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    photo_url = models.TextField(blank=True)
    type = models.ForeignKey(MenuItemType, on_delete=models.CASCADE)

    def _str_(self):
        return f"{self.name} ({self.type.name})"


# Classes w FK (2)

class Customer(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    id_user = models.OneToOneField(User, on_delete=models.CASCADE)
    birthdate = models.DateField(db_index=True)
    cellphone = models.CharField(max_length=15)
    name = models.CharField(max_length=30)
    p_surname = models.CharField(max_length=15)
    m_surname = models.CharField(max_length=15)
    id_institution = models.ForeignKey(Institution, on_delete=models.SET_NULL, null=True, blank=True)
    id_department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True, blank=True)
    code = models.CharField(max_length=10, null=True, blank=True)

    def __str__(self):
        return f"{self.name} {self.p_surname} {self.m_surname}"

class DeliveryPoint(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=15)
    reference = models.CharField(max_length=50, null=True, blank=True)
    image_url = models.CharField(max_length=255)
    latitude = models.CharField(max_length=30)
    longitude = models.CharField(max_length=30)
    address = models.CharField(max_length=50)
    id_city = models.ForeignKey(City, on_delete=models.CASCADE)
    id_district = models.ForeignKey(District, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class MenuAvailability(models.Model):
    item = models.ForeignKey(MenuItem, on_delete=models.CASCADE)
    day_of_week = models.CharField(max_length=10, choices=DAYS)
    visible_from = models.TimeField()
    order_deadline = models.TimeField()

    def _str_(self):
        return f"{self.item.name} - {self.day_of_week}"


# Classes w FK (3)

class Order(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    delivery_point = models.ForeignKey(DeliveryPoint, on_delete=models.SET_NULL, null=True)
    delivery_date = models.DateField()
    delivery_time = models.TimeField()
    status = models.CharField(max_length=10, choices=STATUS, default='generado')
    payment_status = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def _str_(self):
        return f"Pedido #{self.id} - {self.user.email}"


# Classes w FK (4)

class Bag(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    order = models.ForeignKey(Order, related_name='bags', on_delete=models.CASCADE)
    notes = models.TextField(blank=True)

    def _str_(self):
        return f"Bolsa #{self.id} de pedido {self.order.id}"

    def clean(self):
        from django.core.exceptions import ValidationError
        counts = {}
        for item in self.items.all():
            t = item.item.type.name
            counts[t] = counts.get(t, 0) + item.quantity
        if counts.get('fondo', 0) != 1:
            raise ValidationError("Cada bolsa debe tener exactamente 1 fondo.")
        if counts.get('entrada', 0) != 1:
            raise ValidationError("Cada bolsa debe tener exactamente 1 entrada.")
        if counts.get('bebida', 0) < 1:
            raise ValidationError("Cada bolsa debe tener al menos 1 bebida.")
        if counts.get('postre', 0) > 1:
            raise ValidationError("Solo se permite 1 postre por bolsa.")


# Classes w FK (5)

class BagItem(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    bag = models.ForeignKey(Bag, related_name='items', on_delete=models.CASCADE)
    item = models.ForeignKey(MenuItem, on_delete=models.CASCADE)
    quantity = models.PositiveSmallIntegerField(default=1)

    class Meta:
        verbose_name = "Item de bolsa"
        verbose_name_plural = "Items de bolsa"

    def _str_(self):
        return f"{self.quantity} × {self.item.name} en bolsa #{self.bag.id}"