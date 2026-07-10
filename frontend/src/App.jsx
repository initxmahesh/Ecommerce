import { BrowserRouter, Route, Routes } from "react-router-dom";
import GuestRoute from "./components/auth/GuestRoute.jsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";
import AuthLayout from "./layouts/AuthLayout.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import Deals from "./pages/Deals.jsx";
import Home from "./pages/Home.jsx";
import BlogDetail from "./pages/BlogDetail.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Blogs from "./pages/Blogs.jsx";
import NewArrivalsPage from "./pages/NewArrivals.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import VerifyEmail from "./pages/VerifyEmail.jsx";
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
          <Route path="/blogs/:slug" element={<BlogDetail />} />
          <Route path="/best-selling" element={<BestSelling />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/events" element={<Events />} />
          <Route path="/faq" element={<FAQs />} />
        </Route>

        <Route path="/verify-email" element={<VerifyEmail />} />

        <Route element={<GuestRoute />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/account" element={<Home />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
