const carts = document.querySelectorAll('.add-to-cart')
const products = [
    {
        name: 'Nike Dunks',
        tag: "nike-dunks",
        price: 140,
        inCart:0
    },
    {
        name: 'Adidas Foam Rnnr',
        tag: "adidas-foam-rnner",
        price: 135,
        inCart:0
    },
    {
        name: 'New Balance 550',
        tag: "newblance-550s", 
        price: 145,
        inCart: 0
    }

]

for(let i = 0; i < carts.length; i++){
    carts[i].addEventListener('click', ()=> {
        cartQuantity(products[i])
        totalCost(products[i])
        
        
    })
}

function removeItems(products){
   var removeCartItem = document.getElementsByClassName("remove-btn")
   

   for(let i = 0; i < products.length; i++){
       let btnClicked = removeCartItem([i])
       btnClicked.addEventListener("click", function(event){
        let cartItems = JSON.parse(localStorage.get("productsInCart"))

        Object.values(cartItems).map(item => {
            item.inCart = 0;
            cartItems.splice(i,1)
            localStorage.setItem("productsInCart", JSON.stringify(cartItems))

        })

       })
   }
}


function onLoadCartNumber(){
    let quantity = localStorage.getItem("cartQuantity")

    if(quantity){
        document.querySelector(".cart span").textContent = quantity
    }
}
function cartQuantity(product){
    let quantity = localStorage.getItem('cartQuantity')
    quantity = parseInt(quantity)
    if(quantity){
        localStorage.setItem('cartQuantity',quantity+1)
        document.querySelector('.cart span').textContent = quantity+1
    }
    else{
        localStorage.setItem('cartQuantity',1)
        document.querySelector('.cart span').textContent = 1
    }
    setItems(product)

}
function setItems(product){
    let cartItems = localStorage.getItem("productsInCart")
    cartItems = JSON.parse(cartItems) // NEED TO CONVERT CUZ LOCAL STORAGE IS IN JSON  
    if(cartItems!=null){
        if( cartItems[product.tag] == undefined){
            cartItems = {
                ...cartItems,
                [product.tag]:product
            }
        }
        cartItems[product.tag].inCart+=1;
    } else{
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
    }
    }
    localStorage.setItem("productsInCart", JSON.stringify (cartItems))
}
function totalCost(product){
    //console.log("The product price is", product.price);
    
    let cartCost = localStorage.getItem("totalCost");
   
    if(cartCost != null){
       cartCost = parseInt(cartCost)
       localStorage.setItem("totalCost", cartCost+product.price)
    }
    else{
        localStorage.setItem("totalCost", product.price)
    }
    
}

function quantityChanged(event){
    let input = event.target
    if(isNaN(input.value) || input.value < 1){
        input.value = 1;
    }
}

function updateCartTotal(){
    
}

function displayCart(){
    let cartItems = localStorage.getItem("productsInCart")
    cartItems = JSON.parse(cartItems) // NEED TO CONVERT CUZ LOCAL STORAGE IS IN JSON 
    let productContainer = document.querySelector(".products")
    let totalCost = localStorage.getItem("totalCost")
    let totalCostContainer = document.querySelector(".cart-all-item-total")
    let purchaseContainer = document.querySelector(".purchase-container")
    if(cartItems && productContainer ){
        productContainer.innerHTML = ""
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
           
            <div class="product">
            
                <img src="./images/${item.tag}.jpeg">
                <span class = "cart-item-name">${item.name}</span>
                <span class="cart-item-price">$${item.price}</span>
                <form>
                    <input type = "text" class = "cart-item-quantity" placeholder = ${item.inCart}>
                </form>
                <span><button class = "remove-btn">REMOVE</button></span> 
            </div> 
            `
        })
        totalCostContainer.innerHTML+= `<span><b>Total: $${totalCost}</b></span>`
        purchaseContainer.innerHTML+=`
        <div class="purchase-title">
            <button calss ="purchase-btn">PURCHASE</button>
        </div>
        `
    }
   
    
}
function btnClicked(){
    let btn = document.querySelector("remove-btn");
    btn.addEventListener("click", sayClicked());
        
    
    
}

function sayClicked(){
    console.log("mouse pressed")
}
displayCart()
onLoadCartNumber()
btnClicked()


