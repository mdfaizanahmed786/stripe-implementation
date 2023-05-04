import { useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/register");
    }
  }, []);
  return (
    <div className="min-h-screen">
      <Navbar />

      <Products />
      <Footer />
    </div>
  );
};

export default Home;
