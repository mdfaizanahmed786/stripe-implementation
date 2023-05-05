function checkId(bodyItem, data) {
  const isIdAvailable = data.find((item) => item.id ===bodyItem.id);

  if (isIdAvailable) return {
    success:true,
    
    price_data:{
    
      price: isIdAvailable.price,
      
    }
  

  }
  return {
    success:false,
  };
}

module.exports=checkId
