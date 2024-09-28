import Chat from "./components/chat";
import ChangeLang from "./components/changeLang";
import i18n from "./utils/i18n";
import { useEffect, useState } from "react";
import Page from "./components/landing/page";
function App() {
  useEffect(() => {
    const handleLanguageChange = (lng: any) => {
      console.log("Language changed to:", lng);
      setCurrentLanguage(lng);
    };

    i18n.on("languageChanged", handleLanguageChange);

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, []);
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  return (
    <>
      <div className="w-full h-full bg-[#FCF5EB]">
        <Page />
        <Chat key={currentLanguage} />
      </div>
    </>
  );
}

export default App;
