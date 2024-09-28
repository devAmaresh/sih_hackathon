import { Spin, Form, Input, Button, ConfigProvider } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useMessages } from "react-chatbotify";

const { Item } = Form;

function TicketDetails({ type }: any) {
  const [submitting, setSubmitting] = useState(false);
  const theme = localStorage.getItem("theme") || "light";
  const { messages, setMessages } = useMessages();

  const onFinish = async (values: any) => {
    setSubmitting(true);
    const { email, ticketId } = values;

    const input = document.querySelector(
      ".rcb-chat-input-textarea"
    ) as HTMLTextAreaElement;
    if (input) {
      if (type === "email") input.value = `${email}`;
      else {
        input.value = `${ticketId}`;
      }
    }

    const inputEvent = new Event("input", { bubbles: true });
    input.dispatchEvent(inputEvent);
    const enterKeyEvent = new KeyboardEvent("keydown", {
      key: "Enter",
      bubbles: true,
      cancelable: true,
      keyCode: 13,
    });
    input.dispatchEvent(enterKeyEvent);
    setSubmitting(false);
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
  };

  return (
    <div
      className={`w-[70%] max-w-[380px] ml-4 p-4 ${
        theme === "dark"
          ? "bg-zinc-800 border-2 text-white border-zinc-700"
          : "bg-zinc-100 text-black"
      } rounded-b-lg rounded-tr-lg border-[1px] border-zinc-200 shadow-sm`}
    >
      <div className="text-semibold text-center pb-3">Fill in the details</div>
      <ConfigProvider
        theme={{
          components: {
            Input: {
              colorTextPlaceholder:
                theme === "dark"
                  ? "rgba(255, 255, 255, 0.4)"
                  : "rgba(0, 0, 0, 0.25)",
            },
          },
        }}
      >
        <Form
          name="leadForm"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          className="space-y-4"
        >
          {/* Conditional rendering based on type */}
          <Item
            name={type === "email" ? "email" : "ticketId"}
            rules={[{ required: true, message: `Please input the ${type}` }]}
          >
            <Input
              type="text"
              placeholder={type === "email" ? "Enter email" : "Enter ticket ID"}
              className="w-full p-2 rounded-lg"
              style={{
                backgroundColor: theme === "dark" ? "black" : "white",
                color: theme === "dark" ? "white" : "black",
              }}
            />
          </Item>
          <Item>
            <Button
              type="primary"
              htmlType="submit"
              size="middle"
              disabled={submitting}
              style={{ width: "100%", height: "36px" }}
              className={`${
                theme === "dark"
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-blue-200 text-black hover:bg-blue-300"
              }`}
            >
              {submitting ? (
                <Spin
                  size="default"
                  indicator={
                    <LoadingOutlined style={{ color: "black" }} spin />
                  }
                />
              ) : (
                "Submit"
              )}
            </Button>
          </Item>
        </Form>
      </ConfigProvider>
    </div>
  );
}

export default TicketDetails;
