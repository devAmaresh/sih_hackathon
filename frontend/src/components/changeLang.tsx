import { useState } from "react";
import { message } from "antd";
import { CheckOutlined } from "@ant-design/icons"; // Import the tick icon
import i18n from "../utils/i18n";

const ChangeLang = ({ toggleDropdown }: any) => {
  const [selectedLang, setSelectedLang] = useState(i18n.language);
  const handleLanguageChange = (lang: string, langName: string) => {
    i18n.changeLanguage(lang);
    setSelectedLang(lang);
    message.success(`Language Changed to ${langName}`);
    toggleDropdown();
  };

  return (
    <div className="absolute bg-white border-2 rounded-md border-black shadow-md mt-2">
      <button
        onClick={() => handleLanguageChange("en", "English")}
        className="p-2 hover:bg-green-200 w-full rounded-md flex items-center justify-between min-w-28"
      >
        <span>English</span>
        {selectedLang === "en" && <CheckOutlined className="ml-2"/>} 
      </button>
      <button
        onClick={() => handleLanguageChange("bn", "Bengali")}
        className="p-2 hover:bg-green-200 w-full rounded-md flex items-center justify-between"
      >
        <span>বাংলা</span>
        {selectedLang === "bn" && <CheckOutlined className="ml-2"/>} 
      </button>
      <button
        onClick={() => handleLanguageChange("hi", "Hindi")}
        className="p-2 hover:bg-green-200 w-full rounded-md flex items-center justify-between"
      >
        <span>हिंदी</span>
        {selectedLang === "hi" && <CheckOutlined className="ml-2"/>} 
      </button>
      <button
        onClick={() => handleLanguageChange("gj", "Gujarati")}
        className="p-2 hover:bg-green-200 w-full rounded-md flex items-center justify-between"
      >
        <span>ગુજરાતી</span>
        {selectedLang === "gj" && <CheckOutlined className="ml-2"/>} 
      </button>
    </div>
  );
};

export default ChangeLang;
