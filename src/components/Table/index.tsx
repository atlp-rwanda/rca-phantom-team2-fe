import { useState } from "react";
import useTable from "../../hooks/useTable";
import TableFooter from "./Footer";
import edit from "../../assets/Icons/edit.svg";
import delete_i from "../../assets/Icons/delete.svg";
import { Bus } from "../Dashboard/Buses";

const Table = ({ columns, data, rowsPerPage, handleAction }: any) => {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);

  return (
    <>
      <table className="border-collapse rounded-xl w-full overflow-x-scroll border border-slate-200">
        <thead className="bg-transparent border">
          <tr className="text-gray-400 text-sm font-semibold text-left">
            {columns &&
              columns.map((r: any, index: number) => (
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
              <tr className="cursor-auto even:bg-slate-50 text-sm" key={index}>
                {Object.values(el)
                  .slice(1, Object.values(el).length)
                  .map((_value: any, i: number) => {
                    return (
                      <td className="p-3" key={`${el.id}+${i}`}>
                        {_value}
                      </td>
                    );
                  })}
                <td className="p-3 flex items-center space-x-4">
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
