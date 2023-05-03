import logo from "../../assets/logo2.png";
import users from "../../assets/Icons/users.svg";
import bus from "../../assets/Icons/bus.svg";
import location from "../../assets/Icons/location.svg";

export default function Sidebar({
  active,
  setActive,
}: {
  active: number;
  setActive: any;
}) {
  return (
    <div
      className="md:w-1/6 w-1/2 md:relative fixed z-10 bg-dark-green text-slate-300 py-6 h-full hidden md:block"
      id="sidebar"
    >
      <div className="flex justify-center">
        <img src={logo} alt="Logo 2" className="w-14" />
      </div>
      <div className="mt-24 text-sm flex flex-col space-y-1">
        <div
          className={`flex py-2 cursor-pointer px-6 items-center ${
            active === 0 && "border-l-2 border-l-slate-50"
          }`}
          onClick={() => setActive(0)}
        >
          <img src={users} alt="Icon" />
          <div className="ml-5">Users</div>
        </div>
        <div
          className={`flex py-2 cursor-pointer px-6 items-center ${
            active === 1 && "border-l-2 border-l-slate-50"
          }`}
          onClick={() => setActive(1)}
        >
          <img src={location} alt="Icon" />
          <div className="ml-6">Locations</div>
        </div>
        <div
          className={`flex py-2 cursor-pointer px-6 items-center ${
            active === 2 && "border-l-2 border-l-slate-50"
          }`}
          onClick={() => setActive(2)}
        >
          <img src={bus} alt="Icon" />
          <div className="ml-5">Buses</div>
        </div>
      </div>
    </div>
  );
}
