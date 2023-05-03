import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Counter from "@/components/Counter";
import Home from "@/pages/Home";
import Updateprofile from "./pages/RegisterDriver";
import PageNotFound from "@/pages/PageNotFound";
import { store } from "@/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/counter" element={<Counter />} />
          <Route path="/updateprofile" element={<Updateprofile />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
