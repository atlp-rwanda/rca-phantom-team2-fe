import React from "react";
import Counter from "../components/Counter";

export default function Home() {
  return <div className="w-screen h-screen flex flex-col justify-center items-center bg-white text-black">
    <Counter/>
  </div>;
}
