import i18n from "../utils/i18n";
const changeLang = () => {
  return (
    <div>
      <div>
        {" "}
        <div>
          <button
            onClick={() => i18n.changeLanguage("en")}
            className="p-2 bg-red-200"
          >
            English
          </button>
          <button
            onClick={() => i18n.changeLanguage("bn")}
            className="p-2 bg-red-200"
          >
            বাংলা
          </button>
          <button
            onClick={() => i18n.changeLanguage("hi")}
            className="p-2 bg-red-200"
          >
            हिंदी
          </button>
          <button
            onClick={() => i18n.changeLanguage("gj")}
            className="p-2 bg-red-200"
          >
            ગુજરાતી
          </button>
        </div>
      </div>
    </div>
  );
};

export default changeLang;
