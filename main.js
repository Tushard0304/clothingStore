let shop = document.getElementById("shop")

let shopItemData = [{
    id:"item1",
    name:"Casual Shirt",
    price: 45,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta.",
    img:"./images/img-1.jpg"
},
{
    id:"item2",
    name:"Office Shirt",
    price: 100,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta.",
    img:"./images/img-2.jpg"
},
{
    id:"item3",
    name:"T-Shirt",
    price: 35,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta.",
    img:"./images/img-3.jpg"
},
{
    id:"item4",
    name:"Mens Suit",
    price: 500,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta.",
    img:"./images/img-4.jpg"
}]

let basket = []

let generateshop =()=> {
    return (shop.innerHTML = shopItemData
        .map((x)=>{
            let { id, name, price, description, img } = x;
        return  `
        <div id=product-id-${id} class="image-item">
            <img  src=${img} alt="Image 1">
                <div class="cloth-information">
                    <h3>${name}</h3>
                    <p>${description}</p>
                        <div class="more-information">
                            <h2>$ ${price}</h2>
                            <div class="button">
                                 <i onclick="decrementHandler(${id})" class="ri-arrow-down-circle-fill"></i>
                                <div id=${id} class="quantity">0</div>
                                <i onclick="incrementHandler(${id})" class="ri-arrow-up-circle-fill"></i>
                            </div>
                        </div>
                </div>
        </div>
        `
    }).join(""))
}
generateshop();

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
    localStorage.setItem("data" , basket)
    update(selectedItem.id);
}
let decrementHandler =(id)=>{
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id)
    if(search.item === 0) return;
    else{
        search.item -= 1;
    }
    // console.log(basket)
    update(selectedItem.id);
}
let update =(id)=>{
    let search = basket.find((x) => x.id === id)
    // if(search == selectedItem.id)
//    console.log(search.item)
   document.getElementById(id).innerHTML = search.item
   calculation();
}


let calculation =()=>{
    let cartIcon = document.getElementById("cartAmount")
    cartIcon.innerHTML = basket.map((x)=> x.item).reduce((x,y)=> x + y , 0)
   
}