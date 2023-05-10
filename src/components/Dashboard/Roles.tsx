import Input from "@/components/Input";
import Button from "@/components/Button";
import back from "../../assets/Icons/back.svg";
import { useState } from "react";
import Table from "../Table";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import search from "../../assets/Icons/search.svg";
import filter from "../../assets/Icons/filter.svg";
import {
  addNewRole,
  deleteRole,
  editRole,
  grantPermission,
} from "@/services/role";
import {
  addRole,
  removeRole,
  setLoading,
  updateRole,
} from "@/store/reducers/roles";

const columns = ["Role names", "Description"];

export type Role = {
  id: string;
  name: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
};

export type NewRole = {
  name: string;
  description: string;
};

export type RolePermission = {
  roleId: string;
  permissionId: string;
};

export default function Roles() {
  const [show, setShow] = useState(0);
  const [activeObj, setActiveObj] = useState<Role>();
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [rolePermissions, setRolePermissions] = useState<string>("");

  const dispatch = useDispatch();
  const { roles, loading } = useSelector((state: RootState) => state.role);
  const { permissions } = useSelector((state: RootState) => state.permission);

  const handleAction = (type: string, obj: Role) => {
    if (type === "edit") {
      setActiveObj(obj as Role);
      setName(obj.name);
      setDescription(obj.description);
      setShow(2);
    } else if (type === "delete") {
      dispatch(setLoading());
      deleteRole(obj.id)
        .then(() => dispatch(removeRole({ id: obj.id })))
        .catch((err) => console.log(err));
    }
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (show === 2) {
      editRole(activeObj?.id as string, {
        name,
        description,
      })
        .then(() => {
          dispatch(
            updateRole({
              updated: {
                id: activeObj?.id as string,
                name,
                description,
                updatedAt: activeObj?.updatedAt,
                createdAt: activeObj?.createdAt,
              },
            })
          );
          clearFields();
        })
        .catch((err) => console.log(err));
    } else if (show === 1) {
      addNewRole({
        name,
        description,
      })
        .then((res) => {
          const _perms: RolePermission[] = [];
          rolePermissions.split(",").map((el: string) => {
            const _t = permissions.find((x) => x.name === el)?.id;
            if (_t) {
              const _obj: RolePermission = {
                roleId: res.data.data.id,
                permissionId: _t,
              };
              _perms.push(_obj);
            }
          });

          _perms.map((p) => grantPermission(p.roleId, p.permissionId));

          dispatch(addRole({ role: res.data.data }));

          clearFields();
        })
        .catch((err) => console.log(err));
    }
  };

  const clearFields = () => {
    setName("");
    setDescription("");
    setShow(0);
  };
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
                Add new role
              </div>
            </div>
          ) : (
            <div className="font-bold text-dark-green text-2xl">
              Update role
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
            {show === 1 && (
              <div className="mt-4">
                <label className="mt-30">Permissions</label>
                <Input
                  type="text"
                  name="rolePermissions"
                  required
                  value={rolePermissions}
                  placeholder="Comma separated"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setRolePermissions(e.target.value)
                  }
                />
              </div>
            )}

            <Button type="submit" onClick={handleSubmit}>
              Save
            </Button>
          </form>
        </div>
      ) : (
        <div className="mt-10">
          <div className="font-bold text-dark-green text-xl">Roles</div>
          <div className="mb-14 mt-3 flex justify-between items-center">
            <div className="flex items-center">
              <div className="font-medium text-sm">Roles</div>
              <div className="bg-green-800 rounded-full px-2 py-0.5 text-white text-xs ml-5">
                {roles.length}
              </div>
            </div>
            <div className="flex w-3/12">
              <div className="relative w-2/3 flex items-center space-x-4">
                <input
                  type="text"
                  className="pl-8 pr-4 py-2 rounded-lg border border-gray-300 w-full focus:outline-none text-xs"
                  placeholder="Search roles"
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
              New Role
            </div>
          </div>
          {loading ? (
            <Skeleton count={5} />
          ) : (
            <Table
              columns={columns}
              data={roles}
              rowsPerPage={9}
              type="roles"
              handleAction={handleAction}
            />
          )}
        </div>
      )}
    </div>
  );
}
