import { Spin, Form, Input, Button, ConfigProvider } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useStore } from "../../store/store";

const { Item } = Form;

function contactForm({ handleContactFormSubmit }: any) {
  const [submitting, setSubmitting] = useState(false);
  const theme = localStorage.getItem("theme") || "light";
  const form = useStore((state) => state.form);
  const updateForm = useStore((state) => state.updateForm);
  const onFinish = async (values: any) => {
    setSubmitting(true);
    const { name, email, phone } = values;
    let visiting_date = form.visiting_date;
    console.log(name, email, phone, visiting_date);
    const data = await handleContactFormSubmit(
      name,
      email,
      phone,
      visiting_date
    );
    setSubmitting(false);
    const input = document.querySelector(
      ".rcb-chat-input-textarea"
    ) as HTMLTextAreaElement;
    if (input) {
      input.value = `${name} ${email} ${phone} ${visiting_date}`;
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
    updateForm("id", data.id);
    updateForm("name", data.name);
    updateForm("email", data.email);
    updateForm("phone", data.phone);
    updateForm("visiting_date", data.visiting_date);
    updateForm("child", data.child);
    updateForm("adult", data.adult);
    updateForm("senior", data.senior);
  };

  return (
    <div
      className={`w-[70%] max-w-[380px] ml-4 p-4 ${
        theme === "dark"
          ? "bg-zinc-800 border-2 text-white border-zinc-700"
          : "bg-zinc-100 text-black"
      } rounded-b-lg rounded-tr-lg border-[1px] border-zinc-200 shadow-sm`}
    >
      <div className="text-semibold text-center pb-3">
        Fill in your details to get started
      </div>
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
          <Item
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input
              placeholder="Enter your name"
              className="w-full p-2 rounded-lg"
              style={{
                backgroundColor: theme === "dark" ? "black" : "white",
                color: theme === "dark" ? "white" : "black",
              }}
            />
          </Item>
          <Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input
              placeholder="Enter your email"
              className="w-full p-2 rounded-lg"
              style={{
                backgroundColor: theme === "dark" ? "black" : "white",
                color: theme === "dark" ? "white" : "black",
              }}
            />
          </Item>

          <Item
            name="phone"
            rules={[
              { required: true, message: "Please input your phone number!" },
              {
                pattern: new RegExp(/^[7-9]{1}[0-9]{9}$/),
                message: "Please enter a valid phone number!",
              },
            ]}
          >
            <Input
              type="text"
              placeholder="Enter your phone number"
              className="w-full p-2 rounded-lg"
              style={{
                backgroundColor: theme === "dark" ? "black" : "white",
                color: theme === "dark" ? "white" : "black",
              }}
              // allowClear={true}
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
                "Send"
              )}
            </Button>
          </Item>
        </Form>
      </ConfigProvider>
    </div>
  );
}

export default contactForm;
