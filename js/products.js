import Amplify, { API, graphqlOperation } from "@aws-amplify/api";

import awsconfig from "./aws-exports";
import { createOrder } from "./graphql/mutations";
import { listProducts } from "./graphql/queries";

Amplify.configure(awsconfig);
async function createNewOrder() {
  const order = {
    userId: "value1", 
    order: {
      products: {
        productId: "df123", 
        quantity: 30
      }
    }
  };

  return await API.graphql(graphqlOperation(createOrder, { input: order }));
}

async function listAllProducts() {
  return await API.graphql(graphqlOperation(listProducts));
}

// const MutationButton = document.getElementById("MutationEventButton");
// const MutationResult = document.getElementById("MutationResult");

// MutationButton.addEventListener("click", (evt) => {
//   createNewOrder().then((evt) => {
//     MutationResult.innerHTML += `<p>${evt.data.createTodo.name} - ${evt.data.createTodo.description}</p>`;
//   });
// });
const xprods = listAllProducts()
loadproducts();

// Load products.
function loadproducts() {
    const response = JSON.parse(xprods);
    const data = response["data"][""]
    for (i = 0; i < data.length; i++) {
        product_result = data[i]
        
        if (product_result["QtyinStock"] > 0) {
          num = product_result["QtyinStock"];
        } else {
          num = null;
        }
      
        productjson = {
            "name": product_result["Productname"],
            "longname": product_result["Productname"],
            "price": product_result["Price"],
            "image": "images/"+product_result["productid"]+".png",
            "id": product_result["productid"],
            "inventory": num
        }
        InsertProducts(productjson)
    }
    request.send();
};

          
function InsertProducts(postdata) {
    // Template for products
    const template = Handlebars.compile(document.querySelector('#load_products').innerHTML);
    title = postdata["name"];
    description = postdata["longname"];
    price = postdata["price"];
    id = postdata["id"];
    image = postdata["image"];
    inventory = postdata["inventory"];
    // Insert products
    // Add post result to DOM.

    const product = template({'title': title, "description": description, 'price': price, 'id': id, 'image': image, 'inventory': inventory});
    document.querySelector('#products').innerHTML += product;
};


