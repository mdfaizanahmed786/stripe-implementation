/* eslint-disable react/prop-types */


const Product = (props) => {
  return (
    <div
     onClick={props.onClick}
      className="bg-white overflow-hidden shadow-md hover:shadow-xl cursor-pointer transition rounded-lg "
    >
      <div className="px-4 py-5 sm:p-6">
        <img className="rounded-md  w-full object-contain" src={props.product.imageURL}/>
        <h3 className="text-lg font-medium mb-2">{props.product.name}</h3>
        <div className="text-gray-500">${props.product.originalPrice/100}</div>
      </div>
    </div>
  );
};

export default Product;
