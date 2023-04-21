import { useSelector } from "react-redux"
import { RootState } from "../store"

export default function Navbar() {
    const count= useSelector((state: RootState) => state.counter.count)
  return (
    <div className="py-4 px-20 bg-green-600 text-white flex justify-end text-lg">Count: {count}</div>
  )
}
