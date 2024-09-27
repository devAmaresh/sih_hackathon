import { useState } from "react";
import { Button } from "antd";
import { RiSendPlane2Line } from "react-icons/ri";
import { useStore } from "../../store/store";
const datePick = () => {
  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  };
  const [date, setDate] = useState("");
  const today = new Date().toISOString().split("T")[0];
  const updateForm = useStore((state) => state.updateForm);
  return (
    <div className="ml-4 mt-1 rounded-md">
      <input
        type="date"
        className="p-0.5 border-2 rounded-lg"
        min={today} // Set min to today's date
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          updateForm("visiting_date", e.target.value);
          const formattedDate = formatDate(e.target.value);
          setDate(formattedDate);
          console.log(formattedDate);
        }}
      />
      <Button
        type="default"
        icon={<RiSendPlane2Line />}
        onClick={() => {
          const input = document.querySelector(
            ".rcb-chat-input-textarea"
          ) as HTMLTextAreaElement;
          if (input) {
            input.value = date;
            console.log(date);
          }

          const inputEvent = new Event("input", { bubbles: true });
          input.dispatchEvent(inputEvent);
          const enterKeyEvent = new KeyboardEvent("keydown", {
            key: "Enter",
            bubbles: true,
            cancelable: true,
            keyCode: 13,
          });
          input.dispatchEvent(enterKeyEvent);
        }}
      />
    </div>
  );
};

export default datePick;
