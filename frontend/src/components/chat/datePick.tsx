import { useState } from "react";
import { Button } from "antd";
import { RiSendPlane2Line } from "react-icons/ri";
import { useStore } from "../../store/store";

const datePick = () => {
  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  };

  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const today = new Date().toISOString().split("T")[0];
  const nextMonth = new Date();
  nextMonth.setMonth(nextMonth.getMonth() + 1);

  const maxDate = nextMonth.toISOString().split("T")[0];

  const updateForm = useStore((state) => state.updateForm);

  return (
    <div className="ml-4 mt-1 rounded-md">
      <input
        type="date"
        className="p-0.5 border-2 rounded-lg mr-2 placeholder-text"
        value={date}
        min={today}
        max={maxDate}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          updateForm("visiting_date", e.target.value || today);
          const formattedDate = formatDate(e.target.value);
          setDate(e.target.value);
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
