import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import "./index.css";

const Placeholder = ({ title }) => (
  <main className="mx-auto max-w-6xl px-4 py-12 md:px-8">
    <h1 className="font-Poppins text-3xl font-semibold text-neutral-900">{title}</h1>
  </main>
);

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/best-selling" element={<Placeholder title="Best Selling" />} />
          <Route path="/products" element={<Placeholder title="Products" />} />
          <Route path="/events" element={<Placeholder title="Events" />} />
          <Route path="/faq" element={<Placeholder title="FAQ" />} />
          <Route path="/login" element={<Placeholder title="Login" />} />
          <Route path="/register" element={<Placeholder title="Get Started" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
