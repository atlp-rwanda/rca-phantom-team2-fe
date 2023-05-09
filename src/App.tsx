import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Counter from "@/components/Counter";
import Home from "@/pages/Home";
import PageNotFound from "@/pages/PageNotFound";
import { store } from "@/store";
import BusMotion from "./pages/BusMotion";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bus-motion" element={<BusMotion />} />
          <Route path="/counter" element={<Counter />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
