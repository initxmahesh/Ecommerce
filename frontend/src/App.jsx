import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Products from "./components/Products.jsx";
import BestSelling from "./components/BestSelling.jsx";
import Events from "./components/Events.jsx";
import FAQs from "./components/FAQs.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/best-selling" element={<BestSelling />} />
          <Route path="/products" element={<Products />} />
          <Route path="/events" element={<Events />} />
          <Route path="/faq" element={<FAQs />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
