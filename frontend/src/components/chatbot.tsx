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
import getGeminiText from "../hooks/getGeminiText";
import getGeminiFile from "../hooks/getGeminiFile";
import { LuDownload } from "react-icons/lu";
const MyChatBot = () => {
  const { t } = useTranslation();
  const form = useStore((state) => state.form);
  const { restartFlow } = useFlow();
  const [ticketDetails, setTicketDetails] = useState<any>({});
  const { messages, setMessages } = useMessages();
  const [file, setFile] = useState<any>(null);
  const [pdfUrl, setPdfUrl] = useState("");
  const flow: Flow = {
    start: {
      message: t("welcome"),
      file: async (params: any) => {
        setFile(params.files[0]);
      },
      options: [
        t("info"),
        t("bookTickets"),
        t("trackTickets"),
        t("ticketPrice"),
      ],
      path: (params: any) => {
        switch (params.userInput) {
          case t("info"):
            return "provide_info";
          case t("bookTickets"):
            return "ask_visit_date";
          case t("trackTickets"):
            return "track_tickets";
          case t("ticketPrice"):
            return "ticket_price";
          default:
            return "loop";
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
    ticket_price: {
      component: (
        <div className="p-4 mx-4 my-2 h-auto w-full max-w-sm border-2 shadow-lg space-y-2 border-gray-300 rounded-tr-2xl rounded-b-2xl bg-[#FCF5EB]">
          <div className="text-lg font-semibold text-gray-800">
            {t("ticketPrice")}
          </div>
          <div className="text-sm text-gray-600">
            <div className="font-medium">{t("child")}: Rs.10</div>
            <div className="font-medium">{t("adult")}: Rs.30</div>
            <div className="font-medium">{t("senior")}: Rs.15</div>
          </div>
        </div>
      ),
      path: (params: any) => {
        switch (params.userInput) {
          case t("bookTickets"):
            return "ask_visit_date";
          case t("trackTickets"):
            return "track_tickets";
          default:
            return "restart";
        }
      },
      options: [t("bookTickets"), t("trackTickets"), t("exit")],
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
      options: [t("cancel")],
      path: (params: Params) => {
        if (params.userInput === t("cancel")) {
          return "restart";
        } else {
          return "ask_num_tickets";
        }
      },
    },
    ask_num_tickets: {
      message: t("select_tickets"),
      component: <Quantity />,
      options: [t("cancel")],
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
        <div className="p-4 mx-4 my-2 h-auto w-full max-w-sm border-2 shadow-lg space-y-2 border-gray-300 rounded-tr-2xl rounded-b-2xl bg-[#FCF5EB]">
          <div className="text-lg font-semibold text-gray-800">
            Confirm Booking
          </div>
          <div className="text-sm text-gray-600">
            <div className="font-medium">Name: {form.name}</div>
            <div className="font-medium">
              Visit Date:{" "}
              {new Date(form.visiting_date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <div className="font-medium">Email: {form.email}</div>
            <div className="font-medium">Mobile Number: {form.phone}</div>
            <div className="font-medium">
              Tickets: Child - {form.child}, Adult - {form.adult}, Senior -{" "}
              {form.senior}
            </div>
            <div className="font-medium">
              {" "}
              Total Tickets:{" "}
              {Number(form.child) + Number(form.adult) + Number(form.senior)}
            </div>
            <div className="font-medium">Amount: Rs.{form.amount}</div>
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
              setPdfUrl(paymentResult.ticket_pdf_url);
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
      component: (
        <>
          <div className="ml-4 mt-2 text-sm">
            <a
              href={`${pdfUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="flex border-zinc-400 font-semibold hover:opacity-80 justify-center items-center border p-1.5 text-sm rounded-lg w-32"
            >
              Download
              <LuDownload className="w-5 h-5 ml-1.5" />
            </a>
          </div>
        </>
      ),
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
      options: [t("track_id"), t("track_email"), t("track_phone"), t("exit")],
      path: (params: any) => {
        switch (params.userInput) {
          case t("track_id"):
            return "ask_ticket_id";
          case t("track_email"):
            return "ask_email";
          case t("track_phone"):
            return "ask_phone";
          default:
            return "restart";
        }
      },
      chatDisabled: true,
    },
    ask_phone: {
      message: t("track_phone"),
      function: async (params: any) => {
        const res = await getTicketDetails("", "", params.userInput);
        setTicketDetails(res);
      },
      component: (
        <>
          <TicketDetails type="phone" />
        </>
      ),
      chatDisabled: true,
      options: [t("exit")],
      path: (params: Params) => {
        if (params.userInput === t("exit")) {
          return "restart";
        } else {
          return "display_ticket_status";
        }
      },
    },
    ask_email: {
      message: t("track_email"),
      function: async (params: any) => {
        const res = await getTicketDetails("", params.userInput, "");
        setTicketDetails(res);
      },
      component: (
        <>
          <TicketDetails type="email" />
        </>
      ),
      chatDisabled: true,
      options: [t("exit")],
      path: (params: Params) => {
        if (params.userInput === t("exit")) {
          return "restart";
        } else {
          return "display_ticket_status";
        }
      },
    },
    ask_ticket_id: {
      message: t("track_id"),
      function: async (params: any) => {
        const res = await getTicketDetails(params.userInput, "", "");
        setTicketDetails(res);
      },
      component: (
        <>
          <TicketDetails type="ticket_id" />
        </>
      ),
      options: [t("exit")],
      path: (params: Params) => {
        if (params.userInput === t("exit")) {
          return "restart";
        } else {
          return "display_ticket_status";
        }
      },
      chatDisabled: true,
    },
    display_ticket_status: {
      message: (_params: any) => {
        console.log(ticketDetails);
        if (ticketDetails.length === 0) {
          return "Sorry, we couldn't find any booking. Please try again or exit.";
        }
        if (ticketDetails.length != 0 || ticketDetails[0].id) {
          return "Here is the booking details.";
        } else {
          return "Sorry, we couldn't find any booking. Please try again or exit.";
        }
      },
      component: (
        <>
          {ticketDetails.length > 0 && (
            <div className="mx-4 p-6 mt-2 h-auto w-full border-2 border-gray-300 rounded-tr-2xl rounded-b-2xl bg-[#FCF5EB] shadow-lg">
              <div className="text-base font-bold text-gray-800 text-center mb-4">
                {t("display_ticket")}
              </div>
              {ticketDetails.map((ticket: any, index: any) => (
                <div
                  key={index}
                  className="text-sm text-gray-700 border-b-2 pb-4 mb-4"
                >
                  <div className="font-medium">
                    Ticket ID:{" "}
                    <span className="text-blue-600">{ticket.id}</span>
                  </div>
                  <div className="font-medium">
                    Name: <span className="text-blue-600">{ticket.name}</span>
                  </div>
                  <div className="font-medium">
                    Email: <span className="text-blue-600">{ticket.email}</span>
                  </div>
                  <div className="font-medium">
                    Visit Date:{" "}
                    <span className="text-blue-600">
                      {new Date(ticket.visiting_date).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </span>
                  </div>
                  <div className="font-medium">
                    Child:{" "}
                    <span className="text-blue-600 mr-1">{ticket.child}</span>
                    Adult:{" "}
                    <span className="text-blue-600 mr-1">{ticket.adult}</span>
                    Senior:{" "}
                    <span className="text-blue-600 mr-1">{ticket.senior}</span>
                    Total:{" "}
                    <span className="text-blue-600">
                      {Number(ticket.child) +
                        Number(ticket.adult) +
                        Number(ticket.senior)}
                    </span>
                  </div>
                  <div className="font-medium">
                    Amount:{" "}
                    <span className="text-blue-600">Rs.{ticket.amount}</span>
                  </div>
                  <div className="flex justify-center mt-2">
                    <a
                      href={ticket.ticket_pdf_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      className="flex border-zinc-400 font-semibold hover:opacity-80 justify-center items-center border-2 p-1.5 text-sm rounded-md w-32"
                    >
                      Download
                      <LuDownload className="w-5 h-5 ml-1.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ),
      options: [t("new_booking"), t("exit")],
      path: (params: any) => {
        if (params.userInput === t("new_booking")) {
          return "ask_visit_date";
        } else {
          return "restart";
        }
      },
    },
    restart: {
      transition: 0.00001,
      function: () => {
        restartFlow();
      },
      chatDisabled: true,
    },
    loop: {
      message: async (params: any) => {
        if (file) {
          const res = await getGeminiFile(file);
          setFile(null);
          const fileInput = document.querySelector(
            ".rcb-chat-footer input[type='file']"
          ) as HTMLInputElement;
          if (fileInput) {
            fileInput.value = "";
          }
          return res;
        }
        const res = await getGeminiText(params.userInput);
        return res;
      },
      file: async (params: any) => {
        setFile(params.files[0]);
      },
      options: [t("info"), t("bookTickets"), t("trackTickets"), t("exit")],
      path: (params: any) => {
        switch (params.userInput) {
          case t("info"):
            return "provide_info";
          case t("bookTickets"):
            return "ask_visit_date";
          case t("trackTickets"):
            return "track_tickets";
          case t("exit"):
            return "restart";
          default:
            return "loop";
        }
      },
    },
  };

  return (
    <>
      <ChatBot settings={settings} flow={flow} styles={styles} />
    </>
  );
};

export default MyChatBot;
