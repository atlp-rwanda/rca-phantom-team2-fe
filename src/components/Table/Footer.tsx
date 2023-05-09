/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import chevron from "../../assets/Icons/chevron-right.svg";

const TableFooter = ({ range, setPage, page, slice }: any) => {
  useEffect(() => {
    if (slice && slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [slice, page, setPage]);
  return (
    <div className="py-3 w-full font-medium text-left text-gray-300 flex items-center justify-end text-xs mt-3">
      <button className="mr-2">
        <img src={chevron} />
      </button>
      {range &&
        range.map((el: number, index: number) => (
          <button
            key={index}
            className={`rounded cursor-pointer px-2.5 py-1 mx-1 ${
              page === el
                ? "text-white bg-green-800"
                : "text-gray-500 bg-gray-200"
            }`}
            onClick={() => setPage(el)}
          >
            {el}
          </button>
        ))}
      <button className="rotate-180 ml-2">
        <img src={chevron} />
      </button>
    </div>
  );
};

export default TableFooter;
