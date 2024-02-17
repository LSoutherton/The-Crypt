import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import { useState } from 'react';

export default function Header( {setFiltered, list} ) {

    return (
        <div className='header'>
            <div className='title-container'>
                <h2 className='title'>THE CRYPT</h2>
            </div>
            <div className="search-container">
            <input
                className='search-bar' 
                type='text' 
                placeholder='Search'
                >
            </input>
            </div>
            <div className='buttons-grid'>
                <div className='cart-button'>
                    <ShoppingCartIcon
                        fontSize='large'
                        className='cart-icon'
                    />
                    <p className='cart-text'>
                        CART
                    </p>
                </div>
                <div className='cart-button'>
                    <AccessTimeFilledIcon
                        fontSize='large'
                        className='cart-icon'
                    />
                    <p className='cart-text'>
                        ORDERS
                    </p>
                </div>
            </div>
        </div>
    )
}