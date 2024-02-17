import React from 'react'
import '../styles/CartPage.css'
import CartItem from './CartItem.js'

const CartPage = ( {cart, changeCart} ) => {

  const cartList = cart.map((item) => {
    return (
        <CartItem
            name={item.name}
            image={item.image}
            quantity={item.quantity}
            price={item.price}
        />
    )
  })

  const priceSummary = cart.map((coin) => {
    return (
        <div className='summary-grid'>
            <h4 className='summary-item'>{coin.name.charAt(0).toUpperCase() + coin.name.slice(1)} x {coin.quantity}</h4>
            <h4 className='sub-total'>${(Math.round(coin.numPrice * coin.quantity * 100) / 100).toFixed(2)}</h4>
        </div>
    )
  })

  let total = 0

  const calc = cart.forEach((coin) => {
    total += coin.numPrice * coin.quantity
  })

  const showDate = new Date();
  const dateString = showDate.toDateString();

  const createOrder = () => {
    if (!cart.length) {
        alert('The cart is empty, couldnt process order.')
    } else {
        var testingList = [];
        testingList = JSON.parse(localStorage.getItem('ordersList')) || [];
        testingList.unshift({
            cart,
            total,
            dateString
        })
        alert('Your order has been created!')
        localStorage.setItem('ordersList', JSON.stringify(testingList))
        changeCart([])
    }
  }

  return (
    <div className='cart-page-container'>
        <div className='order-summary'>
            {cartList.length ? cartList : <h1 className='empty-cart'>Your Cart is Empty</h1>}
        </div>
        <div className='right-side-cart'>
            <div className='payment-details'>
                <h1 className='order-summary-title'>Order Summary</h1>
                {priceSummary}
                <div className='total-grid'>
                    <h2>Total:</h2>
                    <h2 className='total-text'>${((Math.round(total * 100) / 100)).toLocaleString()}</h2>
                </div>
            </div>
            <div className='buttons-grid'>
                <button className='clear-button' onClick={() => changeCart([])}>
                    CLEAR CART
                </button>
                <button className='payment-button' onClick={() => createOrder()}>
                    CREATE ORDER
                </button>
            </div>
        </div>
    </div>
  )
}

export default CartPage