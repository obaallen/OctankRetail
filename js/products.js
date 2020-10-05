import Amplify, { API, graphqlOperation } from "@aws-amplify/api";

import awsconfig from "./aws-exports";
import { createOrder } from "./graphql/mutations";
import { addtocart } from "./graphql/mutations";
import { listProducts } from "./graphql/queries";
import { listcart } from "./graphql/queries";
import { getProduct } from "./graphql/queries";

Amplify.configure(awsconfig);
async function additemstocart(prodc, qtyr) {
  const cart = {
    productid: prodc, 
    QtyRequested: qtyr, 
    Fulfilled: 'false'
  };
  const cartitem = await API.graphql(graphqlOperation(addtocart, cart));
  const prodincart =  cartitem["data"]["addtocart"]["productid"]
  alert(prodincart+" has been added to your cart")
}

async function createNewOrder(prodt) {

  const order = {
    userId: "value2", 
    order: {
      products: prodt
    }
  };
  const ordercall = await API.graphql(graphqlOperation(createOrder, order));
  const ordermsg =  ordercall["data"]["createOrder"]["message"]
  const orderstatus = ordercall["data"]["createOrder"]["order"]["status"]
  const neworderid = ordercall["data"]["createOrder"]["order"]["orderId"]
  alert(ordermsg+". Your order is "+orderstatus+". ID: "+neworderid)
  location.reload();
}

async function listcartitems() {
  var prodData = await API.graphql({ query: listcart });
  const data = prodData["data"]["listcart"]
  var prodtin = [], n = 0

  for (const cart_result of data) {
      var num, inventoryupdate, reg1, reg2, item, itemdata, pritem
      if (cart_result["Fulfilled"] == false) {
        n += 1;
        item = await API.graphql({ query: getProduct, variables: { productid: cart_result["productid"] }});
        itemdata = item["data"]["getProduct"]
        num = cart_result["QtyRequested"];
        inventoryupdate = itemdata["QtyinStock"] + " items left!"
        reg1 = itemdata["QtyinRegion"]["us_east_2"];
        reg2 = itemdata["QtyinRegion"]["us_west_2"];
       
        let title = itemdata["Productname"]
        let price = itemdata["Price"]
        let image = "images/"+itemdata["productid"]+".png"
        let id = itemdata["productid"]

        pritem = {
          productId: id, 
          quantity: num
        }
        prodtin.push(pritem);

        document.querySelector('#cart').innerHTML += '<div class="row"><div class="col-md-3"><a href="product-details.html"><img class="default-img" src="'+image+'" alt="#"></a></div><div class="col-md-3"><div class="product-content"><h4><a href="">'+title+'</a></h4><div class="product-price"><span>$'+price+'</span><br><br><b>'+num+'</b> items requested</div></div><br></div><div class="col-md-6"><div class="button-head"><div class="product-action-2"><h6>'+inventoryupdate+'</h6><br>'+reg1+' items in us-east-2 region<br>'+reg2+' items in us-west-2 region</div></div></div></div><hr>'
      }
  }
  checkbuybutton(prodtin)
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

      document.querySelector('#products').innerHTML += '<div class="col-md-3"><div class="single-product"><div class="product-img"><a href="product-details.html"><img class="default-img" src="'+image+'" alt="#"><img class="hover-img" src="'+image+'" alt="#"></a><div class="button-head"><div class="product-action-2"><a title="Add to cart" href="#">'+inventoryupdate+'</a></div></div></div><div class="product-content"><h4><a href="">'+title+'</a></h4><p><a href="">'+description+'</a></p><div class="product-price"><span>$'+price+'</span><br><br><button class="buynt btn btn-outline-mybtn" data-id="'+id+'" data-num="'+num+'">Add to cart</button></div></div></div></div>'
  }
  checkbuttons()
}

listAllProducts()
listcartitems()

// Set links up to save job for user.
function checkbuttons() {
  document.querySelectorAll('.buynt').forEach(link => {
    link.onclick = () => {
        const data_id = link.dataset.id;
        const data_num = link.dataset.num;

        if (data_num > 0){
          var qtu = prompt("Please enter the quantity you want to order for:", "10");
          if (qtu !== null || person !== ""){
            alert("You are adding "+qtu+" items of "+data_id+" to your cart.")
            additemstocart(data_id, qtu)
          }
        } else {
          alert("Sorry, this item is soldout!")
        }
    };
  });
};

function checkbuybutton(prodti) {
  document.querySelector('.buyct').onclick = () => {
    if (prodti == null){
      alert("No items in your cart");
    }
    createNewOrder(prodti)
  };
}