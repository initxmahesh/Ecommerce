import { Outlet } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import Navbar from "../components/Navbar.jsx";

function MainLayout() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default MainLayout;
