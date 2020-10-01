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
  var prodData = await API.graphql({ query: listProducts });
  const data = prodData["data"]["listProducts"]
  console.log(data)

  for (const product_result of data) {
  //   const contents = await fs.readFile(file, 'utf8');
  //   console.log(contents);
  // }
  // for (i = 0; i < data.length; i++) {
  //     product_result = data[i]
      var num, inventoryupdate
      if (product_result["QtyinStock"] > 0) {
        num = product_result["QtyinStock"];
        inventoryupdate = num + " items left!"
      } else {
        num = null;
        inventoryupdate = "Sold Out!"
      }
      console.log(product_result); 
    
      let title = product_result["Productname"]
      let description = product_result["Productname"]
      let price = product_result["Price"]
      let image = "images/"+product_result["productid"]+".png"
      let id = product_result["productid"]
      let inventory = num

      document.querySelector('#products').innerHTML += '<div class="col-md-3"><div class="single-product"><div class="product-img"><a href="product-details.html"><img class="default-img" src="'+image+'" alt="#"><img class="hover-img" src="'+image+'" alt="#"></a><div class="button-head"><div class="product-action-2"><a title="Add to cart" href="#">'+inventoryupdate+'</a></div></div></div><div class="product-content"><h4><a href="">'+title+'</a></h4><p><a href="">'+description+'</a></p><div class="product-price"><span>$'+price+'</span><br><br><a href="" class="buynt btn btn-outline-mybtn" data-id="{{ id }}" onclick="buythatproduct(this);">Buy Now</a></div></div></div></div>'
  }
  request.send();
}

// async function listProductsWithImages () {
//   const productData = await API.graphql({ query: listProducts });
//   const products = await Promise.all(productData.data.listProducts.items.map(async product => {
//     const image = await Storage.get(product.image)
//     product.s3Image = image
//     return product
//   }))
//   console.log('products: ', products)
// }


listAllProducts()
// loadproducts();

// Load products.
// function loadproducts() {
//     const data = xprods["data"]["listProducts"]
//     for (i = 0; i < data.length; i++) {
//         product_result = data[i]
        
//         if (product_result["QtyinStock"] > 0) {
//           num = product_result["QtyinStock"];
//         } else {
//           num = null;
//         }
      
//         productjson = {
//             "name": product_result["Productname"],
//             "longname": product_result["Productname"],
//             "price": product_result["Price"],
//             "image": "images/"+product_result["productid"]+".png",
//             "id": product_result["productid"],
//             "inventory": num
//         }
//         InsertProducts(productjson)
//     }
//     request.send();
// };

          
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
    document.querySelector('#QueryResult').innerHTML += product;
};


