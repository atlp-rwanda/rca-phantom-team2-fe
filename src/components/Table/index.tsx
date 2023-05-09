/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import useTable from "../../hooks/useTable";
import TableFooter from "./Footer";
import edit from "../../assets/Icons/edit.svg";
import delete_i from "../../assets/Icons/delete.svg";
import { Bus } from "../Dashboard/Buses";

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
        <tbody className="text-gunmetal font-medium">
          {slice &&
            slice.map((el: Bus, index: number) => (
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
                ) : (
                  <td>Nothin..</td>
                )}
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
              </tr>
            ))}
        </tbody>
      </table>
      <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
    </>
  );
};

export default Table;
