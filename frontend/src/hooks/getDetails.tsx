import axios from "axios";

const getTicketDetails = async (ticketId: string) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/booking-details/`,
      {
        params: {
          booking_id: ticketId,
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
export default getTicketDetails;
