import { Styles } from "react-chatbotify";

const styles: Styles = {
  tooltipStyle: {
    fontSize: 16,
  },
  // chatWindowStyle: {
  //   minHeight: "90%",
  // },
  headerStyle: {
    background: "#A79277",
    minHeight: "80px",
    paddingTop: "23px",
    minWidth: "100%",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  botBubbleStyle: {
    backgroundColor: "#f3f3f3",
    color: "#333333",
    borderRadius: "20px 20px 20px 0px",
    maxWidth: "80%",
  },
  userBubbleStyle: {
    backgroundColor: "#FAD8C4",
    color: "#000000",
    borderRadius: "20px 20px 0px 20px",
  },
  sendIconStyle: {
    backgroundColor: "transparent",
    height: "100%",
    width: "100%",
  },
  sendButtonStyle: {
    padding: "10px",
    backgroundColor: "#A79277",
    borderRadius: "20%",
    width: 45,
    height: 45,
  },
  sendButtonHoveredStyle: {
    padding: "10px",
    background: "#A79277",
    borderRadius: "20%",
    width: 45,
    height: 45,
    opacity: 0.8, // Slightly more visible on hover
  },
  chatInputAreaFocusedStyle: {
    outline: "none",
    boxShadow: "none",
  },
  botOptionStyle: {
    backgroundColor: "#f5f5f5", // Light gray for bot options
    border: "2px solid #d1c7a1", // Soft border color
    color: "#000000",
    borderRadius: "0px",
    paddingLeft: "12px",
    paddingRight: "12px",
    paddingTop: "6px",
    paddingBottom: "6px",
  },
  botOptionHoveredStyle: {
    backgroundColor: "#e1d7c1", // Soft beige for hovered options
    color: "#000000",
    border: "2px solid #d1c7a1",
    borderRadius: "0px",
    paddingLeft: "12px",
    paddingRight: "12px",
    paddingTop: "6px",
    paddingBottom: "6px",
  },
  chatIconStyle: {
    backgroundColor: "#f5f5f5", // Light gray for chat icon
  },
};

export default styles;
