import React from 'react'
import Order from './Order'

const OrdersPage = () => {

  const storageList = JSON.parse(localStorage.getItem('ordersList')) || [];

  const renderedOrdersList = storageList.map((order) => {
    return (
        <Order
            list={order.cart}
            total={order.total}
            date={order.dateString}
        />
    )
  })

  return (
    <div>
        <h1 className='orders-title'>PREVIOUS ORDERS</h1>
        {renderedOrdersList.length ? renderedOrdersList : <h1 className='no-orders'>There are no Previous Orders to Display</h1>}
    </div>
  )
}

export default OrdersPage