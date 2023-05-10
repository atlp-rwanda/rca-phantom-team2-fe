/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import useTable from "../../hooks/useTable";
import TableFooter from "./Footer";
import edit from "../../assets/Icons/edit.svg";
import delete_i from "../../assets/Icons/delete.svg";

const Table = ({ columns, data, rowsPerPage, type, handleAction }: any) => {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);

  return (
    <>
      <table className="border-collapse rounded-xl w-full overflow-x-scroll">
        <thead className="bg-transparent border-b">
          <tr className="text-gray-400 text-sm font-semibold text-left">
            <th className="p-3">
              <input
                type="checkbox"
                className="leading-normal w-4 h-4 accent-green-800"
              />
            </th>
            {columns &&
              columns.map((r: string, index: number) => (
                <th className="p-3" key={index}>
                  {r}
                </th>
              ))}
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gunmetal font-regular">
          {slice &&
            slice.map((el: any, index: number) => (
              <tr className="cursor-auto even:bg-gray-50 text-sm" key={index}>
                <td className="px-3 py-4">
                  <input
                    type="checkbox"
                    className="leading-normal w-4 h-4 accent-green-800"
                  />
                </td>
                {/* Add type here, ex: buses, roles, routes, locations.. */}
                {type === "buses" ? (
                  <>
                    <td className="px-3 py-4">{el.type}</td>
                    <td className="px-3 py-4">{el.plateNumber}</td>
                    <td className="px-3 py-4">{el.regNumber}</td>
                    <td className="px-3 py-4">{el.model}</td>
                    <td className="px-3 py-4">{el.numOfSeats}</td>
                    <td className="px-3 py-4">{el.availbleSeats}</td>
                  </>
                ) : type === "roles" ? (
                  <>
                    <td className="px-3 py-4">{el.name}</td>
                    <td className="px-3 py-4">{el.description}</td>
                  </>
                ) : type === "permissions" ? (
                  <>
                    <td className="px-3 py-4">{el.name}</td>
                    <td className="px-3 py-4">{el.description}</td>
                    <td className="px-3 py-4">{el.modelName}</td>
                    <td className="px-3 py-4">{el.operations.join(", ")}</td>
                  </>
                ) : type === "users" ? (
                  <>
                    <td className="px-3 py-4">{el.firstName}</td>
                    <td className="px-3 py-4">{el.lastName}</td>
                    <td className="px-3 py-4">{el.email}</td>
                    <td className="px-3 py-4">{el.roleId}</td>
                  </>
                ) : type === "busesRoutes" ? (
                  <>
                    <td className="px-3 py-4">{el.name}</td>
                    <td className="px-3 py-4">{el.origin}</td>
                    <td className="px-3 py-4">{el.destination}</td>
                  </>
                ) : type === "locations" ? (
                  <>
                    <td className="px-3 py-4">{el.name}</td>
                    <td className="px-3 py-4">{el.latitude}</td>
                    <td className="px-3 py-4">{el.longitude}</td>
                  </>
                ) : (
                  <td>Nothin..</td>
                )}
                {type === "permissions" || type === "users" ? (
                  <td>
                    <div className="flex space-x-0.5 justify-center">
                      <div className="pt-0.5 pl-0.5 rounded border border-black"></div>
                      <div className="pt-0.5 pl-0.5 rounded border border-black"></div>
                      <div className="pt-0.5 pl-0.5 rounded border border-black"></div>
                    </div>
                  </td>
                ) : (
                  <td className="px-3 py-4 flex items-center space-x-4">
                    <img
                      src={edit}
                      alt="Edit"
                      className="cursor-pointer"
                      onClick={() => handleAction("edit", el)}
                    />
                    <img
                      src={delete_i}
                      alt="Delete"
                      className="cursor-pointer"
                      onClick={() => handleAction("delete", el)}
                    />
                  </td>
                )}
              </tr>
            ))}
        </tbody>
      </table>
      <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
    </>
  );
};

export default Table;
