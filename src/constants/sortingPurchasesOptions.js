export const sortingPurchasesOptions = {
  asc_price: { text: 'Ascending price', sortingFunction: (a, b) => a.price - b.price },
  desc_price: { text: 'Descending price', sortingFunction: (a, b) => b.price - a.price },
  asc_time: { text: 'Ascending time', sortingFunction: (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime() },
  desc_time: { text: 'Descending time', sortingFunction: (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime() },
};