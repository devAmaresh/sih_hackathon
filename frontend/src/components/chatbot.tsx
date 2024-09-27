import ChatBot, { Flow, Params, useFlow, useMessages } from "react-chatbotify";
import settings from "../utils/settings";
import styles from "../utils/styles";
import { useState } from "react";
import DatePick from "./chat/datePick";
import getTicketDetails from "../hooks/getDetails";
import ContactForm from "./chat/contactForm";
import handleContactFormSubmit from "../hooks/handleContactFormSubmit";
import Quantity from "./chat/quantity";
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
            return "ask_ticket_id";
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
      component: (
        <>
          <DatePick />
        </>
      ),
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
      function: (params: any) =>
        console.log("Number of tickets:", params.userInput),
      component: (
        <>
          <Quantity />
        </>
      ),
      path: "ask_contact_info",
    },
    ask_contact_info: {
      message: "Kindly fill in the details to proceed:",

      component: (
        <>
          <ContactForm handleContactFormSubmit={handleContactFormSubmit} />
        </>
      ),
      options: ["Cancel"],
      path: (params: any) => {
        if (params.userInput === "Cancel") {
          return "restart";
        } else {
          return "confirm_booking";
        }
      },
      chatDisabled: true,
    },
    restart: {
      transition: 0.00001,
      function: () => {
        restartFlow();
      },
      chatDisabled: true,
    },
    confirm_booking: {
      message:
        "Thank you! Your tickets have been booked. Would you like to start a new booking or track your tickets?",
      component: (
        <div className="p-4 h-auto w-full max-w-sm border-2 rounded-lg bg-white shadow-lg space-y-2">
          <div className="text-lg font-semibold text-gray-800">
            Booking Confirmed
          </div>
          <div className="text-sm text-gray-600">
            <div className="font-medium">Visit Date: {form.visiting_date}</div>
            <div className="font-medium">Ticket Types: {form.name}</div>
            <div className="font-medium">Contact Info: {form.phone}</div>
          </div>
        </div>
      ),
      options: ["New Booking", "Track Tickets", "Exit"],
      path: (params: any) => {
        if (params.userInput === "New Booking") {
          return "ask_visit_date";
        } else if (params.userInput === "Track Tickets") {
          return "ask_ticket_id";
        } else {
          return "restart";
        }
      },
    },

    ask_ticket_id: {
      message: "Please enter your ticket ID to track your booking:",
      function: async (params: any) => {
        const res = await getTicketDetails(params.userInput);
        setTicketDetails(res);
      },
      path: "display_ticket_status",
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
  };

  return (
    <>
      <ChatBot settings={settings} flow={flow} styles={styles} />
    </>
  );
};
export default MyChatBot;
