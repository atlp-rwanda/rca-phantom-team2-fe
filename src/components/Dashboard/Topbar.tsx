import settings from "../../assets/Icons/settings.svg";
import bell from "../../assets/Icons/bell.svg";
import search from "../../assets/Icons/search.svg";
import menu from "../../assets/Icons/menu.svg";
import { logout } from "@/store/authApi";
import { useNavigate } from "react-router-dom";

export default function Topbar({ toggleSidebar }: any) {
  const toggleTopMenu = () => {
    const topMenu = document.getElementById("topMenu");
    topMenu?.classList.toggle("hidden");
  };
  const navigate = useNavigate();
  return (
    <div className="flex justify-between w-full items-center mb-14">
      <div className="relative md:w-2/5 w-3/5 flex items-center space-x-4">
        <div
          className="bg-slate-200 rounded px-1 w-8 h-6 flex items-center justify-center md:hidden"
          onClick={toggleSidebar}
        >
          <img src={menu} alt="Icon" className="" />
        </div>
        <input
          type="text"
          className="pl-9 pr-4 py-2 rounded-lg border-2 border-gray-300 text-sm w-full focus:outline-none"
          placeholder="Search bus location"
        />
        <img
          src={search}
          alt="Icon"
          className="absolute md:left-3 left-10 top-2.5"
        />
      </div>
      <div className="flex md:space-x-6 space-x-4 items-center relative">
        <img src={settings} alt="Settings" className="cursor-pointer" />
        <img src={bell} alt="bell" className="cursor-pointer" />
        <div
          className="w-8 h-8 cursor-pointer relative"
          onClick={toggleTopMenu}
        >
          <img
            src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg"
            alt="Profile"
            className="rounded-full shadow-sm"
          />
        </div>
        <div
          className="absolute bg-white shadow-md right-0 top-11 z-20 text-xs text-gray-700 hidden"
          id="topMenu"
          onClick={toggleTopMenu}
        >
          <div className="pl-4 pr-6 py-2 border-b cursor-pointer hover:bg-slate-50">
            Update
          </div>
          <div
            className="pl-4 pr-6 py-2 cursor-pointer hover:bg-slate-50"
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            Log out
          </div>
        </div>
      </div>
    </div>
  );
}
