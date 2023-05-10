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
import { fetchRoles, fetchUsers, newUser } from "@/services/role";
import { addUser, setLoading, setUsers } from "@/store/reducers/usersSlice";
import SelectSearch, { SelectSearchOption } from "react-select-search";
import { Oval } from "react-loader-spinner";
import { setRoles } from "@/store/reducers/roles";
import { Role } from "./Roles";
import axios from "axios";

const columns = ["First Name", "Last Name", "email", "Role"];

export type User = {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  roleId: string;
  createdAt?: string;
  updatedAt?: string;
};

export default function Users() {
  const [show, setShow] = useState(0);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [roleId, setRoleId] = useState<string>("");
  const [displayRoles, setDisplayRoles] = useState<
    { name: string; value: string }[]
  >();

  const dispatch = useDispatch();
  const { users, loading } = useSelector((state: RootState) => state.user);
  const { roles } = useSelector((state: RootState) => state.role);

  const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    dispatch(setLoading({ loading: true }));
    axios
      .post(
        "https://rca-phantom-team2-bn.onrender.com/api/users/register",
        {
          firstName,
          lastName,
          email,
          roleId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        clearFields();
        getAllUsers();
      })
      .catch((err) => {
        console.log(err);
        clearFields();
        getAllUsers();
      });
  };

  const clearFields = () => {
    dispatch(setLoading({ loading: false }));
    setShow(0);
    setFirstName("");
    setLastName("");
    setEmail("");
    setRoleId("");
  };

  const getAllUsers = () => {
    fetchUsers()
      .then((res) => {
        const _users = res.data.data.data.map((u: User) => {
          return {
            ...u,
            roleId: roles.find((x: any) => x.id === u.roleId)?.name,
          };
        });

        dispatch(setUsers({ users: _users }));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchRoles()
      .then((res1) => {
        fetchUsers()
          .then((res) => {
            const _users = res.data.data.data.map((u: User) => {
              return {
                ...u,
                roleId: res1.data.data.data.find((x: any) => x.id === u.roleId)
                  ?.name,
              };
            });
            const _temp = res1.data.data.data.map((r: Role) => {
              return {
                value: r.id,
                name: r.name,
              };
            });
            setDisplayRoles(_temp);
            dispatch(setRoles({ roles: res1.data.data.data }));
            dispatch(setUsers({ users: _users }));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const _temp = roles.map((r: Role) => {
      return {
        value: r.id,
        name: r.name,
      };
    });
    setDisplayRoles(_temp);
  }, [roles]);

  return (
    <div>
      <img
        src={back}
        alt="Back"
        className={`cursor-pointer ${show === 0 ? "hidden" : "block"}`}
        onClick={clearFields}
      />
      {show === 1 || show === 2 ? (
        <div className="md:ml-10 my-10">
          <div className="font-bold text-dark-green text-2xl">Add new user</div>

          <form className="text-sm">
            <div className="mt-8">
              <label>First Name</label>
              <Input
                type="text"
                name="type"
                required
                value={firstName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFirstName(e.target.value)
                }
              />
            </div>
            <div className="mt-4">
              <label className="mt-30">Last Name</label>
              <Input
                type="text"
                name="lastName"
                required
                value={lastName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setLastName(e.target.value)
                }
              />
            </div>
            <div className="mt-4">
              <label className="mt-30">Email</label>
              <Input
                type="email"
                name="email"
                required
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
              />
            </div>
            <div className="mt-4 text-xs">
              <label className="mt-30 mb-10 text-base">Role</label>
              <SelectSearch
                options={displayRoles as SelectSearchOption[]}
                value={roleId}
                onChange={(_val) => setRoleId(_val as string)}
                placeholder="Select Role"
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
          <div className="font-bold text-dark-green text-xl">Users</div>
          <div className="mb-14 mt-3 flex justify-between items-center">
            <div className="flex items-center">
              <div className="font-medium text-sm">Users</div>
              <div className="bg-green-800 rounded-full px-2 py-0.5 text-white text-xs ml-5">
                {users.length}
              </div>
            </div>
            <div className="flex w-3/12">
              <div className="relative w-2/3 flex items-center space-x-4">
                <input
                  type="text"
                  className="pl-8 pr-4 py-2 rounded-lg border border-gray-300 w-full focus:outline-none text-xs"
                  placeholder="Search users"
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
              New User
            </div>
          </div>
          {loading ? (
            <Skeleton count={5} />
          ) : (
            <Table
              columns={columns}
              data={users}
              rowsPerPage={9}
              type="users"
              handleAction={() => null}
            />
          )}
        </div>
      )}
    </div>
  );
}
