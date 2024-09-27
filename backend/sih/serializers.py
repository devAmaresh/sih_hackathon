from rest_framework import serializers
from .models import Booking


class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = [
            "id",
            "name",
            "email",
            "phone",
            "booking_datetime",
            "visiting_date",
            "child",
            "adult",
            "senior",
            "payment_id",
            "status",
            "amount",
        ]
