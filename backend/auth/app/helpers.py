import random
# import asyncio
# from aiosmtplib import send, SMTP
# from email.message import EmailMessage
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

def generate_otp(length=6)->int:
    """Generate a 6-digit OTP"""
    digits = "0123456789"
    otp = int("".join(random.choice(digits) for _ in range(length)))
    return otp

async def send_email_smtplib(subject, sender_email, recipient_email, password, message_body)->None:
    # Create the container email message.
    message = MIMEMultipart()
    message["From"] = sender_email
    message["To"] = recipient_email
    message["Subject"] = subject
    message.attach(MIMEText(message_body, "plain"))

    try:
        # Connect to the Gmail SMTP server and send the email
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
            smtp.login(sender_email, password)  # Log in to the server
            smtp.send_message(message)  # Send the email
            print("Email sent successfully!")
    except Exception as e:
        print(f"Failed to send email: {e}")