// ../components/MyChatBot.tsx
import TicketDetails from "./chat/ticketDetails";
import ChatBot, { Flow, Params, useFlow, useMessages } from "react-chatbotify";
import settings from "../utils/settings";
import styles from "../utils/styles";
import { useState } from "react";
import DatePick from "./chat/datePick";
import getTicketDetails from "../hooks/getDetails";
import ContactForm from "./chat/contactForm";
import handleContactFormSubmit from "../hooks/handleContactFormSubmit";
import Quantity from "./chat/quantity";
import processPayment from "../hooks/processPayment"; // Import the processPayment hook
import "./chatbot.css";
import { useStore } from "../store/store";

const MyChatBot = () => {
  const form = useStore((state) => state.form);
  const { restartFlow } = useFlow();
  const [ticketDetails, setTicketDetails] = useState<any>({});
  const { messages, setMessages } = useMessages();

  const flow: Flow = {
    start: {
      message: "Welcome to the Museum! How can we assist you today?",
      options: ["Info", "Book Tickets", "Track Tickets"],
      path: (params: any) => {
        switch (params.userInput) {
          case "Info":
            return "provide_info";
          case "Book Tickets":
            return "ask_visit_date";
          case "Track Tickets":
            return "track_tickets";
          default:
            return "start";
        }
      },
    },
    provide_info: {
      message:
        "Our museum is open from 9 AM to 6 PM, Monday to Sunday. Admission is free for children under 12. Would you like to know more or book a ticket?",
      options: ["More Info", "Book Tickets"],
      path: (params: any) =>
        params.userInput === "More Info"
          ? "provide_more_info"
          : "ask_visit_date",
    },
    provide_more_info: {
      message:
        "The museum offers various exhibitions, guided tours, and workshops. Visit our website for more details. Would you like to book tickets now?",
      options: ["Yes", "No"],
      path: (params: any) =>
        params.userInput === "Yes" ? "ask_visit_date" : "start",
    },
    ask_visit_date: {
      message: "Please select the date of your visit:",
      component: <DatePick />,
      chatDisabled: true,
      function: (_params: Params) => {
        console.log(messages);
        setMessages((prevMessages) => {
          const newMessages = [...prevMessages];
          for (let i = newMessages.length - 1; i >= 0; i--) {
            if (newMessages[i].sender === "bot") {
              newMessages.splice(i, 1);
              break;
            }
          }
          return newMessages;
        });
      },
      path: "ask_num_tickets",
    },
    ask_num_tickets: {
      message: "How many tickets would you like to book?",
      component: <Quantity />,
      options: ["Cancel"],
      function: (_params: Params) => {
        console.log(messages);
        setMessages((prevMessages) => {
          const newMessages = [...prevMessages];
          for (let i = newMessages.length - 1; i >= 0; i--) {
            if (newMessages[i].sender === "bot") {
              newMessages.splice(i, 1);
              break;
            }
          }
          return newMessages;
        });
      },
      path: (params: any) => {
        if (params.userInput === "Cancel") {
          return "restart";
        } else {
          return "ask_contact_info";
        }
      },
      chatDisabled: true,
    },
    ask_contact_info: {
      message: "Kindly fill in the details to proceed:",
      component: (
        <ContactForm handleContactFormSubmit={handleContactFormSubmit} />
      ),
      options: ["Cancel"],
      function: (_params: Params) => {
        console.log(messages);
        setMessages((prevMessages) => {
          const newMessages = [...prevMessages];
          for (let i = newMessages.length - 1; i >= 0; i--) {
            if (newMessages[i].sender === "bot") {
              newMessages.splice(i, 1);
              break;
            }
          }
          return newMessages;
        });
      },
      path: (params: any) => {
        if (params.userInput === "Cancel") {
          return "restart";
        } else {
          return "confirm_booking";
        }
      },
      chatDisabled: true,
    },
    confirm_booking: {
      message: "You have selected the following tickets:",
      component: (
        <div className="p-4 h-auto w-full max-w-sm border-2 rounded-lg bg-white shadow-lg space-y-2">
          <div className="text-lg font-semibold text-gray-800">
            Confirm Booking
          </div>
          <div className="text-sm text-gray-600">
            <div className="font-medium">Name: {form.name}</div>
            <div className="font-medium">Visit Date: {form.visiting_date}</div>
            <div className="font-medium">Email: {form.email}</div>
            <div className="font-medium">Contact Info: {form.phone}</div>
            <div className="font-medium">
              Total Tickets: Child - {form.child}, Adult - {form.adult}, Senior
              - {form.senior}
            </div>
          </div>
        </div>
      ),
      options: ["Confirm & Pay", "Cancel"],
      path: async (params: any) => {
        if (params.userInput === "Cancel") {
          return "restart";
        } else {
          try {
            // Prepare the booking data
            const bookingData = {
              name: form.name,
              visiting_date: form.visiting_date,
              email: form.email,
              phone: form.phone,
              child: form.child,
              adult: form.adult,
              senior: form.senior,
            };

            // Process the payment
            const paymentResult = await processPayment(bookingData);

            if (paymentResult.success) {
              return "payment_success";
            } else {
              return "payment_failed";
            }
          } catch (error) {
            console.error("Payment processing error:", error);
            return "payment_failed";
          }
        }
      },
    },
    payment_success: {
      message:
        "Thank you! Your payment was successful. Your tickets have been booked and mailed to you. Would you like to start a new booking or track your tickets?",
      options: ["New Booking", "Track Tickets", "Exit"],
      path: (params: any) => {
        if (params.userInput === "New Booking") {
          return "ask_visit_date";
        } else if (params.userInput === "Track Tickets") {
          return "track_tickets";
        } else {
          return "restart";
        }
      },
    },
    payment_failed: {
      message:
        "Sorry, your payment was unsuccessful. Would you like to try again or cancel?",
      options: ["Try Again", "Cancel"],
      path: (params: any) => {
        if (params.userInput === "Try Again") {
          return "confirm_booking";
        } else {
          return "restart";
        }
      },
    },
    track_tickets: {
      message:
        "You can track your ticket by entering your ticket ID or email address. How would you like to proceed?",
      options: ["Enter Ticket ID", "Enter Email Address", "Exit"],
      path: (params: any) => {
        switch (params.userInput) {
          case "Enter Ticket ID":
            return "ask_ticket_id";
          case "Enter Email Address":
            return "ask_email";
          default:
            return "restart";
        }
      },
      chatDisabled: true,
    },
    ask_email: {
      message: "Please enter your email address to track your booking:",
      function: async (params: any) => {
        const res = await getTicketDetails("", params.userInput);
        setTicketDetails(res);
      },
      component: (
        <>
          <TicketDetails type="email" />
        </>
      ),
      chatDisabled: true,
      path: "display_ticket_status",
    },
    ask_ticket_id: {
      message: "Please enter your ticket ID to track your booking:",
      function: async (params: any) => {
        const res = await getTicketDetails(params.userInput, "");
        setTicketDetails(res);
      },
      component: (
        <>
          <TicketDetails type="ticket_id" />
        </>
      ),
      path: "display_ticket_status",
      chatDisabled: true,
    },
    display_ticket_status: {
      message: "Your ticket is confirmed for the following details:",
      component: (
        <div className="p-4 h-auto w-full max-w-sm border-2 rounded-lg bg-white shadow-lg space-y-2">
          <div className="text-lg font-semibold text-gray-800">
            Booking Summary
          </div>
          <div className="text-sm text-gray-600">
            <div className="font-medium">Ticket ID: {ticketDetails.id}</div>
            <div className="font-medium">Name: {ticketDetails.name}</div>
            <div className="font-medium">Email: {ticketDetails.email}</div>
            <div className="font-medium">
              Visit Date: {ticketDetails.visiting_date}
            </div>
          </div>
        </div>
      ),
      options: ["New Booking", "Exit"],
      path: (params: any) =>
        params.userInput === "New Booking" ? "ask_visit_date" : "restart",
    },
    restart: {
      transition: 0.00001,
      function: () => {
        restartFlow();
      },
      chatDisabled: true,
    },
  };

  return (
    <>
      <ChatBot settings={settings} flow={flow} styles={styles} />
    </>
  );
};

export default MyChatBot;
