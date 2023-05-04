import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Products from "../components/Products";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <Products />
      <Footer />
    </div>
  );
};

export default Home;
