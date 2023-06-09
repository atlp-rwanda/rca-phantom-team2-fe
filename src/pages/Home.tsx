import underline from "../assets/underline.png";
import busInside from "../assets/bus-inside.png";
import shapes from "../assets/shapes.png";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="lg:px-10 px-5 pb-10 pt-5 relative font-poppins h-screen overflow-y-scroll overflow-x-hidden">
      <Navbar />
      {/* rome-ignore lint/a11y/useAltText: <explanation> */}
      {/* rome-ignore lint/a11y/useAltText: <explanation> */}
      <img src={shapes} className="absolute top-0 right-0 w-28 -z-10" />
      <div className="flex flex-wrap lg:mt-24 mt-20 w-full">
        <div className="lg:w-1/2 flex flex-col lg:justify-normal justify-center items-center lg:items-start">
          <div>
            <h2 className="text-black text-2xl font-bold text-center lg:text-left">
              Book Your Seat
            </h2>
            <div className="mt-1 text-center lg:text-left text-sm">
              Your Bus, Your Seat
            </div>
            <img
              src={underline}
              alt="Underline Pic"
              className=" lg:w-3/4 w-full mt-1"
            />
          </div>
          <div className="mt-8 text-sm font-medium text-center lg:text-left px-4 lg:px-0 lg:w-3/4">
            <p>
              No more long hours standing at the bus stop waiting for a bus. As
              easy as it is, just choose the route to your location, we will
              show you available buses coming your way at a very proximated
              time. Your time is valuable
            </p>
            <p className="mt-5">Your time is valuable</p>
          </div>
          <Link to="/Login">
            <div className="lg:mt-14 mt-8 bg-dark-green py-2.5 w-32 text-white rounded-md text-xs text-center font-semibold cursor-pointer">
              GET STARTED
            </div>
          </Link>
        </div>
        <div className="lg:w-1/2 w-full relative lg:flex md:h-auto h-56 flex justify- n items-center mt-14 lg:mt-0">
          <div className="lg:w-3/4 w-3/5 border-2 border-gray-300 r n-2xl h-full"></div>
          <img
            src={busInside}
            alt="busInside"
            className="rounded-2xl absolute lg:top-5 top-4 lg:right-11 right-28 lg:w-3/4 w-3/5 shadow-lg"
            style={{ height: "86%" }}
          />
        </div>
      </div>
      <div className="flex w-full md:flex-nowrap flex-wrap justify-between md:space-x-10 mt-20">
        <div className="flex flex-col items-center border-r border-r-gray-400 md:w-1/4 w-1/2 mt-8">
          <div className="text-lg font-bold text-dark-green">24/7</div>
          <div className="mt-2 text-xs font-medium">Hours per week</div>
        </div>
        <div className="flex flex-col items-center md:border-r border-r-gray-400 md:w-1/4 w-1/2 mt-8">
          <div className="text-lg font-bold text-dark-green">60+</div>
          <div className="mt-2 text-xs font-medium">Buses using our system</div>
        </div>
        <div className="flex flex-col items-center border-r border-r-gray-400 md:w-1/4 w-1/2 mt-8">
          <div className="text-lg font-bold text-dark-green">183+</div>
          <div className="mt-2 text-xs font-medium">Active users</div>
        </div>
        <div className="flex flex-col items-center md:w-1/4 w-1/2 mt-8">
          <div className="text-lg font-bold text-dark-green">3+</div>
          <div className="mt-2 text-xs font-medium">Years of System Usage</div>
        </div>
      </div>
    </div>
  );
}
