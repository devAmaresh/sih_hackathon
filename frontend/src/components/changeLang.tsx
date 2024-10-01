import { Button, Dropdown, MenuProps, message } from "antd";
import { CheckOutlined } from "@ant-design/icons"; // Import the tick icon
import i18n from "../utils/i18n";
import { IoLanguageOutline } from "react-icons/io5";
import { useState } from "react";

const changeLang = () => {
  const [selectedLang, setSelectedLang] = useState<string>(i18n.language);
  const handleLanguageChange = (lang: string, langName: string) => {
    i18n.changeLanguage(lang);
    setSelectedLang(lang);
    message.success(`Chatbot language Changed to ${langName}`);
  };
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div
          className={`p-2 w-full rounded-md flex items-center justify-between min-w-28 mb-1 ${
            selectedLang === "en" ? "bg-[#ededed]" : ""
          }`}
        >
          <span>English</span>
          {selectedLang === "en" && <CheckOutlined className="ml-2" />}
        </div>
      ),
      onClick: () => handleLanguageChange("en", "English"),
      disabled: selectedLang === "en",
    },
    {
      key: "2",
      label: (
        <div
          className={`p-2 w-full rounded-md flex items-center justify-between mb-1 ${
            selectedLang === "bn" ? "bg-[#ededed]" : ""
          }`}
        >
          <span>বাংলা</span>
          {selectedLang === "bn" && <CheckOutlined className="ml-2" />}
        </div>
      ),
      disabled: selectedLang === "bn",
      onClick: () => handleLanguageChange("bn", "Bengali"),
    },
    {
      key: "3",
      label: (
        <div
          className={`p-2 w-full rounded-md flex items-center justify-between mb-1 ${
            selectedLang === "hi" ? "bg-[#ededed]" : ""
          }`}
        >
          <span>हिंदी</span>
          {selectedLang === "hi" && <CheckOutlined className="ml-2" />}
        </div>
      ),
      disabled: selectedLang === "hi",
      onClick: () => handleLanguageChange("hi", "Hindi"),
    },
    {
      key: "4",
      label: (
        <div
          className={`p-2 w-full rounded-md flex items-center justify-between ${
            selectedLang === "gj" ? "bg-[#ededed]" : ""
          }`}
        >
          <span>ગુજરાતી</span>
          {selectedLang === "gj" && <CheckOutlined className="ml-2" />}
        </div>
      ),
      disabled: selectedLang === "gj",
      onClick: () => handleLanguageChange("gj", "Gujarati"),
    },
  ];
  return (
    <Dropdown
      menu={{ items }}
      placement="topRight"
      arrow={{ pointAtCenter: true }}
    >
      <Button
        icon={<IoLanguageOutline className="w-6 h-6" />}
        type="text"
      ></Button>
    </Dropdown>
  );
};
export default changeLang;
