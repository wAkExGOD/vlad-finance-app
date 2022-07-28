export const generateCategories = (purchases = []) => {
  const result = {};

  for (let { category, price } of purchases) {
    result[category] = (result[category] ? result[category] : 0) + parseFloat(price);
  }

  return result;
}