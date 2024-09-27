from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .models import Booking
from .serializers import BookingSerializer
from rest_framework.permissions import AllowAny
import razorpay
import os
from dotenv import load_dotenv

load_dotenv()  # Load the environment variables from the .env file

razorpay_key_id = os.getenv("RAZORPAY_KEY_ID")
razorpay_key_secret = os.getenv("RAZORPAY_KEY_SECRET")

razorpay_client = razorpay.Client(auth=(razorpay_key_id, razorpay_key_secret))


# Create your views here.
class BookTicket(generics.CreateAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        data = request.data
        serializer = BookingSerializer(data=data)

        if serializer.is_valid():
            # Calculate total amount based on hardcoded ticket prices
            child = data.get("child", 0)
            adult = data.get("adult", 0)
            senior = data.get("senior", 0)

            # Hardcoded ticket prices
            child_price = 10
            adult_price = 30
            senior_price = 15

            # Total amount (convert to paise for Razorpay, i.e., 1 INR = 100 paise)
            amount = (
                int(child) * child_price
                + int(adult) * adult_price
                + int(senior) * senior_price
            ) * 100

            # Save booking to DB
            booking = serializer.save()

            # Create Razorpay order
            razorpay_order = razorpay_client.order.create(
                {"amount": amount, "currency": "INR", "payment_capture": "1"}
            )

            # Update the booking with the Razorpay order ID
            booking = serializer.save(payment_id=razorpay_order["id"], amount=amount//100)
            booking.save()

            # Send response with booking details and Razorpay order info
            response_data = {
                "booking": serializer.data,
                "razorpay_order_id": razorpay_order["id"],
                "amount": amount // 100,  # return amount in INR
            }

            return Response(response_data, status=status.HTTP_201_CREATED)

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
                booking = Booking.objects.get(id=booking_id, token=token)
                if booking.status == "Paid":
                    booking.status = "Verified"
                    booking.save()
                else:
                    return Response(
                        {"message": "Payment not done"},
                        status=status.HTTP_400_BAD_REQUEST,
                    )

            except Booking.DoesNotExist:
                return Response(
                    {"message": "Ticket Verification unsuccessfull"},
                    status=status.HTTP_404_NOT_FOUND,
                )

        return Response(
            {"message": "Ticket Verification successfull"}, status=status.HTTP_200_OK
        )


class PaymentHandler(generics.CreateAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        try:
            payment_id = request.data.get("razorpay_payment_id", "")
            razorpay_order_id = request.data.get("razorpay_order_id", "")
            signature = request.data.get("razorpay_signature", "")
            params_dict = {
                "razorpay_order_id": razorpay_order_id,
                "razorpay_payment_id": payment_id,
                "razorpay_signature": signature,
            }

            # Verify the payment signature
            result = razorpay_client.utility.verify_payment_signature(params_dict)
            if result is not None:
                # Check if payment is already captured
                payment_details = razorpay_client.payment.fetch(payment_id)
                booking = Booking.objects.get(razorpay_order_id=razorpay_order_id)
                if payment_details["status"] == "captured":
                    booking.status = "Paid"
                    booking.save()
                    return Response(
                        {"message": "Payment has already been captured."},
                        status=status.HTTP_200_OK,
                    )
                try:
                    razorpay_client.payment.capture(
                        payment_id, booking.amount, {"currency": "INR"}
                    )
                    # Optionally, update the booking status here if needed
                    booking.status = "Paid"
                    booking.save()
                    return Response(
                        {"message": "Payment successful"}, status=status.HTTP_200_OK
                    )
                except Exception as e:
                    return Response(
                        {"message": "Payment unsuccessful", "error": str(e)},
                        status=status.HTTP_400_BAD_REQUEST,
                    )
            else:
                return Response(
                    {"message": "Signature verification failed"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        except Exception as e:
            return Response(
                {"message": "Payment unsuccessful", "error": str(e)},
                status=status.HTTP_400_BAD_REQUEST,
            )
