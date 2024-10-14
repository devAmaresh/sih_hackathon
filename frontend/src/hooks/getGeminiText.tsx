import axios from "axios";
import i18n from "../utils/i18n";
import { backendUrl } from "../utils/backend_url";

const getGeminiText = async (input: string) => {
  try {
    const response = await axios.post(
      `${backendUrl}/api/gemini-text/`,
      {
        input: input,
        lang: i18n.language,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response.data);
    return response.data.response;
  } catch (error) {
    console.log(error);
    return "Error";
  }
};

export default getGeminiText;
