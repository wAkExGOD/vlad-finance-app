// const testArr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];

export const getElementsByPagination = (elements, elemsPerPage, pageNumber) => {
  const start = elemsPerPage * (pageNumber - 1);
  const end = elemsPerPage * pageNumber;

  return elements.slice(start, end);
}

// console.log(getElementsByPagination( testArr, 5, 4 ));