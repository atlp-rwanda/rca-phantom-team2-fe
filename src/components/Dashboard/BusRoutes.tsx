import Input from "@/components/Input";
import Button from "@/components/Button";
import back from "../../assets/Icons/back.svg";
import { useState, useEffect } from "react";
// import RoutesTable from "../RoutesTable";
import { addNewBusRoutes, editBusRoutes, fetchBusesRoutes, deleteBusRoutes } from "@/services/busesRoutes";
import { useDispatch, useSelector } from "react-redux";

import { addBusRoute, removeBusRoute, setBusRoutes, setLoading, updateBusRoute } from "@/store/reducers/busRoutes";


import { RootState } from "@/store";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import search from "../../assets/Icons/search.svg";
import filter from "../../assets/Icons/filter.svg";
import Table from "../Table";

const columns = [
  "Route Name",
  "Route Origin",
  "Route Destination",

];

export type BusRoute = {
  id: string;
  name: string;
  origin: string;
  destination: string;
  createdAt?: string;
  updatedAt?: string;
};

export type NewBusRoute = {
  name: string;
  origin: string;
  destination: string;
};

export default function BusRoutes() {
  const [show, setShow] = useState(0);
  const [activeObj, setActiveObj] = useState<BusRoute>();
  const [name, setName] = useState<string>("");
  const [origin, setOrigin] = useState<string>("");
  const [destination, setDestination] = useState<string>("");

  const dispatch = useDispatch();
  const { routes, loading } = useSelector((state: RootState) => state.route);

  const handleAction = (type: string, obj: BusRoute) => {
    if (type === "edit") {
      setActiveObj(obj as BusRoute);
      setName(obj.name);
      setOrigin(obj.origin);
      setDestination(obj.destination);
      setShow(2);
    } else if (type === "delete") {
      dispatch(setLoading());
      deleteBusRoutes(obj.id)
        .then(() => dispatch(removeBusRoute({ id: obj.id })))
        .catch((err) => console.log(err));
    }
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (show === 2) {
      editBusRoutes(activeObj?.id as string, {
        name,
        origin,
        destination
      })
        .then(() => {
          dispatch(
            updateBusRoute({
              updated: {
                id: activeObj?.id as string,
                name,
                origin,
                destination,
                updatedAt: activeObj?.updatedAt,
                createdAt: activeObj?.createdAt,
              },
            })
          );
          clearFields();
        })
        .catch((err) => console.log(err));
    } else if (show === 1) {
      addNewBusRoutes({
        name,
        origin,
        destination
      })
        .then((res) => {
          dispatch(addBusRoute({ route: res.data.data }));
          clearFields();
        })
        .catch((err) => console.log(err));
    }
  };

  const clearFields = () => {
    setName("");
    setOrigin("");
    setDestination("");
    setShow(0);
  };

  useEffect(() => {
    fetchBusesRoutes()
      .then((res) => dispatch(setBusRoutes({ routes: res.data.data.data })))
      .catch((err) => console.log(err));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <img
        src={back}
        alt="Back"
        className={`cursor-pointer ${show === 0 ? "hidden" : "block"}`}
        onClick={clearFields}
      />
      {show === 1 || show === 2 ? (
        <div className="md:ml-10 mt-10">
          {show === 1 ? (
            <div>
              <div className="font-bold text-dark-green text-2xl">
                Add new route
              </div>
              <div className="text-gray-400 mt-1 text-xs">
                New route creation
              </div>
            </div>
          ) : (
            <div className="font-bold text-dark-green text-2xl">Update route</div>
          )}
          <form className="text-sm">
            <div className="mt-8">
              <label>Route Name</label>
              <Input
                type="text"
                name="name"
                placeholder="ex: Nyamirambo-Nyabugogo"
                required
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setName(e.target.value)
                }
              />
            </div>
            <div className="mt-4">
              <label className="mt-30">Route Origin</label>
              <Input
                type="text"
                name="origin"
                placeholder="Nyamirambo"
                required
                value={origin}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setOrigin(e.target.value)
                }
              />
            </div>
            <div className="mt-4">
              <label className="mt-30">Route Destination</label>
              <Input
                type="text"
                name="destination"
                placeholder="Nyabugogo"
                required
                value={destination}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDestination(e.target.value)
                }
              />
            </div>
            <Button type="submit" onClick={handleSubmit}>
              Save
            </Button>
          </form>
        </div>
      ) : (
        <div className="mt-10">
          <div className="font-bold text-dark-green text-xl">Routes</div>
          <div className="mb-14 mt-3 flex justify-between items-center">
            <div className="flex items-center">
              <div className="font-medium text-sm">Routes</div>
              <div className="bg-green-800 rounded-full px-2 py-0.5 text-white text-xs ml-5">
                2
              </div>
            </div>
            <div className="flex w-3/12">
              <div className="relative w-2/3 flex items-center space-x-4">
                <input
                  type="text"
                  className="pl-8 pr-4 py-2 rounded-lg border border-gray-300 w-full focus:outline-none text-xs"
                  placeholder="Search routes"
                />
                <img
                  src={search}
                  alt="Icon"
                  className="absolute md:-left-1.5 left-0 top-1.5"
                />
              </div>
              <div className="border border-gray-300 rounded-lg flex justify-center items-center px-2 ml-3 cursor-pointer">
                <img src={filter} alt="Icon" />
              </div>
            </div>
            <div
              className="text-white bg-green-800 text-xs py-2 px-8 rounded-lg cursor-pointer"
              onClick={() => setShow(1)}
            >
              New Route
            </div>
          </div>
          {loading ? (
            <Skeleton count={5} />
          ) : (
            <Table
              columns={columns}
              data={routes}
              rowsPerPage={9}
              type="busesRoutes"
              handleAction={handleAction}
            />
          )}
        </div>
      )}
    </div>
  );
}
