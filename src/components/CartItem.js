import React from 'react'

const CartItem = ( { name, image, quantity, price, order } ) => {

  return (
    <div className='cart-item-container'>
        <div>
            <h2>{name.toUpperCase()}</h2>
            <h4>Quantity: {quantity}</h4>
            <h4>{order ? order : 'Current Price'} : ${price}</h4>
        </div>
        <div>
            <img className='cart-image' src={image}></img>
        </div>
    </div>
  )
}

export default CartItem