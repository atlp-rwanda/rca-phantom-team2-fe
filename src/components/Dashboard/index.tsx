import React from "react";
import Sidebar from "@/components/Dashboard/Sidebar";
import Topbar from "@/components/Dashboard/Topbar";
import { useNavigate } from "react-router";

export default function MainDash({ children }: any) {
  const toggleSidebar = () => {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");
    sidebar?.classList.toggle("hidden");
    overlay?.classList.toggle("hidden");
  };
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/signin");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="flex font-inter h-screen relative">
      <Sidebar />
      <div className="p-6 w-full md:w-5/6 h-full overflow-y-scroll">
        <Topbar toggleSidebar={toggleSidebar} />
        {children}
      </div>
      <div
        id="overlay"
        onClick={toggleSidebar}
        className="bg-white bg-opacity-60 fixed w-full h-full hidden"
      ></div>
    </div>
  );
}
