import axios from "axios";

const getGeminiText = async (input: string) => {
  try {
    const response = await axios.post(
      `http://localhost:8000/api/gemini-text/`,
      {
        input: input,
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
