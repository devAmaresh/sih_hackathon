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
import { useTranslation } from "react-i18next";
const MyChatBot = () => {
  const { t } = useTranslation();
  const form = useStore((state) => state.form);
  const { restartFlow } = useFlow();
  const [ticketDetails, setTicketDetails] = useState<any>({});
  const { messages, setMessages } = useMessages();

  const flow: Flow = {
    start: {
      message: t("welcome"),
      options: [t("info"), t("bookTickets"), t("trackTickets")],
      path: (params: any) => {
        switch (params.userInput) {
          case t("info"):
            return "provide_info";
          case t("bookTickets"):
            return "ask_visit_date";
          case t("trackTickets"):
            return "track_tickets";
          default:
            return "start";
        }
      },
    },
    provide_info: {
      message: t("provide_info"),
      options: [t("more_info"), t("bookTickets")],
      path: (params: any) =>
        params.userInput === t("more_info")
          ? "provide_more_info"
          : "ask_visit_date",
    },
    provide_more_info: {
      message: t("provide_more_info"),
      options: [t("yes"), t("no")],
      path: (params: any) =>
        params.userInput === t("yes") ? "ask_visit_date" : "start",
    },
    ask_visit_date: {
      message: t("select_date"),
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
      message: t("select_tickets"),
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
        if (params.userInput === t("cancel")) {
          return "restart";
        } else {
          return "ask_contact_info";
        }
      },
      chatDisabled: true,
    },
    ask_contact_info: {
      message: t("fill_contact"),
      component: (
        <ContactForm handleContactFormSubmit={handleContactFormSubmit} />
      ),
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
      options: [t("cancel")],
      path: (params: any) => {
        if (params.userInput === t("cancel")) {
          return "restart";
        } else {
          return "confirm_booking";
        }
      },
      chatDisabled: true,
    },
    confirm_booking: {
      message: t("confirm_booking"),
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
      options: [t("confirm_and_pay"), t("cancel")],
      path: async (params: any) => {
        if (params.userInput === t("cancel")) {
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
      message: t("booking_confirmed"),
      options: [t("new_booking"), t("trackTickets"), t("exit")],
      path: (params: any) => {
        if (params.userInput === t("new_booking")) {
          return "ask_visit_date";
        } else if (params.userInput === t("trackTickets")) {
          return "track_tickets";
        } else {
          return "restart";
        }
      },
    },
    payment_failed: {
      message: t("payment_failed"),
      options: [t("try_again"), t("cancel")],
      path: (params: any) => {
        if (params.userInput === t("try_again")) {
          return "confirm_booking";
        } else {
          return "restart";
        }
      },
      chatDisabled: true,
    },
    track_tickets: {
      message: t("enter_ticket_email"),
      options: [t("track_id"), t("track_email"), t("exit")],
      path: (params: any) => {
        switch (params.userInput) {
          case t("track_id"):
            return "ask_ticket_id";
          case t("track_email"):
            return "ask_email";
          default:
            return "restart";
        }
      },
      chatDisabled: true,
    },
    ask_email: {
      message: t("track_email"),
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
      path: () => {
        if (ticketDetails.id) {
          return "display_ticket_status";
        } else {
          return "error_email";
        }
      },
    },
    ask_ticket_id: {
      message: t("track_id"),
      function: async (params: any) => {
        const res = await getTicketDetails(params.userInput, "");
        setTicketDetails(res);
      },
      component: (
        <>
          <TicketDetails type="ticket_id" />
        </>
      ),
      path: () => {
        if (ticketDetails.id) {
          return "display_ticket_status";
        } else {
          return "error_ticket_id";
        }
      },
      chatDisabled: true,
    },
    error_ticket_id: {
      message:
        "Sorry, we couldn't find any booking with this ticket ID. Please try again or exit.",
      options: ["Try Again", "Exit"],
      path: (params: any) => {
        if (params.userInput === "Try Again") {
          return "ask_ticket_id";
        } else {
          return "restart";
        }
      },
      chatDisabled: true,
    },
    error_email: {
      message:
        "Sorry, we couldn't find any booking with this email ID. Please try again or exit.",
      options: ["Try Again", "Exit"],
      path: (params: any) => {
        if (params.userInput === "Try Again") {
          return "ask_email";
        } else {
          return "restart";
        }
      },
    },
    display_ticket_status: {
      message: t("display_ticket"),
      component: (
        <div className="p-4 h-auto w-full max-w-sm border-2 rounded-lg bg-white shadow-lg space-y-2">
          <div className="text-lg font-semibold text-gray-800">
          {t("display_ticket")}
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
      options: [t("new_booking"), t("exit")],
      path: (params: any) =>
        params.userInput === t("new_booking") ? "ask_visit_date" : "restart",
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
