import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import PageNotFound from "./components/PageNotFound";
import RegisterDriver from "./components/RegisterDrivers";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<RegisterDriver />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/regdriver" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
