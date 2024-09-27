import { useFlow } from "react-chatbotify";
import { HiRefresh } from "react-icons/hi";
import { Button } from "antd";
const heading = () => {
  const { restartFlow } = useFlow();
  return (
    <div className="flex justify-end">
      <div style={{ margin: 0, fontSize: 20, fontWeight: "bold" }}>SalonaX</div>
      <div className="ml-[160px]">
        <Button
        type="default"
          icon={<HiRefresh className="w-5 h-5"/>}
         
          onClick={() => {
            restartFlow();
          }}
        />
      </div>
    </div>
  );
};

export default heading;
