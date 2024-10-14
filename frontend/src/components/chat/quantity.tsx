import { Spin, Form, Input, Button, ConfigProvider } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useStore } from "../../store/store";
import { useMessages } from "react-chatbotify";
import { useTranslation } from "react-i18next";

const { Item } = Form;

function Quantity() {
  const [submitting, setSubmitting] = useState(false);
  const [errorSelect, setErrorSelect] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const theme = localStorage.getItem("theme") || "light";
  const { setMessages } = useMessages();
  const updateForm = useStore((state) => state.updateForm);

  const childPrice = 10;
  const adultPrice = 30;
  const seniorPrice = 15;

  const calculateTotal = (values: any) => {
    const { adult = 0, child = 0, senior = 0 } = values;
    return child * childPrice + adult * adultPrice + senior * seniorPrice;
  };

  const handleChange = (_: any, values: any) => {
    const total = calculateTotal(values);
    setTotalAmount(total);
    setErrorSelect(false);
  };

  const onFinish = async (values: any) => {
    setSubmitting(true);
    const { adult, child, senior } = values;
    if (
      (!adult && !child && !senior) ||
      (adult === 0 && child === 0 && senior === 0) || (totalAmount === 0)
    ) {
      setErrorSelect(true);
      setSubmitting(false);
      return;
    }
   
    const input = document.querySelector(
      ".rcb-chat-input-textarea"
    ) as HTMLTextAreaElement;
    if (input) {
      input.value = `child: ${child || 0}, adult: ${adult || 0}, senior: ${
        senior || 0
      }, total: ${totalAmount} INR`;
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
    updateForm("child", child || 0);
    updateForm("adult", adult || 0);
    updateForm("senior", senior || 0);
    updateForm("amount", totalAmount);
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
  const { t } = useTranslation();
  return (
    <div
      className={`w-[70%] max-w-[380px] ml-4 p-4 ${
        theme === "dark"
          ? "bg-zinc-800 border-2 text-white border-zinc-700"
          : "bg-zinc-100 text-black"
      } rounded-b-lg rounded-tr-lg border-[1px] border-zinc-200 shadow-sm`}
    >
      <div className="text-semibold text-center pb-3">{t("fill_details")}</div>
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
          onValuesChange={handleChange} // Handle change to update total
          className="space-y-4"
        >
          <Item name="child">
            <Input
              type="number"
              placeholder="Enter no of child"
              className="w-full p-2 rounded-lg"
              style={{
                backgroundColor: theme === "dark" ? "black" : "white",
                color: theme === "dark" ? "white" : "black",
              }}
              min={0}
              step={1}
              allowClear={true}
              onChange={() => setErrorSelect(false)}
            />
          </Item>
          <Item name="adult">
            <Input
              type="number"
              placeholder="Enter no of adults"
              className="w-full p-2 rounded-lg"
              style={{
                backgroundColor: theme === "dark" ? "black" : "white",
                color: theme === "dark" ? "white" : "black",
              }}
              min={0}
              step={1}
              allowClear={true}
              onChange={() => setErrorSelect(false)}
            />
          </Item>

          <Item name="senior">
            <Input
              type="number"
              placeholder="Enter your no of Senior"
              className="w-full p-2 rounded-lg"
              style={{
                backgroundColor: theme === "dark" ? "black" : "white",
                color: theme === "dark" ? "white" : "black",
              }}
              min={0}
              step={1}
              allowClear={true}
              onChange={() => setErrorSelect(false)}
            />
          </Item>

          {/* Display total amount */}
          <Item label="Total Amount">
            <Input
              value={`${totalAmount} INR`}
              readOnly
              className="w-full p-1 rounded-lg"
              style={{
                backgroundColor: theme === "dark" ? "black" : "white",
                color: theme === "dark" ? "white" : "black",
              }}
            />
          </Item>

          {errorSelect && (
            <div className="text-red-500 text-xs">
              At least one ticket is required for booking
            </div>
          )}
          <Item>
            <Button
              type="primary"
              htmlType="submit"
              size="middle"
              disabled={submitting}
              style={{ width: "100%", height: "36px" }}
              className={`${
                theme === "dark"
                  ? "bg-[#8B5B29] text-white hover:bg-[#A96A3A]"
                  : "bg-[#FCE9D7] text-black hover:bg-[#F8D6C0]"
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

export default Quantity;
