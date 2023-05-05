import { useEffect, useState } from "react";
import Product from "./Product";
import axios from "axios";
import PersistedProducts from "./PersistedProducts";
import { useCallback } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const [selectedProducts, setSelectedProducts] = useState(
    () => JSON.parse(localStorage.getItem("products")) || []
  );

  const getProducts = async () => {
    const { data } = await axios.get("http://localhost:3001/products");
    setProducts(data);
  };

  const handleCheckout = async () => {
    const response = await fetch("http://localhost:3001/api/checkout_session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: selectedProducts,
        email: user?.email,
        customerId: user?.stripeId,
      }),
    });
    const session = await response.json();
    if (session) {
      localStorage.removeItem("products");
    }
    window.location.href = session.url;
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleSelect = (product) => {
    const newProducts = { ...product };
    delete newProducts.originalPrice;
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

  const addItem = useCallback((id) => {
    let products = JSON.parse(localStorage.getItem("products"));
    if (!products) return;
    const findProduct = products.findIndex((product) => product.id === id);
    products[findProduct].quantity += 1;
    localStorage.setItem("products", JSON.stringify(products));

    setSelectedProducts(products);
  }, []);

  const removeItem = useCallback((id) => {
    let products = JSON.parse(localStorage.getItem("products"));
    if (!products) return;
    const findProduct = products.findIndex((product) => product.id === id);
    

    if (products[findProduct].quantity <=1) {
      let filteredProducts = products.filter((product) => product.id !== id);
      localStorage.setItem("products", JSON.stringify(filteredProducts));
      setSelectedProducts(filteredProducts);
    }
    else{
      products[findProduct].quantity -= 1;
      localStorage.setItem("products", JSON.stringify(products));
  
      setSelectedProducts(products);

    }
  }, []);

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
            <PersistedProducts
              key={product.id}
              product={product}
              addItem={addItem}
              removeItem={removeItem}
            />
          ))}
        </div>
      </div>
      <div className="flex gap-3 justify-center my-8">
        <button
          className="bg-blue-500 cursor-pointer hover:bg-blue-700 text-white disabled:bg-gray-500 disabled:cursor-not-allowed font-bold py-2 px-4 rounded md:py-3 md:px-6 md:text-lg"
          disabled={selectedProducts.length === 0}
          onClick={handleCheckout}
        >
          Checkout
        </button>

        <button
          className="bg-red-500 cursor-pointer hover:bg-red-700 text-white disabled:bg-gray-500 disabled:cursor-not-allowed font-bold py-2 px-4 rounded md:py-3 md:px-6 md:text-lg"
          disabled={selectedProducts.length === 0}
          onClick={() => {
            localStorage.removeItem("products");
            setSelectedProducts([]);
          }}
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default Products;
