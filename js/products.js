document.addEventListener('DOMContentLoaded', () => {

    loadproducts();
    getdates();
    // Load products.
    function loadproducts() {
        url = 'https://xfyws8r1e6.execute-api.us-east-1.amazonaws.com/prod/listItems'
        var products = []
        const request = new XMLHttpRequest();
        request.open('GET', url);
        request.onload = () => {
            var data1 = JSON.parse(request.responseText);
            var data2 = JSON.stringify(eval("(" + data1["items"] + ")"));
            const data = JSON.parse(data2);
            for (i = 0; i < 10; i++) {
                product_result = data[i]
                
                if (product_result["numInStock"] > 0) {
                  num = product_result["numInStock"];
                } else {
                  num = null;
                }
               
                productjson = {
                    "name": product_result["itemName"],
                    "longname": product_result["itemLongName"],
                    "price": product_result["price"],
                    "image": "images/"+product_result["GoodId"]+".png",
                    "id": product_result["GoodId"],
                    "inventory": num
                }
                InsertProducts(productjson)
            }
        };
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

    function getTimeRemaining(endtime) {
        const total = Date.parse(endtime) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
        const days = Math.floor(total / (1000 * 60 * 60 * 24));
        
        return {
          total,
          days,
          hours,
          minutes,
          seconds
        };
      }
      
    function initializeClock(id, endtime) {
        const clock = document.getElementById(id);
        const daysSpan = clock.querySelector('.days');
        const hoursSpan = clock.querySelector('.hours');
        const minutesSpan = clock.querySelector('.minutes');
        const secondsSpan = clock.querySelector('.seconds');
      
        function updateClock() {
          const t = getTimeRemaining(endtime);
      
          daysSpan.innerHTML = t.days;
          hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
          minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
          secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
      
          if (t.total <= 0) {
            clearInterval(timeinterval);
          }
        }
      
        updateClock();
        const timeinterval = setInterval(updateClock, 1000);
      }
      

      function getdates() {
        url = 'https://xfyws8r1e6.execute-api.us-east-1.amazonaws.com/prod/getstarttime'
        var times
        const request = new XMLHttpRequest();
        request.open('GET', url);
        request.onload = () => {
            const data = JSON.parse(request.responseText);
            times = {
              "start": data["startTime"],
              "end": data["endTime"]
            };
            initializeClock('clockdiv', times.end);
        };
        request.send();
    };

})
