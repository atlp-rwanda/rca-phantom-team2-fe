import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Counter from "@/components/Counter";
import Home from "@/pages/Home";
import SignIn from "@/pages/SignIn";
import PageNotFound from "@/pages/PageNotFound";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import RegisterDriver from "./pages/RegisterDriver";
import { Toaster } from "react-hot-toast";
import { store } from "@/store";
import Sidebar from "./layouts/sidebar";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/counter" element={<Counter />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/drivers/new" element={<RegisterDriver />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/dashboard" element={<Sidebar />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </Provider>
  );
}

export default App;
