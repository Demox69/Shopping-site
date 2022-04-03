import { Item } from './components/Item.js'

const carts = document.querySelectorAll('.add-to-cart')
const products = [
    {
        name: 'Nike Dunks',
        tag: 'nike-dunks',
        price: 140,
        inCart: 0
    },
    {
        name: 'Adidas Foam Rnnr',
        tag: 'adidas-foam-rnner',
        price: 135,
        inCart: 0
    },
    {
        name: 'New Balance 550',
        tag: 'newblance-550s',
        price: 145,
        inCart: 0
    }

]

/**
 * @typedef Product
 * @property {string} name
 * @property {string} tag
 * @property {number} price
 * @property {number} inCart
 */

carts.forEach((el, i) => {
    el.addEventListener('click', () => {
        cartQuantity(products[i])
        totalCost(products[i])
    })
})


/**
 * Removes an item from the local storage
 * @param {Product} products The products
 * @todo Remove product from localStorage
 */
function removeItems(products) {
    const removeCartItem = document.querySelector('remove-btn')

    for (let i = 0; i < products.length; i++) {
        let btnClicked = removeCartItem([i])
        btnClicked.addEventListener('click', event => {
            const cartItems = JSON.parse(localStorage.get('productsInCart'))

            Object.values(cartItems).map(item => {
                item.inCart = 0;
                cartItems.splice(i, 1)
                localStorage.setItem('productsInCart', JSON.stringify(cartItems))

            })

        })
    }
}


function onLoadCartNumber() {
    let quantity = localStorage.getItem('cartQuantity')

    if (quantity) {
        document.querySelector('.cart span').textContent = quantity
    }
}

/**
 * Updates the quantity of the product in the cart
 * @param {Product} product The product to be added to the cart
 */
function cartQuantity(product) {
    let quantity = localStorage.getItem('cartQuantity')
    quantity = parseInt(quantity)
    if (quantity) {
        localStorage.setItem('cartQuantity', quantity + 1)
        document.querySelector('.cart span').textContent = quantity + 1
    }
    else {
        localStorage.setItem('cartQuantity', 1)
        document.querySelector('.cart span').textContent = 1
    }
    setItems(product)

}


/**
 * Adds a product to the localStorage
 * @param {Product} product the product to be added to the cart
 */
function setItems(product) {
    let cartItems = JSON.parse(localStorage.getItem('productsInCart'))
    // cartItems = JSON.parse(cartItems) // NEED TO CONVERT CUZ LOCAL STORAGE IS IN JSON  
    if (cartItems) {
        console.log(cartItems)
        if (cartItems[product.tag] === undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    }
    else {
        product.inCart = 1
        cartItems = {
            [product.tag]: product
        }
    }
    localStorage.setItem('productsInCart', JSON.stringify(cartItems))
}

/**
 * 
 * @param {Product} product 
 */
function totalCost(product) {
    let cartCost = localStorage.getItem('totalCost');

    if (cartCost != null) {
        cartCost = parseInt(cartCost)
        localStorage.setItem('totalCost', cartCost + product.price)
    }
    else {
        localStorage.setItem('totalCost', product.price)
    }

}
/**
 * checks if something changed
 * @param {Event} event 
 */
function quantityChanged(event) {
    let input = event.target
    if (isNaN(input.value) || input.value < 1) {
        input.value = 1;
    }
}

function updateCartTotal() {

}

function displayCart() {
    let cartItems = localStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems) // NEED TO CONVERT CUZ LOCAL STORAGE IS IN JSON 
    let productContainer = document.querySelector('.products')
    let totalCost = localStorage.getItem('totalCost')
    let totalCostContainer = document.querySelector('.cart-all-item-total')
    let purchaseContainer = document.querySelector('.purchase-container')
    if (cartItems && productContainer) {
        // productContainer.innerHTML = ''
        Object.values(cartItems).map(item => {
            console.log('Item', item)
            const Product = new Item(item.tag, item.name, item.price, item.inCart)
            Product.create()
        })

        totalCostContainer.innerHTML += `<span><b>Total: $${totalCost}</b></span>`
        purchaseContainer.innerHTML += `
        <div class='purchase-title'>
            <button calss ='purchase-btn'>PURCHASE</button>
        </div>
        `
    }


}

function sayClicked() {
    console.log('mouse pressed')
}
displayCart()
onLoadCartNumber()
