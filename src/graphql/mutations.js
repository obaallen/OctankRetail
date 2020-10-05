/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createProduct = /* GraphQL */ `
  mutation CreateProduct($Price: Int!, $Productname: String!) {
    createProduct(Price: $Price, Productname: $Productname) {
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
export const addtocart = /* GraphQL */ `
  mutation Addtocart(
    $productid: String!
    $QtyRequested: Int!
    $Fulfilled: Boolean!
  ) {
    addtocart(
      productid: $productid
      QtyRequested: $QtyRequested
      Fulfilled: $Fulfilled
    ) {
      productid
      QtyRequested
      Fulfilled
    }
  }
`;
export const createOrder = /* GraphQL */ `
  mutation CreateOrder($userId: String!, $order: OrderInput!) {
    createOrder(userId: $userId, order: $order) {
      success
      message
      errors
      order {
        orderId
        userId
        createdDate
        modifiedDate
        status
        total
      }
    }
  }
`;
