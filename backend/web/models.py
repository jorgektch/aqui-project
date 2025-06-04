from django.db import models
import uuid
from django.contrib.auth.models import User, Group

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