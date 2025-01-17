from django.db import models
import uuid
from secrets import token_urlsafe


def generate_token():
    return token_urlsafe(20)


# Create your models here.
class Booking(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, null=True)
    phone = models.CharField(max_length=10, null=True)
    booking_datetime = models.DateTimeField(auto_now_add=True)
    visiting_date = models.DateField()
    child = models.IntegerField(default=0)
    adult = models.IntegerField(default=0)
    senior = models.IntegerField(default=0)
    payment_id = models.CharField(max_length=100, null=True)
    status = models.CharField(max_length=100, default="Pending")
    token = models.CharField(max_length=30, default=generate_token)
    amount = models.IntegerField(default=0)
    ticket_pdf_url = models.URLField(null=True)

    def __str__(self):
        return self.name
