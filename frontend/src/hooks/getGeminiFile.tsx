import axios from "axios";
import i18n from "../utils/i18n";
import { backendUrl } from "../utils/backend_url";

const getGeminiFile = async (input: File) => {
  try {
    const formData = new FormData();
    formData.append("file", input);

    formData.append("lang", i18n.language);

    const response = await axios.post(
      `${backendUrl}/api/gemini-file/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // console.log(response.data);
    return response.data.response;
  } catch (error) {
    console.log(error);
    return "Error";
  }
};

export default getGeminiFile;
