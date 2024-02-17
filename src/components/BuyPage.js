import React, { useState } from 'react'

const BuyPage = ( {name, image, price, close, numPrice, cart, changeCart} ) => {

  const [amount, setAmount] = useState('');

  const addToCart = (name, image, numPrice, price, amount) => {

    let matching = 0;

    cart.forEach((item) => {
        if(name === item.name) {
            matching = item;
        }
    })

    if (matching) {
        matching.quantity += parseFloat(amount, 10);
    } else {
        changeCart([
            ...cart,
            {
                name: name,
                quantity: parseFloat(amount, 10),
                image: image,
                numPrice: numPrice,
                price: price
            }
        ])
    }
    close([]);
    alert(`Added ${amount} ${name.charAt(0).toUpperCase() + name.slice(1)} to cart!`)
  }

  return (
    <div className='buy-page-container'>
        <h2 className='buy-page-title'>Please enter the amount of {name.charAt(0).toUpperCase() + name.slice(1)} that you would like to purchase:</h2>
        <div className='buy-page-input-grid'>
            <img className='buy-page-image' src={image}></img>
            <div className='user-input-container'>
                <input className='buy-page-input' type='text' onChange={(q) => {
                    setAmount(q.target.value)
                }
                }></input>
                <p className='input-text'>{name.charAt(0).toUpperCase() + name.slice(1)} at ${price} each.</p>
            </div>
        </div>
        <div className='buy-page-buttons-grid'>
            <button className='buy-page-close-button' onClick={() => close([])}>
                CLOSE
            </button>
            <button className='buy-page-cart-button' onClick={() => addToCart(name, image, numPrice, price, amount)}>
                ADD TO CART
            </button>
        </div>
    </div>
  )
}

export default BuyPage