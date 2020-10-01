import Amplify, { API, graphqlOperation } from "@aws-amplify/api";

import awsconfig from "./aws-exports";
import { createOrder } from "./graphql/mutations";
import { listProducts } from "./graphql/queries";

Amplify.configure(awsconfig);
async function createNewOrder(prodt, qtyo) {
  const order = {
    userId: "value1", 
    order: {
      products: {
        productId: prodt, 
        quantity: qtyo
      }
    }
  };
  const ordercall = await API.graphql(graphqlOperation(createOrder, order));
  const ordermsg =  ordercall["data"]["createOrder"]["message"]
  const orderstatus = ordercall["data"]["createOrder"]["order"]["status"]
  const neworderid = ordercall["data"]["createOrder"]["order"]["orderId"]
  console.log(ordercall)
  alert(ordermsg+". Your order is "+orderstatus+". ID: "+neworderid)
  location.reload();
}

async function listAllProducts() {
  var prodData = await API.graphql({ query: listProducts });
  const data = prodData["data"]["listProducts"]

  for (const product_result of data) {
      var num, inventoryupdate
      if (product_result["QtyinStock"] > 0) {
        num = product_result["QtyinStock"];
        inventoryupdate = num + " items left!"
      } else {
        num = product_result["QtyinStock"];
        inventoryupdate = "Sold Out!"
      }
    
      let title = product_result["Productname"]
      let description = product_result["Productname"]
      let price = product_result["Price"]
      let image = "images/"+product_result["productid"]+".png"
      let id = product_result["productid"]

      document.querySelector('#products').innerHTML += '<div class="col-md-3"><div class="single-product"><div class="product-img"><a href="product-details.html"><img class="default-img" src="'+image+'" alt="#"><img class="hover-img" src="'+image+'" alt="#"></a><div class="button-head"><div class="product-action-2"><a title="Add to cart" href="#">'+inventoryupdate+'</a></div></div></div><div class="product-content"><h4><a href="">'+title+'</a></h4><p><a href="">'+description+'</a></p><div class="product-price"><span>$'+price+'</span><br><br><button class="buynt btn btn-outline-mybtn" data-id="'+id+'" data-num="'+num+'">Buy Now</button></div></div></div></div>'
  }
  checkbuttons()
}

listAllProducts()

// Set links up to save job for user.
//window.addEventListener('DOMContentLoaded', (event) => {
  //setTimeout(
function checkbuttons() {
  document.querySelectorAll('.buynt').forEach(link => {
    link.onclick = () => {
        const data_id = link.dataset.id;
        const data_num = link.dataset.num;

        if (data_num > 0){
          var qtu = prompt("Please enter the quantity you want to order for:", "10");
          if (qtu !== null || person !== ""){
            alert("You are ordering "+qtu+" items of "+data_id)
            createNewOrder(data_id, qtu)
          }
        } else {
          alert("Sorry, this item is soldout!")
        }
        
        // return false;
    };
  });//, 6000);
};