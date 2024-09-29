import axios from "axios";

const getGeminiFile = async (input: File) => {
  try {
    // Create a FormData object
    const formData = new FormData();
    formData.append("file", input);

    const response = await axios.post(
      `http://localhost:8000/api/gemini-file/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", 
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

export default getGeminiFile;
