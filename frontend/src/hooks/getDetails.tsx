import axios from "axios";
import { backendUrl } from "../utils/backend_url";

const getTicketDetails = async (
  ticketId: string | null,
  email: string | null,
  phone: string | null
) => {
  try {
    const response = await axios.get(`${backendUrl}/api/booking-details/`, {
      params: {
        email: email,
        booking_id: ticketId,
        phone: phone,
      },
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return "Error";
  }
};

export default getTicketDetails;
