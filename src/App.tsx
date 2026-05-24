import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import Product from "./pages/product";
import AdminDashboard from "./pages/AdminDashboard";
import Mission from "./pages/mission";
import Policy from "./pages/policy";
import Careers from "./pages/careers";
import Contact from "./pages/contact";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductDetail from "./pages/product.$id";


function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <main style={{ flex: "1 0 auto" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;