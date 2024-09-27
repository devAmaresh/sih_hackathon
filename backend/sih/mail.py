from mailersend import emails
import os
from dotenv import load_dotenv
import base64

load_dotenv()
api_key = os.getenv("MAILERSEND_API_KEY")

mailer = emails.NewEmail(api_key)

def send_ticket_email(booking, ticket_pdf):
    mail_body = {}

    # Mail From
    mail_from = {
        "name": "Amaresh",
        "email": "amaresh@trial-zr6ke4np7x9gon12.mlsender.net",
    }

    # Recipients
    recipients = [
        {
            "name": booking.name,
            "email": booking.email,
        }
    ]

    # Reply-To
    reply_to = [
        {
            "name": "Amaresh",
            "email": "amaresh@trial-zr6ke4np7x9gon12.mlsender.net",
        }
    ]

    # Attachment handling (convert PDF to base64)
    ticket_pdf_base64 = base64.b64encode(ticket_pdf.read()).decode('utf-8')
    attachments = [
        {
            "content": ticket_pdf_base64,
            "filename": f"ticket_{booking.id}.pdf",
            "disposition": "attachment",
            "mime_type": "application/pdf"
        }
    ]

    # Set Mailersend details
    mailer.set_mail_from(mail_from, mail_body)
    mailer.set_mail_to(recipients, mail_body)
    mailer.set_subject("Your Ticket Confirmation", mail_body)
    mailer.set_html_content("<p>Thank you for your booking. Your ticket is attached.</p>", mail_body)
    mailer.set_plaintext_content("Thank you for your booking. Your ticket is attached.", mail_body)
    mailer.set_reply_to(reply_to, mail_body)
    mailer.set_attachments(attachments, mail_body)

    # Send the email
    response = mailer.send(mail_body)
    print(response)  # For debugging purposes
