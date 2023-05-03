import { useState } from "react";
import logo from "../assets/logo.png";
import profile from "../assets/profile.png";
import notification from "../assets/notification.png";
import settings from "../assets/settings.png";

export default function Searchbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="flex justify-between items-center text-xs flex-wrap relative">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-12" />
        <div className="text-gray-500 ml-5">-Your Bus, Your Seat</div>
      </div>
      <div></div>
      <div className="flex items-center space-x-5">
        <img src={settings} alt="Logo" />
        <img src={notification} alt="Logo" />
        <img src={profile} alt="Logo" className="h-6 " />
      </div>
      <div className="block lg:hidden">
        <div onClick={() => setIsOpen(!isOpen)}>
          <svg
            className={`fill-current h-6 w-6 ${isOpen ? "hidden" : "block"}`}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
          <svg
            className={`fill-current h-6 w-6 ${isOpen ? "block" : "hidden"}`}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
          </svg>
        </div>
      </div>
    </nav>
  );
}
