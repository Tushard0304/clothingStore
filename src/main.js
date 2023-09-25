let shop = document.getElementById("shop")



let basket = JSON.parse(localStorage.getItem("data")) || []

let generateshop =()=> {
    return (shop.innerHTML = shopItemData
        .map((x)=>{
            let { id, name, price, description, img } = x;
            let search = basket.find((x)=> x.id === id)  || []
        return  `
        <div id=product-id-${id} class="image-item">
            <img  src=${img} alt="Image 1">
                <div class="cloth-information">
                    <h3>${name}</h3>
                    <p>${description}</p>
                        <div class="more-information">
                            <h2>$ ${price}</h2>
                            <div class="buttons">
                                 <i onclick="decrementHandler(${id})" class="ri-arrow-down-circle-fill"></i>
                                <div id=${id} class="quantity">
                                ${search.item === undefined ? 0 : search.item}
                                </div>
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
    localStorage.setItem("data" ,JSON.stringify(basket))
    update(selectedItem.id);
}
let decrementHandler =(id)=>{
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id)
    if(search === undefined) return
    else if(search.item === 0) return;
    else{
        search.item -= 1;
    }
    // console.log(basket)
    update(selectedItem.id);
    basket = basket.filter((x)=> x.item !== 0)
    localStorage.setItem("data" ,JSON.stringify(basket))

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

calculation(); // invoking the calculation so that every time i refresh the site it quickly calculates and give the value as it is