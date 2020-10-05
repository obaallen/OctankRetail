/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const listProducts = /* GraphQL */ `
  query ListProducts {
    listProducts {
      productid
      Price
      Productname
      QtyinStock
      QtyinRegion {
        us_east_2
        us_west_2
      }
    }
  }
`;
export const listcart = /* GraphQL */ `
  query Listcart {
    listcart {
      productid
      QtyRequested
      Fulfilled
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
      QtyinRegion {
        us_east_2
        us_west_2
      }
    }
  }
`;
