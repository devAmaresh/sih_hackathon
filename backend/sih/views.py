from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .models import Booking
from .serializers import BookingSerializer
from rest_framework.permissions import AllowAny


# Create your views here.
class BookTicket(generics.CreateAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer

    def post(self, request, *args, **kwargs):
        data = request.data
        serializer = BookingSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BookingDetails(generics.RetrieveAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        booking_id = self.request.query_params.get("booking_id", None)
        email = self.request.query_params.get("email", None)
        if not booking_id and not email:
            return Response(
                {"message": "Booking ID or email is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        try:
            if booking_id:
                booking = Booking.objects.get(id=booking_id)
            elif email:
                booking = Booking.objects.get(email=email)

        except Booking.DoesNotExist:
            return Response(
                {"message": "Booking not found"}, status=status.HTTP_404_NOT_FOUND
            )

        serializer = self.get_serializer(booking)
        return Response(serializer.data)


class TicketVerification(APIView):
    queryset = Booking.objects.all()
    permission_classes = [AllowAny]

    def patch(self, request, *args, **kwargs):
        data = request.data
        booking_id = data.get("booking_id", None)
        token = data.get("token", None)
        if not booking_id or not token:
            return Response(
                {"message": "Booking ID and token are required"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        if booking_id and token:
            try:
                booking = Booking.objects.get(id=booking_id,token=token)
                booking.status = "Verified"
                booking.save()


            except Booking.DoesNotExist:
                return Response(
                    {"message": "Ticket Verification unsuccessfull"}, status=status.HTTP_404_NOT_FOUND
                )

        return Response({"message": "Ticket Verification successfull"}, status=status.HTTP_200_OK)
