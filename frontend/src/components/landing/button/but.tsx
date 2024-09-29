import { IoIosArrowRoundForward } from "react-icons/io";

const but = ({ text }: any) => {
  return (
    <button className="flex bg-black text-white space-x-2 p-1.5 items-center">
      <div className="ml-2 text-sm">{text}</div>
      <div className="bg-white p-1 px-2">
        <IoIosArrowRoundForward className="w-6 h-6 text-black" />
      </div>
    </button>
  );
};

export default but;
