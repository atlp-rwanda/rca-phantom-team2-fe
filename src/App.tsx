import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import RegisterDriver from "./pages/RegisterDriver";
import PageNotFound from "@/pages/PageNotFound";
import { store } from "@/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registerDriver" element={<RegisterDriver />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
