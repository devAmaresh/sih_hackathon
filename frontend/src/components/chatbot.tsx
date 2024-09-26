import ChatBot from "react-chatbotify";
import settings from "../utils/settings";
import styles from "../utils/styles";
import React from "react";
const MyChatBot = () => {
  const [form, setForm] = React.useState<any>({});

  const flow = {
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
      function: (params: any) =>
        setForm({ ...form, visit_date: params.userInput }),
      path: "ask_num_tickets",
    },
    ask_num_tickets: {
      message: "How many tickets would you like to book?",
      function: (params: any) =>
        setForm({ ...form, num_tickets: params.userInput }),
      path: "ask_ticket_type",
    },
    ask_ticket_type: {
      message: "Please select the type of tickets:",
      checkboxes: { items: ["Adult", "Child", "Senior"], min: 1 },
      function: (params: any) =>
        setForm({ ...form, ticket_types: params.userInput }),
      path: "ask_contact_info",
    },
    ask_contact_info: {
      message: "Please provide your contact information (email or phone):",
      function: (params: any) =>
        setForm({ ...form, contact_info: params.userInput }),
      path: "confirm_booking",
    },
    confirm_booking: {
      message:
        "Thank you! Your tickets have been booked. Would you like to start a new booking or track your tickets?",
      component: (
        <div className="p-4 h-auto w-full max-w-sm border-2 rounded-lg bg-white shadow-lg space-y-2">
          <div className="text-lg font-semibold text-gray-800">
            Booking Summary
          </div>
          <div className="text-sm text-gray-600">
            <div className="font-medium">Visit Date:{form.visit_date}</div>
            <div className="font-medium">
              Number of Tickets: {form.num_tickets}
            </div>
            <div className="font-medium">Ticket Types: {form.ticket_types}</div>
            <div className="font-medium">Contact Info: {form.contact_info}</div>
          </div>
        </div>
      ),
      options: ["New Booking", "Track Tickets"],
      path: (params: any) =>
        params.userInput === "New Booking" ? "ask_visit_date" : "ask_ticket_id",
    },
    ask_ticket_id: {
      message: "Please enter your ticket ID to track your booking:",
      function: (params: any) =>
        setForm({ ...form, ticket_id: params.userInput }),
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
            <div className="font-medium">Visit Date:{form.visit_date}</div>
            <div className="font-medium">
              Number of Tickets: {form.num_tickets}
            </div>
            <div className="font-medium">Ticket Types: {form.ticket_types}</div>
            <div className="font-medium">Contact Info: {form.contact_info}</div>
          </div>
        </div>
      ),
      options: ["New Booking", "Exit"],
      path: (params: any) =>
        params.userInput === "New Booking" ? "ask_visit_date" : "start",
    },
  };
  return (
    <>
      <ChatBot settings={settings} flow={flow} styles={styles} />
    </>
  );
};
export default MyChatBot;
