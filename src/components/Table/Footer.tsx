/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";

const TableFooter = ({ range, setPage, page, slice }: any) => {
  useEffect(() => {
    if (slice && slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [slice, page, setPage]);
  return (
    <div className="bg-slate-50 py-3 w-full font-medium text-left text-gray-300 flex items-center justify-center text-xs border-t-0 border border-b-slate-200 ">
      {range &&
        range.map((el: number, index: number) => (
          <button
            key={index}
            className={`rounded cursor-pointer mx-1.5 ${
              page === el ? "text-slate-600" : "text-slate-300"
            }`}
            onClick={() => setPage(el)}
          >
            {el}
          </button>
        ))}
    </div>
  );
};

export default TableFooter;
