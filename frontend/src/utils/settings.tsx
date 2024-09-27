import { Button, Settings } from "react-chatbotify";
import Heading from "../components/chat/heading";
const chatIcon = "images/icon1.jpg";

const settings: Settings = {
  general: { embedded: false },
  chatHistory: { disabled: true },
  header: {
    title: <Heading />,
    showAvatar: true,
    buttons: [
      Button.NOTIFICATION_BUTTON,
      Button.AUDIO_BUTTON,
      Button.CLOSE_CHAT_BUTTON,
    ],
  },
  footer: {
    text: (
      <div
        style={{
          cursor: "pointer",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          columnGap: 3,
        }}
        onClick={() => window.open("https://amareshh.vercel.app")}
      >
        <span key={0}>Powered By </span>
        <span key={2} style={{ fontWeight: "bold" }}>
          SalonaX
        </span>
      </div>
    ),
    buttons: [Button.FILE_ATTACHMENT_BUTTON, Button.EMOJI_PICKER_BUTTON],
  },
  tooltip: {
    mode: "START",
    text: "I'm here to assist you !",
  },
  notification: {
    disabled: true,
  },
  chatButton: {
    icon: chatIcon,
  },
  userBubble: {
    animate: false,
  },
  botBubble: {
    animate: false,
  },
  emoji: {
    disabled: true,
  },
};
export default settings;
