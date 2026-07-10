import { BrowserRouter, Route, Routes } from "react-router-dom";
import GuestRoute from "./components/auth/GuestRoute.jsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";
import SuperAdminRoute from "./components/auth/SuperAdminRoute.jsx";
import AuthLayout from "./layouts/AuthLayout.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import SuperAdminLayout from "./layouts/SuperAdminLayout.jsx";
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
import DashboardHome from "./pages/superadmin/DashboardHome.jsx";
import VendorsPage from "./pages/superadmin/VendorsPage.jsx";
import OrdersPage from "./pages/superadmin/OrdersPage.jsx";
import ProductsPage from "./pages/superadmin/ProductsPage.jsx";
import CustomersPage from "./pages/superadmin/CustomersPage.jsx";
import AnalyticsPage from "./pages/superadmin/AnalyticsPage.jsx";
import SupportPage from "./pages/superadmin/SupportPage.jsx";
import ModerationPage from "./pages/superadmin/ModerationPage.jsx";
import RevenuePage from "./pages/superadmin/RevenuePage.jsx";
import UsersPage from "./pages/superadmin/UsersPage.jsx";
import GenericSectionPage from "./pages/superadmin/GenericSectionPage.jsx";

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

        <Route element={<SuperAdminRoute />}>
          <Route path="/superadmin" element={<SuperAdminLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="vendors" element={<VendorsPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="customers" element={<CustomersPage />} />
            <Route path="support" element={<SupportPage />} />
            <Route path="moderation" element={<ModerationPage />} />
            <Route path="revenue" element={<RevenuePage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path=":section" element={<GenericSectionPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
