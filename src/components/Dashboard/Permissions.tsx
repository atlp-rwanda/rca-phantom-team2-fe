import Input from "@/components/Input";
import Button from "@/components/Button";
import back from "../../assets/Icons/back.svg";
import { useState, useEffect } from "react";
import Table from "../Table";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import search from "../../assets/Icons/search.svg";
import filter from "../../assets/Icons/filter.svg";
import {
  addNewPermission,
  editPermission,
  fetchPermissions,
} from "@/services/permissions";
import {
  addPermission,
  setPermissions,
  updatePermission,
  setLoading,
} from "@/store/reducers/permissions";
import { Oval } from "react-loader-spinner";

const columns = ["Permission names", "Description", "Model", "Operations"];

export type Permission = {
  id?: string;
  name: string;
  description: string;
  operations: string[];
  modelName: string;
  createdAt?: string;
  updatedAt?: string;
};

export default function Permissions() {
  const [show, setShow] = useState(0);
  const [activeObj, setActiveObj] = useState<Permission>();
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [operations, setOperations] = useState<string>("");
  const [modelName, setModelName] = useState<string>("");

  const dispatch = useDispatch();
  const { permissions, loading } = useSelector(
    (state: RootState) => state.permission
  );

  const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    dispatch(setLoading({ loading: true }));

    let ops: string[] = operations.split(",");
    ops = ops.map((el: string) => el.toUpperCase().trim());

    if (show === 2) {
      editPermission(activeObj?.id as string, {
        name,
        description,
        modelName,
        operations: ops,
      })
        .then(() => {
          dispatch(
            updatePermission({
              updated: {
                id: activeObj?.id as string,
                name,
                description,
                modelName,
                operations: ops,
                updatedAt: activeObj?.updatedAt,
                createdAt: activeObj?.createdAt,
              },
            })
          );
          clearFields();
        })
        .catch((err) => console.log(err));
    } else if (show === 1) {
      addNewPermission({
        name,
        description,
        modelName,
        operations: ops,
      })
        .then((res) => {
          dispatch(addPermission({ permission: res.data.data }));
          clearFields();
        })
        .catch((err) => console.log(err));
    }
  };

  const clearFields = () => {
    dispatch(setLoading({ loading: false }));
    setName("");
    setDescription("");
    setModelName("");
    setOperations("");
    setShow(0);
    setActiveObj(undefined);
  };

  useEffect(() => {
    fetchPermissions()
      .then((res) =>
        dispatch(setPermissions({ permissions: res.data.data.data }))
      )
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
                Add new Permission
              </div>
            </div>
          ) : (
            <div className="font-bold text-dark-green text-2xl">
              Update Permission
            </div>
          )}
          <form className="text-sm">
            <div className="mt-8">
              <label>Name</label>
              <Input
                type="text"
                name="name"
                required
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setName(e.target.value)
                }
              />
            </div>
            <div className="mt-4">
              <label className="mt-30">Description</label>
              <Input
                type="text"
                name="description"
                required
                value={description}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDescription(e.target.value)
                }
              />
            </div>
            <div className="mt-4">
              <label className="mt-30">Modal Name</label>
              <Input
                type="text"
                name="modalName"
                required
                value={modelName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setModelName(e.target.value)
                }
              />
            </div>
            <div className="mt-4">
              <label className="mt-30">Operations</label>
              <Input
                type="text"
                name="operations"
                required
                value={operations}
                placeholder="Comma separated"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setOperations(e.target.value)
                }
              />
            </div>

            <Button type="submit" onClick={handleSubmit}>
              {loading ? (
                <Oval
                  height={20}
                  width={20}
                  color="#fff"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  ariaLabel="oval-loading"
                  secondaryColor="#fff"
                  strokeWidth={5}
                  strokeWidthSecondary={5}
                />
              ) : (
                "Save"
              )}
            </Button>
          </form>
        </div>
      ) : (
        <div className="mt-10">
          <div className="font-bold text-dark-green text-xl">Permissions</div>
          <div className="mb-14 mt-3 flex justify-between items-center">
            <div className="flex items-center">
              <div className="font-medium text-sm">Permissions</div>
              <div className="bg-green-800 rounded-full px-2 py-0.5 text-white text-xs ml-5">
                {permissions.length}
              </div>
            </div>
            <div className="flex w-3/12">
              <div className="relative w-2/3 flex items-center space-x-4">
                <input
                  type="text"
                  className="pl-8 pr-4 py-2 rounded-lg border border-gray-300 w-full focus:outline-none text-xs"
                  placeholder="Search permissions"
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
              className="text-white bg-green-800 text-sm py-2.5 px-6 rounded-lg cursor-pointer"
              onClick={() => setShow(1)}
            >
              New Permission
            </div>
          </div>
          {loading ? (
            <Skeleton count={5} />
          ) : (
            <Table
              columns={columns}
              data={permissions}
              rowsPerPage={9}
              type="permissions"
            />
          )}
        </div>
      )}
    </div>
  );
}
