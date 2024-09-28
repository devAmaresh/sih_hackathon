import axios from "axios";

const getTicketDetails = async (ticketId: string | null, email: string | null) => {
  try {
    
    
    const response = await axios.get(
      `http://localhost:8000/api/booking-details/`,
      {
        params: {
          email: email,
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
