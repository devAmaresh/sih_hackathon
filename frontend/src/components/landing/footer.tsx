import { FaSquareFacebook, FaXTwitter } from "react-icons/fa6";
import { SlSocialInstagram } from "react-icons/sl";
const Footer = () => {
  return (
    <div className="bg-[#00ff9d] text-black border-t-2 border-black p-8 flex flex-col items-center shadow-lg">
      <div className="flex flex-col md:flex-row md:justify-between w-full max-w-6xl">
        <div className="mb-4 md:mb-0">
          <h3 className="text-xl font-bold mb-2">Contact Us</h3>
          <p className="text-sm opacity-90">Email: info@museum.com</p>
          <p className="text-sm opacity-90">Phone: (123) 456-7890</p>
        </div>
        <div className="mb-4 md:mb-0">
          <h3 className="text-xl font-bold mb-2">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="">
              <FaSquareFacebook className="w-6 h-6"/>
            </a>
            <a href="#" className="">
              <FaXTwitter className="w-6 h-6"/>
            </a>
            <a href="#" className="">
              <SlSocialInstagram className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
      <div className="mt-6 text-sm font-mono">
        © {new Date().getFullYear()} SalonaX. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
