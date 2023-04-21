import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { decrement, increment } from "@/store/reducers/counter";
import Navbar from "./Navbar";

export default function Counter(){
    const count = useSelector((state: RootState) => state.counter.count)
    const dispatch = useDispatch()

    return (
        <div className="h-screen flex flex-col">
            <Navbar />
            <div className="w-full h-full flex flex-col justify-center items-center rounded border p-4">
                <h1 className="font-bold text-3xl mb-4">{count}</h1>
                <div className="flex flex-row justify-center space-x-4 items-center mt-4">
                    <button className="p-4 bg-red-500 text-white rounded" onClick={()=> dispatch(decrement())}>DECREASE</button>
                    <button className="p-4 bg-blue-500 text-white rounded" onClick={()=> dispatch(increment())}>INCREASE</button>
                </div>
            </div>
        </div>
    );
}
