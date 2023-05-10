import MainDash from "@/components/Dashboard";
import Buses from "@/components/Dashboard/Buses";
import Permissions from "@/components/Dashboard/Permissions";
import Roles from "@/components/Dashboard/Roles";
import Users from "@/components/Dashboard/Users";
import BusRoutes from "@/components/Dashboard/BusRoutes";
import Locations from "@/components/Dashboard/Locations";
import { Routes, Route, Navigate } from "react-router-dom";

export default function Dashboard() {
  return (
    <MainDash>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard/users" />} />
        <Route path="/users" element={<Users />} />
        <Route path="/buses" element={<Buses />} />
        <Route path="/roles" element={<Roles />} />
        <Route path="/permissions" element={<Permissions />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/routes" element={<BusRoutes />} />
      </Routes>
    </MainDash>
  );
}
