const PersistedProducts = (product) => {
  return (
    <div className="bg-white overflow-hidden shadow-md hover:shadow-xl cursor-pointer transition rounded-lg ">
      <div className="px-4 py-5 sm:p-6">
      <img className="rounded-md  w-full object-contain" src={product.imageURL}/>
        <h3 className="text-lg font-medium mb-2">{product.product_name}</h3>
        <div className="text-gray-500">${product.originalPrice*product.quantity}</div>
        <div>Quantity: {product.quantity}</div>
      </div>
    </div>
  );
};

export default PersistedProducts;
