/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createProduct = /* GraphQL */ `
  mutation CreateProduct($Price: Int!, $Productname: String!) {
    createProduct(Price: $Price, Productname: $Productname) {
      productid
      Price
      Productname
      QtyinStock
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
