import { sortingPurchasesOptions as options } from '../constants/';

export const sortPurchases = (purchases, sortBy) => (
  options[sortBy] ? [...purchases].sort(options[sortBy].sortingFunction) : purchases
);