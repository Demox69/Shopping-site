console.log('Loaded Item.js')
class Item {
	#img
	#name
	#price
	#tag
	#inCart
	static container = document.querySelector(".products")
	/**
	 * Creates an Item to be added to the UI
	 * @param {string} img the url of the image
	 * @param {string} name the name of the product
	 * @param {number} price the price of the product
	 * @param {string} tag the tag of the product
	 * @param {number} inCart the quantity of the product in the cart
	 */
	constructor(img, name, price, inCart) {
		this.#img = img
		this.#name = name
		this.#price = price
		this.#inCart = inCart
		console.log(img, name, price, inCart)
	}

	create() {
		const product = document.createElement('div')


		const img = document.createElement('img')
		const name = document.createElement('span')
		const price = document.createElement('span')
		const removeBtn = document.createElement('button')
		const form = document.createElement('form')
		const input = document.createElement('input')

		img.src = `images/${this.#img}.jpeg`
		input.placeholder = this.#inCart
		input.type = 'text'
		name.textContent = this.#name
		price.textContent = `$${this.#price}`

		form.appendChild(input)
		
		removeBtn.textContent = 'REMOVE'
		removeBtn.addEventListener('click', () => {
			// To remove the item from the container and localStorage
			let prod = JSON.parse(localStorage.getItem('productsInCart'))
			localStorage.setItem('cartQuantity', 0)
			localStorage.setItem('productsInCart', JSON.stringify(prod))
			const totalCost = localStorage.getItem('totalCost')
			console.log(totalCost)
			localStorage.setItem('totalCost', totalCost - this.#price)
			delete prod[this.#img]
			Item.container.removeChild(product)
		})
		
		this.#addClass(name, ['cart-item-name'])
		this.#addClass(price, ['cart-item-price'])
		this.#addClass(input, ['cart-item-quantity'])
		this.#addClass(removeBtn, ['remove-btn'])
		this.#addClass(product, ['product'])
		product.appendChild(img)
		product.appendChild(name)
		product.appendChild(price)
		product.appendChild(form)
		product.appendChild(removeBtn)
		
		Item.container.appendChild(product)
	}

	/**
	 * adds classes to an element
	 * @param {HTMLElement} el The element to add a class to
	 * @param {string[]} names The names of the classes
	 */
	#addClass(el, names) {
		names.forEach(name => {
			el.classList.add(name)
		})
	}
}

export {Item}