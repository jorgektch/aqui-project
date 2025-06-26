from django.db import models
import uuid
from django.contrib.auth.models import User, Group

# Classes w/o FK

class City(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=20)

    def __str__(self):
        return self.name

class FoodCategory(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=50, unique=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name

class Institution(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=50, db_index=True)
    domain = models.CharField(max_length=15)

    def __str__(self):
        return self.name

class TypeDocument(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=30)

    def __str__(self):
        return self.name


# Classes w FK (1)

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

class Food(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    category = models.ForeignKey(FoodCategory, on_delete=models.PROTECT)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='food_images/', blank=True, null=True)
    have_piece = models.BooleanField()
    created_at = models.DateTimeField(auto_now_add=True)


# Classes w FK (2)

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


# Inherited classes

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

class Role(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    id_group = models.ForeignKey(Group, on_delete=models.CASCADE)
    name = models.CharField(max_length=50) 

    def __str__(self):
        return self.name


# Classes w FK (3)

class Order(models.Model):
    PICKUP_STATUS = (
        ('pending', 'Pendiente'),
        ('ready', 'Listo para recojo'),
        ('cancelled', 'Cancelado'),
    )

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    customer = models.ForeignKey(Customer, on_delete=models.PROTECT, related_name='orders')
    delivery_point = models.ForeignKey(DeliveryPoint, on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True)
    pickup_time = models.TimeField()
    status = models.CharField(max_length=20, choices=PICKUP_STATUS, default='pending')
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    notes = models.TextField(blank=True)

    def __str__(self):
        return f"Order #{self.id} - {self.customer.name}"
    
    def update_total(self):
        total = sum(item.total_price for item in self.orderitem_set.all())
        self.total_price = total
        self.save(update_fields=['total_price'])
    

# Classes w FK (4)

class OrderItem(models.Model):
    PIECES = (
        ('thigh', 'Muslo'),
        ('drumstick', 'Pierna'),
        ('breast', 'Pecho'),
        ('wing', 'Ala'),
    )

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    food = models.ForeignKey(Food, on_delete=models.PROTECT, related_name='order_items')
    piece = models.CharField(max_length=20, choices=PIECES, null=True)
    quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.quantity}x {self.food.name} (Order #{self.order.id})"
    
    @property
    def total_price(self):
        extras_total = sum(extra.price * extra.quantity for extra in self.extras.all())
        return (self.price * self.quantity) + extras_total

    def save(self, *args, **kwargs):
        if not self.pk: 
            self.price = self.food.price * self.quantity
        super().save(*args, **kwargs)
        self.order.update_total()


# Classes w FK (5)

class Additional(models.Model):
    PIECES = (
        ('thigh', 'Muslo'),
        ('drumstick', 'Pierna'),
        ('breast', 'Pecho'),
        ('wing', 'Ala'),
    )
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField()
    order_item = models.ForeignKey(OrderItem, on_delete=models.CASCADE, related_name='extras')
    piece_type = models.CharField(max_length=20, choices=PIECES)

    def __str__(self):
        return f"{self.quantity} {self.get_piece_type_display()} piezas (Ítem #{self.order_item.id})"

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        self.order_item.order.update_total()

