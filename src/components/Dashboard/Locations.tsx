import Input from "@/components/Input";
import Button from "@/components/Button";
import back from "../../assets/Icons/back.svg";
import { useState, useEffect } from "react";
import { addNewLocation, editLocation, fetchLocations, deleteLocation } from "@/services/locations";
import { useDispatch, useSelector } from "react-redux";

import { addLocation, removeLocation, setLocations, setLoading, updateLocation } from "@/store/reducers/location";


import { RootState } from "@/store";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import search from "../../assets/Icons/search.svg";
import filter from "../../assets/Icons/filter.svg";
import Table from "../Table";

const columns = [
  "Location Name",
  "Location Longitude",
  "Location Latitude",

];

export type Location = {
  id: string;
  name: string;
  latitude: string;
  longitude: string;
  createdAt?: string;
  updatedAt?: string;
};

export type NewLocation = {
  name: string;
  latitude: string;
  longitude: string;
};

export default function Locations() {
  const [show, setShow] = useState(0);
  const [activeObj, setActiveObj] = useState<Location>();
  const [name, setName] = useState<string>("");
  const [latitude, setLatitude] = useState<string>("");
  const [longitude, setLongitude] = useState<string>("");

  const dispatch = useDispatch();
  const { locations, loading } = useSelector((state: RootState) => state.location);

  const handleAction = (type: string, obj: Location) => {
    if (type === "edit") {
      setActiveObj(obj as Location);
      setName(obj.name);
      setLatitude(obj.latitude);
      setLongitude(obj.longitude);
      setShow(2);
    } else if (type === "delete") {
      dispatch(setLoading());
      deleteLocation(obj.id)
        .then(() => dispatch(removeLocation({ id: obj.id })))
        .catch((err) => console.log(err));
    }
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (show === 2) {
      editLocation(activeObj?.id as string, {
        name,
        latitude,
        longitude
      })
        .then(() => {
          dispatch(
            updateLocation({
              updated: {
                id: activeObj?.id as string,
                name,
                latitude,
                longitude,
                updatedAt: activeObj?.updatedAt,
                createdAt: activeObj?.createdAt,
              },
            })
          );
          clearFields();
        })
        .catch((err) => console.log(err));
    } else if (show === 1) {
      addNewLocation({
        name,
        latitude,
        longitude
      })
        .then((res) => {
          dispatch(addLocation({ location: res.data.data }));
          clearFields();
        })
        .catch((err) => console.log(err));
    }
  };

  const clearFields = () => {
    setName("");
    setLatitude("");
    setLongitude("");
    setShow(0);
  };

  useEffect(() => {
    fetchLocations()
      .then((res) => dispatch(setLocations({ locations: res.data.data.data })))
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
                Add location
              </div>
              <div className="text-gray-400 mt-1 text-xs">
                New location creation
              </div>
            </div>
          ) : (
            <div className="font-bold text-dark-green text-2xl">Update location</div>
          )}
          <form className="text-sm">
            <div className="mt-8">
              <label>Location Name</label>
              <Input
                type="text"
                name="name"
                placeholder="ex: Nyamirambo"
                required
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setName(e.target.value)
                }
              />
            </div>
            <div className="mt-4">
              <label className="mt-30">Location Latitude</label>
              <Input
                type="number"
                name="latitude"
                placeholder="0"
                required
                value={latitude}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setLatitude(e.target.value)
                }
              />
            </div>
            <div className="mt-4">
              <label className="mt-30">Location Longitude</label>
              <Input
                type="number"
                name="longitude"
                placeholder="0"
                required
                value={longitude}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setLongitude(e.target.value)
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
          <div className="font-bold text-dark-green text-xl">Locations</div>
          <div className="mb-14 mt-3 flex justify-between items-center">
            <div className="flex items-center">
              <div className="font-medium text-sm">Locations</div>
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
              New Location
            </div>
          </div>
          {loading ? (
            <Skeleton count={5} />
          ) : (
            <Table
              columns={columns}
              data={locations}
              rowsPerPage={9}
              type="locations"
              handleAction={handleAction}
            />
          )}
        </div>
      )}
    </div>
  );
}
