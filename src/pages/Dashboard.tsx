import MainDash from "@/components/Dashboard";
import Buses from "@/components/Dashboard/Buses";
import Permissions from "@/components/Dashboard/Permissions";
import Roles from "@/components/Dashboard/Roles";
import Users from "@/components/Dashboard/Users";
import { Routes, Route, Navigate } from "react-router-dom";

export default function Dashboard() {
  return (
    <MainDash>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard/users" />} />
        <Route path="/users" element={<Users />} />
        <Route path="/locations" element={<div>Locations</div>} />
        <Route path="/buses" element={<Buses />} />
        <Route path="/routes" element={<div>Routes</div>} />
        <Route path="/roles" element={<Roles />} />
        <Route path="/permissions" element={<Permissions />} />
      </Routes>
    </MainDash>
  );
}
