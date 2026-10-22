from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class User(AbstractUser):
    user_id = models.AutoField(primary_key=True)
    email = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    phone_number = models.BigIntegerField()
    role = models.CharField(max_length=45,default="admin")
    status = models.CharField(max_length=45)
    
    # The below line of code added newly  -26.09.2026
    branch_id = models.IntegerField(null=True, blank=True)


    username = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = [ 'password','phone_number',]
    
# The below line of code was added newly -25.09.2026
    class Meta:
        db_table = 'account_user'
