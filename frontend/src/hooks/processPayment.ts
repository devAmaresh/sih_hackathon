// ../hooks/processPayment.ts

import axios from "axios";
import { backendUrl } from "../utils/backend_url";

/**
 * Dynamically loads an external script.
 * @param {string} src - The source URL of the script to load.
 * @returns {Promise<boolean>} - Resolves to true if the script loads successfully, otherwise false.
 */
const loadScript = (src: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

/**
 * Handles the entire payment process using Razorpay.
 * @param {object} formData - The booking details collected from the user.
 * @returns {Promise<{ success: boolean; message: string,ticket_pdf_url:string }>} - The result of the payment process.
 */
const processPayment = async (
  formData: any
): Promise<{ success: boolean; message: string; ticket_pdf_url: string }> => {
  // Step 1: Load the Razorpay Checkout script
  const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
  if (!res) {
    return {
      success: false,
      message: "Razorpay SDK failed to load.",
      ticket_pdf_url: "",
    };
  }

  try {
    // Step 2: Create a booking and Razorpay order by sending data to the backend
    const bookingResponse = await axios.post(
      `${backendUrl}/api/book-ticket/`,
      formData
    );
    if (bookingResponse.status !== 201) {
      return {
        success: false,
        message: "Failed to create booking.",
        ticket_pdf_url: "",
      };
    }

    const { razorpay_order_id, amount, id } = bookingResponse.data;

    // Step 3: Initialize Razorpay Checkout with the order details
    return new Promise((resolve, reject) => {
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Your Razorpay Key ID (ensure this is stored securely)
        amount: amount.toString(), // Amount in paise (e.g., Rs. 200 = 20000 paise)
        currency: "INR",
        name: "Your Museum",
        description: "Ticket Booking",
        order_id: razorpay_order_id,
        handler: async function (response: any) {
          // Step 4a: Handle successful payment by sending payment details to the backend
          const paymentData = {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          };

          try {
            const paymentResponse = await axios.post(
              `${backendUrl}/api/paymenthandler/`,
              paymentData
            );
            if (paymentResponse.status === 200) {
              // Payment was successfully captured and verified
              resolve({
                success: true,
                message: "Payment successful",
                ticket_pdf_url: paymentResponse.data.ticket_pdf_url,
              });
            } else {
              // Payment capture failed on the backend
              resolve({
                success: false,
                message: "Payment failed during capture.",
                ticket_pdf_url: "",
              });
            }
          } catch (error: any) {
            console.error("Payment capture failed:", error);
            resolve({
              success: false,
              message: "Payment capture failed.",
              ticket_pdf_url: "",
            });
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        notes: {
          booking_id: id, // Pass the booking ID for reference
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new (window as any).Razorpay(options);

      // Step 4b: Handle payment failure
      rzp1.on("payment.failed", function (response: any) {
        console.error("Payment failed:", response.error);
        reject({
          success: false,
          message: "Payment failed. Please try again.",
        });
      });

      // Open the Razorpay Checkout modal
      rzp1.open();
    });
  } catch (error: any) {
    console.error("Error in payment processing:", error);
    return {
      success: false,
      message: "Payment processing failed.",

      ticket_pdf_url: "",
    };
  }
};

export default processPayment;
