import React from 'react'
import CartItem from './CartItem'
import '../styles/OrdersPage.css'

const Order = ( {list, total, date} ) => {

    const orderSummary = list.map((item) => {
        return (
            <CartItem
                name={item.name}
                image={item.image}
                quantity={item.quantity}
                price={item.price}
                order='Bought at'
            />
        )
    })
    
  return (
    <div className='order-page-summary'>
        <div className='order-info'>
            Order Placed: <span className='order-info-variable'>{date}</span>
            <div className='order-total'>
                Order Total: <span className='order-info-variable'>${((Math.round(total * 100) / 100)).toLocaleString()}</span>
            </div>
        </div>
        {orderSummary}
    </div>
  )
}

export default Order