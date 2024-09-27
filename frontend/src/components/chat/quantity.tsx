import { Button } from "antd";
import { RiSendPlane2Line } from "react-icons/ri";
const quantity = () => {
  return (
    <div className="ml-4 mt-1 rounded-md">
     <div>No of children</div>
      <input
        type="number"
        className="p-0.5 border-2 rounded-lg"
      />
      <Button
        type="default"
        icon={<RiSendPlane2Line />}
        onClick={() => {
          const input = document.querySelector(
            ".rcb-chat-input-textarea"
          ) as HTMLTextAreaElement;
          if (input) {
            
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

export default quantity;
