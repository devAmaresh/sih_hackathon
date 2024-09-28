import { PiHeart } from "react-icons/pi";
import { IoLanguageOutline } from "react-icons/io5";
import { useState } from "react";
import ChangeLang from "../changeLang";
const nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div>
      <div className="flex justify-end p-4 pr-5 text-white font-medium text-sm space-x-6 bg-[#25D366]">
        <div className="">Sign In</div>
        <div className="">Join Us</div>
        <div className="">Help</div>
      </div>
      <hr className="border-[1px] border-black" />
      <div className="flex justify-evenly font-semibold">
        <div className="flex items-center border-l-2 border-black border-r-2 p-4 ">
          <div className="font-mono text-green-500">Mueseum</div>
        </div>
        <div className="md:flex justify-center space-x-14 p-4 hidden ">
          <div className="">
            <a href="#works">How It Works</a>
          </div>
          <div className="">Service</div>
          <div className="">Blog</div>
          <div className="">Community</div>
          <div className="">About Us</div>
        </div>
        <div className="flex">
          <div className="flex items-center border-l-2 border-black border-r-2 p-4 ">
            <PiHeart className="w-6 h-6" />
          </div>
          <div className="relative">
            <div
              className="flex items-center border-black border-r-2 p-4 hover:cursor-pointer"
              onClick={toggleDropdown}
            >
              <IoLanguageOutline className="w-6 h-6" />
            </div>
            {isOpen && <ChangeLang toggleDropdown={toggleDropdown} />}
          </div>
        </div>
      </div>
      <hr className="border-[1px] border-black" />
    </div>
  );
};

export default nav;
