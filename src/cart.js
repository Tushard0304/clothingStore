let label = document.getElementById("label");

let shoppingCart = document.getElementById("shopping-cart");



let basket = JSON.parse(localStorage.getItem("data")) || []

let calculation =()=>{
    let cartIcon = document.getElementById("cartAmount")
    cartIcon.innerHTML = basket.map((x)=> x.item).reduce((x,y)=> x + y , 0)
}

calculation(); 

let generateCardItems = () => {
    if(basket.length !== 0){  
        // here basket .length is checking whether there is any item or not 
        return shoppingCart.innerHTML = basket.map((x)=>{
           let {id , item} = x 
           let search = shopItemData.find((y)=>y.id === id) || []
           let {img,name,price} = search
        return `
    <div class="cart-item">
        <img width="100"  src=${img} alt="" />
        <div class="details">
            <div class="title-price-x">
                <h4 class="title-price">
                    <p>${name}</p>
                    <p class="cart-item-price">$ ${price}</p>
                </h4>
                <i onclick="removeItem(${id})" class="ri-close-line"></i>
            </div>

            <div class="buttons">
                <i onclick="decrementHandler(${id})" class="ri-arrow-down-circle-fill"></i>
                <div id=${id} class="quantity">${item}</div>
                <i onclick="incrementHandler(${id})" class="ri-arrow-up-circle-fill"></i>
            </div>

            <h3>$ ${item * search.price}</h3>
        </div>
    </div>
        `   
        })
        .join("")
    }
    else{
        shoppingCart.innerHTML = ``
        label.innerHTML = `
        <h2>Cart is Empty</h2>
        <a href="index.html">
            <button class="Homebutton">Back To Home</button>
        </a>
    `}

 }
generateCardItems();

let incrementHandler =(id)=>{
    let selectedItem = id;
    let search = basket.find((x)=> x.id === selectedItem.id)  // here this is searching the items in basket
    if(search === undefined){
         basket.push({
        id: selectedItem.id,
        item: 1,
    })}
    else{
        search.item += 1;
    }
   
    // console.log(basket)
    generateCardItems();
    update(selectedItem.id);
    localStorage.setItem("data" ,JSON.stringify(basket))
}
let decrementHandler =(id)=>{
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id)
    if(search === undefined) return
    else if(search.item === 0) return;
    else{
        search.item -= 1;
    }
    update(selectedItem.id);
    basket = basket.filter((x)=> x.item !== 0)
    generateCardItems();
    localStorage.setItem("data" ,JSON.stringify(basket))

}
let update =(id)=>{
    let search = basket.find((x) => x.id === id)
    // if(search == selectedItem.id)
//    console.log(search.item)
   document.getElementById(id).innerHTML = search.item
   calculation();
   totalAmount()
}

let removeItem =(id)=>{
    let selectedItem = id
    // console.log(selectedItem.id)
    basket = basket.filter((x)=>x.id !== selectedItem.id)
    generateCardItems();
    totalAmount()
    calculation();
    localStorage.setItem("data" ,JSON.stringify(basket))
}

let clearcart = ()=>{
    basket = []
    generateCardItems()
    calculation();
    localStorage.setItem("data" ,JSON.stringify(basket))
}

let totalAmount =()=>{
    if(basket.length){
        let amount = basket.map((x)=> {
            let {item,id} = x
           let search = shopItemData.find((y)=>y.id === id) || []
           return item * search.price
        }) 
        .reduce((x,y)=> x + y,0)
        label.innerHTML = `
        <h2>Total Bill : $ ${amount}</h2>
        <button class="checkout">Checkout</button>
        <button onclick="clearcart()" class="Remove-all">Remove All</button> 
        `
    }
    else return
}
totalAmount()