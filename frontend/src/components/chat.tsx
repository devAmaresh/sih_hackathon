import { ChatBotProvider } from "react-chatbotify";
import MyChatBot from "./chatbot";

const chat = () => {
  return (
    <ChatBotProvider>
      <MyChatBot />
    </ChatBotProvider>
  );
};

export default chat;
