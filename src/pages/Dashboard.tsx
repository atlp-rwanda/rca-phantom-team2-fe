import React from "react";
import Sidebar from "@/components/Dashboard/Sidebar";
import Topbar from "@/components/Dashboard/Topbar";
import Buses from "@/components/Dashboard/Buses";

export default function Dashboard() {
  const [active, setActive] = React.useState(0);

  const toggleSidebar = () => {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");
    sidebar?.classList.toggle("hidden");
    overlay?.classList.toggle("hidden");
  };
  return (
    <div className="flex font-inter h-screen relative">
      <Sidebar active={active} setActive={setActive} />
      <div className="p-6 w-full md:w-5/6 h-full overflow-y-scroll">
        <Topbar toggleSidebar={toggleSidebar} />
        <div className="mt-14">
          <Buses />
        </div>
      </div>
      <div
        id="overlay"
        onClick={toggleSidebar}
        className="bg-white bg-opacity-60 fixed w-full h-full"
      ></div>
    </div>
  );
}
