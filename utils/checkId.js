function checkId(bodyItem, data) {
  const isIdAvailable = data.find((item) => item.id === bodyItem.id);

  if (isIdAvailable)
    return true

  return false
}

module.exports = checkId;
