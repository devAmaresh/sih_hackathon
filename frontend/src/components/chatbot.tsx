import React from "react";
import ChatBot, { Button } from "react-chatbotify";
const MyChatBot = () => {
  const [form, setForm] = React.useState<any>({});
  const formStyle = {
    marginTop: 10,
    marginLeft: 20,
    border: "1px solid #491d8d",
    padding: 10,
    borderRadius: 5,
    maxWidth: 300,
  };
  const chatIcon = "";
  const settings = {
    general: { embedded: false },
    chatHistory: { disabled: true },
    header: {
     title: (
      <div style={{cursor: "pointer", margin: 0, fontSize: 20, fontWeight: "bold"}}>
       SalonaX
      </div>
     ),
     showAvatar: true,
     buttons: [Button.NOTIFICATION_BUTTON, Button.AUDIO_BUTTON, Button.CLOSE_CHAT_BUTTON],
    },
    footer: {
     text: (
      <div style={{cursor: "pointer", display: "flex", flexDirection: "row", alignItems: "center", columnGap: 3}} 
       onClick={() => window.open("https://amareshh.vercel.app")}
      >
       <span key={0}>Powered By </span>
       <span key={2} style={{fontWeight: "bold"}}>SalonaX</span>
      </div>
     ),
     buttons: [Button.FILE_ATTACHMENT_BUTTON, Button.EMOJI_PICKER_BUTTON]
    },
    tooltip: {
     mode: "CLOSE",
     text: "I'm here to assist you😊",
    },
    notification:{
     disabled: true,
    },
    chatButton: {
     icon: chatIcon,
    },
   userBubble:{
    animate:false,
   },
   botBubble:{
    animate:false,
   },
  };
  const flow = {
    start: {
      message: "Hello there! What is your name?",
      function: (params: any) => setForm({ ...form, name: params.userInput }),
      path: "ask_age",
    },
    ask_age: {
      message: (params: any) =>
        `Nice to meet you ${params.userInput}, what is your age?`,
      function: (params: any) => setForm({ ...form, age: params.userInput }),
      path: "ask_pet",
    },
    ask_pet: {
      message: "Do you own any pets?",
      // alternative way to declare options, with sending of output disabled
      // more info here: https://react-chatbotify.com/docs/api/attributes
      // options: {items: ["Yes", "No"], sendOutput: false}
      options: ["Yes", "No"],
      chatDisabled: true,
      function: (params: any) =>
        setForm({ ...form, pet_ownership: params.userInput }),
      path: "ask_choice",
    },
    ask_choice: {
      message: "Select at least 2 pets that you are comfortable to work with:",
      // alternative way to declare checkboxes, with default configurations (i.e. min 1, max 4, send output and not reusable)
      // more info here: https://react-chatbotify.com/docs/api/attributes
      // checkboxes: ["Dog", "Cat", "Rabbit", "Hamster"]
      checkboxes: { items: ["Dog", "Cat", "Rabbit", "Hamster"], min: 2 },
      chatDisabled: true,
      function: (params: any) =>
        setForm({ ...form, pet_choices: params.userInput }),
      path: "ask_work_days",
    },
    ask_work_days: {
      message: "How many days can you work per week?",
      function: (params: any) =>
        setForm({ ...form, num_work_days: params.userInput }),
      path: "end",
    },
    end: {
      message: "Thank you for your interest, we will get back to you shortly!",
      component: (
        <div style={formStyle}>
          <p>Name: {form.name}</p>
          <p>Age: {form.age}</p>
          <p>Pet Ownership: {form.pet_ownership}</p>
          <p>Pet Choices: {form.pet_choices}</p>
          <p>Num Work Days: {form.num_work_days}</p>
        </div>
      ),
      options: ["New Application"],
      chatDisabled: true,
      path: "start",
    },
  };
  return <ChatBot settings={settings} flow={flow} />;
};
export default MyChatBot;
