from django.urls import path
from .views import BookTicket, BookingDetails, TicketVerification, PaymentHandler

urlpatterns = [
    path("book-ticket/", BookTicket.as_view(), name="book-ticket"),
    path("booking-details/", BookingDetails.as_view(), name="booking-details"),
    path("ticket-verify/", TicketVerification.as_view(), name="ticket-verify"),
    path("paymenthandler/", PaymentHandler.as_view(), name="paymenthandler"),
]
