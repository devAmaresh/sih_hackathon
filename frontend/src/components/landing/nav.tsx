import { PiHeart } from "react-icons/pi";
import ChangeLang from "../changeLang";

const Nav = () => {
  return (
    <div>
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-evenly font-semibold bg-transparent backdrop-blur-2xl">
        <div className="flex items-center  border-black p-4">
          <div className="font-mono text-center bg-gradient-to-r from-yellow-500 to-pink-500 bg-clip-text text-transparent">Museum</div>
        </div>
        <div className="md:flex justify-center space-x-14 p-4 hidden">
          <div>
            <a href="#works">How It Works</a>
          </div>
          <div>Service</div>
          <div>Blog</div>
          <div>
            <a href="#gallery">Gallery</a>
          </div>
          <div>About Us</div>
        </div>
        <div className="flex">
          <div className="flex items-center  border-black  p-4">
            <PiHeart className="w-6 h-6" />
          </div>
          <div className="border-black px-4 flex items-center">
            <ChangeLang />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
