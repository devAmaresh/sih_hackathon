# generate_pdf.py
from xhtml2pdf import pisa
from django.template.loader import render_to_string
from django.core.files.base import ContentFile
import io
from .qrcode import generate_qr_code
import base64
from datetime import datetime

def generate_ticket_pdf(booking):
    html_template_path = "ticket_template.html"

    # Create a BytesIO buffer to hold the PDF
    buffer = io.BytesIO()

    # Generate QR code for the booking
    qr_code_buffer = generate_qr_code(
        f"{booking.id}:{booking.name}:{booking.token}:{booking.visiting_date}:{booking.child}:{booking.adult}:{booking.senior}"
    )

    # Convert QR code buffer to Base64 for embedding in HTML
    qr_code_base64 = base64.b64encode(qr_code_buffer.getvalue()).decode("utf-8")
    qr_code_data_url = f"data:image/png;base64,{qr_code_base64}"

    # Include the QR code in the HTML context
    date_str = booking.visiting_date.strftime("%Y-%m-%d")
    date_obj = datetime.strptime(date_str, "%Y-%m-%d")
    day_of_week = date_obj.strftime("%A").upper()
    formatted_date = date_obj.strftime("%B %d") + "TH"  
    year = date_obj.strftime("%Y")  
    html_content = render_to_string(
        html_template_path,
        {
            "booking": booking,
            "qr_code_data_url": qr_code_data_url,
            "day_of_week": day_of_week,
            "formatted_date": formatted_date,
            "year": year,
        },
    )

    # Generate PDF from HTML
    pdf = pisa.pisaDocument(io.StringIO(html_content), dest=buffer)

    # Check for errors
    if pdf.err:
        return None

    # Get the PDF content
    buffer.seek(0)  # Go to the beginning of the BytesIO buffer
    return ContentFile(buffer.read(), name=f"ticket_{booking.id}.pdf")
