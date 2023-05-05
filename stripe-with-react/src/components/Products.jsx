import { useEffect, useState } from "react";
import Product from "./Product";
import axios from "axios";
import PersistedProducts from "./PersistedProducts";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState(
    () => JSON.parse(localStorage.getItem("products")) || []
  );



  const getProducts = async () => {
    const { data } = await axios.get("http://localhost:3001/products");
    setProducts(data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleSelect = (product) => {
    const newProducts = { ...product };
    delete newProducts.price;
    const storedProducts = JSON.parse(localStorage.getItem("products"));
    if (storedProducts) {
      const productIndex = storedProducts.findIndex(
        (storedProduct) => storedProduct.id === newProducts.id
      );
      if (productIndex === -1) {
        localStorage.setItem(
          "products",
          JSON.stringify([...storedProducts, newProducts])
        );
        setSelectedProducts([...storedProducts, newProducts]);
      } else {
        storedProducts[productIndex].quantity += 1;
        localStorage.setItem("products", JSON.stringify(storedProducts));
        setSelectedProducts(storedProducts);
      }
    } else {
      localStorage.setItem("products", JSON.stringify([newProducts]));
      setSelectedProducts([newProducts]);
    }
  };
  return (
    <div className="flex-grow min-h-screen">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products?.map((product) => (
            <Product
              key={product.id}
              onClick={() => handleSelect(product)}
              product={product}
            />
          ))}
        </div>
      </div>
      <div className="font-mono font-bold text-xl text-blue-500 text-center">
        Selected Products:
      </div>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {selectedProducts?.map((product) => (
            <PersistedProducts key={product.id} {...product} />
          ))}
        </div>
      </div>
      <div className="flex justify-center my-8">
        <button className="bg-blue-500 cursor-pointer hover:bg-blue-700 text-white disabled:bg-gray-500 disabled:cursor-not-allowed font-bold py-2 px-4 rounded md:py-3 md:px-6 md:text-lg" disabled={selectedProducts.length===0}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Products;
