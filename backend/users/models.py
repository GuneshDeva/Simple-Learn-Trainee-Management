from django.db import models
from datetime import *


# Create your models here.

class Location(models.Model):
     class Meta:
        db_table='location'
     location_id=models.AutoField(primary_key=True)
     city=models.CharField(max_length=100)


class Branch(models.Model):
    
     class Meta:
        db_table='branch'
     branch_id=models.AutoField(primary_key=True)
     branch_name=models.CharField(max_length=45)
     location_id=models.ForeignKey(Location, on_delete=models.CASCADE)
     status=models.CharField(max_length=45,default='Active')
     created_by=models.CharField(max_length=45,default='ADMIN')
     created_on=models.DateField(default=date.today)
     updated_by=models.CharField(max_length=45,default='ADMIN')
     updated_on=models.DateField(default=date.today)
     subjects = models.ManyToManyField('Subjects',related_name='batches')
  


class Batch(models.Model):
  


    batch_id=models.AutoField(primary_key=True)
    batch_name=models.CharField(max_length=100)
    branch = models.ForeignKey('Branch',on_delete=models.CASCADE,null=True,blank=True)
    course = models.ForeignKey('Course', on_delete=models.CASCADE,null=True,blank=True)

    class Meta:
        db_table='batch'

class Course(models.Model):
    course_id=models.AutoField(primary_key=True)
    course_name=models.CharField(max_length=100)
    course_duration=models.CharField(max_length=100)
    course_fee = models.IntegerField(default=0)  # Add default value here
    subjects = models.ManyToManyField('Subjects',related_name='courses')
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True, editable=False)

    class Meta:
        db_table = 'course'
class Address(models.Model):
    address_id=models.AutoField(primary_key=True)
    door_no=models.CharField(max_length=100)
    street=models.CharField(max_length=100)
    city=models.CharField(max_length=100)
    pincode=models.IntegerField()
    state=models.CharField(max_length=100)
    locality=models.CharField(max_length=100)
    class Meta :
        db_table = 'address'        

class Trainer(models.Model):
    trainer_Id = models.AutoField(primary_key=True, db_column='trainer_id')  # Here  added " db_column='trainer_id' " newly 26.09.2026
    trainer_name = models.CharField(max_length=100)
    created_by = models.CharField(max_length=100,default="ADMIN")
    created_on = models.DateField(default=date.today)
    updated_by = models.CharField(max_length=100,default="ADMIN")
    updated_on = models.DateField(default=date.today)
    address_id = models.OneToOneField('Address', on_delete=models.CASCADE, null=True, blank=True)
    trainer_phonenumber = models.CharField(max_length=10,default='9988776655')
    trainer_email = models.EmailField(max_length=254,default='admin@12', db_column='triner_email')      
    trainer_age = models.IntegerField(default='21')
    trainer_gender = models.CharField(max_length=10,default='male')
    

    trainer_image = models.ImageField(null=True, blank=True,
                                      upload_to='images/',default="",)
    class Meta:
             
         db_table = 'account_trainer' 

class Subjects(models.Model):
    subject_Id = models.AutoField(primary_key=True)
    subject_name = models.CharField(max_length=100 ,default="john",)
    created_by = models.CharField(max_length=100,default="ADMIN")
    created_on = models.DateField(default=date.today)
    updated_by = models.CharField(max_length=100,default="ADMIN")
    updated_on = models.DateField(default=date.today)
    trainer = models.ManyToManyField(Trainer, related_name='subjects')

    class Meta:
        db_table = 'subjects'


class Topics(models.Model):
    topic_id = models.AutoField(primary_key=True)
    topic_name=models.CharField(max_length=100)
    subject_Id=models.ForeignKey(Subjects, on_delete=models.CASCADE)

    class Meta:
        db_table = 'topics'



class Trainee(models.Model):
    trainee_id=models.AutoField(primary_key=True)
    trainee_name=models.CharField(max_length=100)
    trainee_age=models.IntegerField()
    trainee_gender=models.CharField(max_length=20,default='male')
    trainee_phonenumber = models.CharField(max_length=10,default='9988776655')
    trainee_email = models.EmailField(max_length=254,default='admin@gmail.com')
    batch_id=models.ForeignKey(Batch, on_delete=models.CASCADE) 
    address_id=models.OneToOneField(Address, on_delete=models.CASCADE)

    class Meta:
        db_table='trainee'