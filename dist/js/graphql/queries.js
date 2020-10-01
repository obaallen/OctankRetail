/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const listProducts = /* GraphQL */ `
  query ListProducts {
    listProducts {
      productid
      Price
      Productname
      QtyinStock
    }
  }
`;
export const getProduct = /* GraphQL */ `
  query GetProduct($productid: String!) {
    getProduct(productid: $productid) {
      productid
      Price
      Productname
      QtyinStock
    }
  }
`;
