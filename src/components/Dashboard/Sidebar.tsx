import logo from "../../assets/logo2.png";
import users from "../../assets/Icons/users.svg";
import bus from "../../assets/Icons/bus.svg";
import location from "../../assets/Icons/location.svg";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div
      className="md:w-1/6 w-1/2 md:relative fixed z-10 bg-dark-green text-slate-300 py-6 h-full hidden md:block"
      id="sidebar"
    >
      <div className="flex justify-center">
        <img src={logo} alt="Logo 2" className="w-14" />
      </div>
      <div className="mt-24 text-sm flex flex-col space-y-1">
        <NavLink to="/dashboard/users">
          <div className="flex py-2 cursor-pointer px-6 items-center">
            <img src={users} alt="Icon" />
            <div className="ml-5">Users</div>
          </div>
        </NavLink>
        <NavLink to="/dashboard/locations">
          <div className="flex py-2 cursor-pointer px-6 items-center">
            <img src={location} alt="Icon" />
            <div className="ml-6">Locations</div>
          </div>
        </NavLink>
        <NavLink to="/dashboard/buses">
          <div className="flex py-2 cursor-pointer px-6 items-center">
            <img src={bus} alt="Icon" />
            <div className="ml-5">Buses</div>
          </div>
        </NavLink>
        <NavLink to="/dashboard/routes">
          <div className="flex py-2 cursor-pointer px-6 items-center">
            <img src={location} alt="Icon" />
            <div className="ml-6">Routes</div>
          </div>
        </NavLink>
      </div>
    </div>
  );
}
