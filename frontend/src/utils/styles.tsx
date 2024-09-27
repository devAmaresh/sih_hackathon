import { Styles } from "react-chatbotify";

const styles: Styles = {
  tooltipStyle: {
    fontSize: 16,
  },
  chatWindowStyle: {
    minHeight: "90%",
  },

  headerStyle: {
    background:
      "linear-gradient(180deg, rgba(5, 102, 255, 1) 0%, rgba(8, 143, 255, 1) 100%)",
    minHeight: "80px",
    paddingTop: "23px",
    minWidth: "100%",
  },
  botBubbleStyle: {
    backgroundColor: "rgb(240, 242, 247)",
    color: "#000000",
    borderRadius: "20px 20px 20px 0px",
  },
  userBubbleStyle: {
    background:
      "linear-gradient(180deg, rgba(5, 102, 255, 1) 0%, rgba(8, 143, 255, 1) 100%)",
    color: "#ffffff",
    borderRadius: "20px 20px 0px 20px",
  },
  sendIconStyle: {
    backgroundColor: "transparent",
    height: "100%",
    width: "100%",
  },
  sendButtonStyle: {
    padding: "10px",
    background:
      "linear-gradient(180deg, rgba(5, 102, 255, 1) 0%, rgba(8, 143, 255, 1) 100%)",
    borderRadius: "100%",
    width: 45,
    height: 45,
  },

  sendButtonHoveredStyle: {
    padding: "10px",
    background:
      "linear-gradient(180deg, rgba(5, 102, 255, 1) 0%, rgba(8, 143, 255, 1) 100%)",
    borderRadius: "100%",
    width: 45,
    height: 45,
    opacity: 0.5,
  },
  chatInputAreaFocusedStyle: {
    border: "none",
    outline: "none",
    boxShadow: "none",
  },
  botOptionStyle: {
    backgroundColor: "white",
    border: "2px solid #0091ff",
    color: "#000000",
    borderRadius: "20px 20px 20px 20px",
    paddingLeft: "12px",
    paddingRight: "12px",
    paddingTop: "6px",
    paddingBottom: "6px",
  },
  botOptionHoveredStyle: {
    backgroundColor: "#55b6ff",
    color: "#000000",
    border: "2px solid #0091ff",
    borderRadius: "20px 20px 20px 20px",
    paddingLeft: "12px",
    paddingRight: "12px",
    paddingTop: "6px",
    paddingBottom: "6px",
  },
  chatIconStyle: {
    backgroundColor: "white",
  },
};

export default styles;
