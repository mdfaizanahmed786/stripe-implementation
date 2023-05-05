/* eslint-disable react/prop-types */
const PersistedProducts = ({product, addItem, removeItem}) => {
  return (
    <div className="bg-white overflow-hidden space-y-5 shadow-md hover:shadow-xl cursor-pointer transition rounded-lg ">
      <div className="px-4 py-5 sm:p-6">
        <img
          className="rounded-md  w-full object-contain"
          src={product.imageURL}
        />
        <h3 className="text-lg font-medium mb-2">{product.product_name}</h3>

        <div className="my-5">
          <span className="font-bold">Quantity: </span>
          {product.quantity}
        </div>
        <div className="flex items-center gap-5">
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded md:py-3 md:px-6" onClick={()=>addItem(product.id)}>
            +
          </button>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded md:py-3 md:px-6" onClick={()=>removeItem(product.id)}>

            -
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersistedProducts;
