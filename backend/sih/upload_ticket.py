import cloudinary
import cloudinary.uploader
import os
from dotenv import load_dotenv

load_dotenv()
# Configure Cloudinary
cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
)


def upload_ticket_pdf(booking, ticket_pdf):
    # Upload the PDF to Cloudinary
    response = cloudinary.uploader.upload(ticket_pdf, resource_type="raw")
    booking.ticket_pdf_url = response["secure_url"]
    booking.save()
    print(response["secure_url"])
    return response["secure_url"]  # Get the secure URL of the uploaded PDF
