import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import Deals from "./pages/Deals.jsx";
import Home from "./pages/Home.jsx";
import Blogs from "./pages/Blogs.jsx";
import NewArrivalsPage from "./pages/NewArrivals.jsx";
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
          <Route path="/deal-and-offers" element={<Deals />} />
          <Route path="/new-arrivals" element={<NewArrivalsPage />} />
          <Route path="/blogs" element={<Blogs />} />
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
