import Input from "@/components/Input";
import Button from "@/components/Button";
import back from "../../assets/Icons/back.svg";
import { useState, useEffect } from "react";
import Table from "../Table";
import { addNewBus, editBus, fetchBuses } from "@/services/buses";
import { useDispatch, useSelector } from "react-redux";
import {
  addBus,
  removeBus,
  setBuses,
  setLoading,
  updateBus,
} from "@/store/reducers/buses";
import { RootState } from "@/store";
import { deleteBus } from "@/services/buses";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import search from "../../assets/Icons/search.svg";
import filter from "../../assets/Icons/filter.svg";

const columns = [
  "Type",
  "Plate Number",
  "Registration Number",
  "Model",
  "Number of Seats",
  "Available Seats",
];

export type Bus = {
  id: string;
  type: string;
  plateNumber: string;
  regNumber: string;
  model: string;
  numOfSeats?: number;
  availbleSeats?: number;
  status?: string;
  manufacturer: string;
  createdAt?: string;
  updatedAt?: string;
};

export type NewBus = {
  type: string;
  plateNumber: string;
  regNumber: string;
  model: string;
  manufacturer: string;
  numOfSeats?: number;
  availbleSeats?: number;
  status?: string;
};

export default function Buses() {
  const [show, setShow] = useState(0);
  const [activeObj, setActiveObj] = useState<Bus>();
  const [type, setType] = useState<string>("");
  const [plateNumber, setPlateNumber] = useState<string>("");
  const [regNumber, setRegNumber] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [manufacturer, setManufacturer] = useState<string>("");

  const dispatch = useDispatch();
  const { buses, loading } = useSelector((state: RootState) => state.bus);

  const handleAction = (type: string, obj: Bus) => {
    if (type === "edit") {
      setActiveObj(obj as Bus);
      setType(obj.type);
      setPlateNumber(obj.plateNumber);
      setRegNumber(obj.regNumber);
      setModel(obj.model);
      setManufacturer(obj.manufacturer);
      setShow(2);
    } else if (type === "delete") {
      dispatch(setLoading());
      deleteBus(obj.id)
        .then(() => dispatch(removeBus({ id: obj.id })))
        .catch((err) => console.log(err));
    }
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (show === 2) {
      editBus(activeObj?.id as string, {
        type,
        plateNumber,
        regNumber,
        model,
        manufacturer,
      })
        .then(() => {
          dispatch(
            updateBus({
              updated: {
                id: activeObj?.id as string,
                type,
                plateNumber,
                regNumber,
                model,
                manufacturer,
                updatedAt: activeObj?.updatedAt,
                createdAt: activeObj?.createdAt,
              },
            })
          );
          clearFields();
        })
        .catch((err) => console.log(err));
    } else if (show === 1) {
      addNewBus({
        type,
        plateNumber,
        regNumber,
        model,
        manufacturer,
        numOfSeats: 30,
        availbleSeats: 30,
        status: "STOPPED",
      })
        .then((res) => {
          dispatch(addBus({ bus: res.data.data }));
          clearFields();
        })
        .catch((err) => console.log(err));
    }
  };

  const clearFields = () => {
    setType("");
    setPlateNumber("");
    setRegNumber("");
    setModel("");
    setManufacturer("");
    setShow(0);
  };

  useEffect(() => {
    fetchBuses()
      .then((res) => dispatch(setBuses({ buses: res.data.data.data })))
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
                Add new bus
              </div>
              <div className="text-gray-400 mt-1 text-xs">
                New bus, a driver, and a route
              </div>
            </div>
          ) : (
            <div className="font-bold text-dark-green text-2xl">Update bus</div>
          )}
          <form className="text-sm">
            <div className="mt-8">
              <label>Type</label>
              <Input
                type="text"
                name="type"
                placeholder="ex: Single-deck"
                required
                value={type}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setType(e.target.value)
                }
              />
            </div>
            <div className="mt-4">
              <label className="mt-30">Plate Number</label>
              <Input
                type="text"
                name="plateNumber"
                placeholder="ex: RAD456Z"
                required
                value={plateNumber}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPlateNumber(e.target.value)
                }
              />
            </div>
            <div className="mt-4">
              <label className="mt-30">Registration Number</label>
              <Input
                type="text"
                name="regNumber"
                placeholder="0A0AA00A0A0000000"
                required
                value={regNumber}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setRegNumber(e.target.value)
                }
              />
            </div>
            <div className="mt-4">
              <label className="mt-30">Model</label>
              <Input
                type="text"
                name="model"
                placeholder="ex: Volvo"
                required
                value={model}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setModel(e.target.value)
                }
              />
            </div>
            <div className="mt-4">
              <label className="mt-30">Manufacturer</label>
              <Input
                type="text"
                name="manufacturer"
                placeholder="ex: Toyota"
                required
                value={manufacturer}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setManufacturer(e.target.value)
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
          <div className="font-bold text-dark-green text-xl">Buses</div>
          <div className="mb-14 mt-3 flex justify-between items-center">
            <div className="flex items-center">
              <div className="font-medium text-sm">Passengers</div>
              <div className="bg-green-800 rounded-full px-2 py-0.5 text-white text-xs ml-5">
                31
              </div>
            </div>
            <div className="flex w-3/12">
              <div className="relative w-2/3 flex items-center space-x-4">
                <input
                  type="text"
                  className="pl-8 pr-4 py-2 rounded-lg border border-gray-300 w-full focus:outline-none text-xs"
                  placeholder="Search passengers"
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
              className="text-white bg-green-800 text-sm py-2 px-8 rounded-lg cursor-pointer"
              onClick={() => setShow(1)}
            >
              New Bus
            </div>
          </div>
          {loading ? (
            <Skeleton count={5} />
          ) : (
            <Table
              columns={columns}
              data={buses}
              rowsPerPage={9}
              type="buses"
              handleAction={handleAction}
            />
          )}
        </div>
      )}
    </div>
  );
}
