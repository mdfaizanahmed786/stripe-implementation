import { useState } from "react";
import Product from "./Product";


const Products = () => {
    const [products] = useState([
        { name: "Product 1", price: "$10.99" },
        { name: "Product 2", price: "$15.99" },
        { name: "Product 3", price: "$20.99" },
        { name: "Product 4", price: "$25.99" },
      ]);
  return (
    <div className="flex-grow min-h-screen">
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product, index) => (
          <Product key={index} {...product}/>
        ))}
      </div>
    </div>
  </div>
  )
}

export default Products