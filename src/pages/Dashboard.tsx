import MainDash from "@/components/Dashboard";
import Buses from "@/components/Dashboard/Buses";
import BusRoutes from "@/components/Dashboard/BusRoutes"
import Locations from "@/components/Dashboard/Locations";
import { Routes, Route, Navigate } from "react-router-dom";

export default function Dashboard() {
  return (
    <MainDash>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard/users" />} />
        <Route path="/users" element={<div>Users</div>} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/buses" element={<Buses />} />
        <Route path="/routes" element={<BusRoutes />} />
        <Route path="/roles" element={<div>Roles</div>} />
      </Routes>
    </MainDash>
  );
}
