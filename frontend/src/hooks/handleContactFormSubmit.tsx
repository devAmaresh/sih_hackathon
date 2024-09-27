import axios from "axios";

const handleContactFormSubmit = async (
  name: string,
  email: string,
  phone: number,
  visiting_date: string
) => {
  try {
    const response = await axios.post(
      `http://localhost:8000/api/book-ticket/`,
      {
        name: name,
        email: email,
        phone: phone,
        visiting_date: visiting_date,
      },
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return "Error";
  }
};
export default handleContactFormSubmit;
