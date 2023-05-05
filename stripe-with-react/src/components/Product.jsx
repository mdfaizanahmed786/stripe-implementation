/* eslint-disable react/prop-types */


const Product = (props) => {
  return (
    <div
   
      className="bg-white overflow-hidden shadow-md hover:shadow-xl cursor-pointer transition rounded-lg p-5"
    >
      <div className="px-4 py-5 sm:p-6">
        <img className="rounded-md  w-full object-contain shadow-md" src={props.product.imageURL}/>
        <h3 className="text-lg font-medium my-4">{props.product.name}</h3>
        <div className="text-gray-500">${props.product.originalPrice/100}</div>
      </div>

      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded md:py-3 md:px-6 shadow-md hover:shadow-lg"   onClick={props.onClick}>
          Add to cart
          </button>
    </div>
  );
};

export default Product;
