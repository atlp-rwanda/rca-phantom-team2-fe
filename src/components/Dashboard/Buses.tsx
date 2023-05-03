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

const columns = [
  "Type",
  "Plate Number",
  "Registration Number",
  "Model",
  "Manufacturer",
  "Created At",
];

export type Bus = {
  id: string;
  type: string;
  plateNumber: string;
  regNumber: string;
  model: string;
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
};

export default function Buses() {
  const [show, setShow] = useState(0);
  const [activeObj, setActiveObj] = useState<Bus>();
  const [type, setType] = useState<string>("");
  const [plateNumber, setPlateNumber] = useState<string>("");
  const [regNumber, setRegNumber] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [manufacturer, setManufacturer] = useState<string>("");
  const [displayData, setDisplayData] = useState<Bus[]>([]);

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
      addNewBus({ type, plateNumber, regNumber, model, manufacturer })
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

  useEffect(() => {
    const _t: Bus[] = buses.map((b: Bus) => {
      return {
        id: b.id,
        type: b.type,
        plateNumber: b.plateNumber,
        regNumber: b.regNumber,
        model: b.model,
        manufacturer: b.manufacturer,
        createdAt: new Date(b.createdAt as string).toDateString(),
      };
    });
    setDisplayData(_t);
  }, [buses]);

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
        <div className="mt-14">
          <div className="mb-8 flex justify-between items-center">
            <div className="font-bold text-dark-green text-2xl">All buses</div>
            <div
              className="text-white bg-dark-green text-xs py-2 px-8 rounded-lg cursor-pointer"
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
              data={displayData}
              rowsPerPage={9}
              handleAction={handleAction}
            />
          )}
        </div>
      )}
    </div>
  );
}
