const calcuateTotal = (products) => {
  console.log(products);

  let sum = products.reduce(
    (prev, currentValue) =>
      prev + (currentValue.originalPrice / 100) * currentValue.quantity,
    0
  );

  return sum;
};
export default calcuateTotal;
