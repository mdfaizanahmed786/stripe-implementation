const PersistedProducts = (product) => {
  return (
    <div className="bg-white overflow-hidden shadow-md hover:shadow-xl cursor-pointer transition rounded-lg ">
      <div className="px-4 py-5 sm:p-6">
        <div className="bg-blue-500 rounded-md h-24  w-full"></div>
        <h3 className="text-lg font-medium mb-2">{product.product_name}</h3>
        <div className="text-gray-500">${product.price}</div>
      </div>
    </div>
  );
};

export default PersistedProducts;
