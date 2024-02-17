import React, {useState, useEffect} from "react"

export default function CryptoSheet(props) {

    const [display, setDisplay] = useState(false)

    function expand() {
        setDisplay((prevDisplay) => !prevDisplay)
    }

    const buyButton = (name, image, numPrice, price) => {
        props.buy({
            name,
            image,
            price,
            numPrice
        })
    }

    return (
        <div className={display ? 'currency-slab-show' : 'currency-slab'}>
            <div className="currency-title">
                {props.name.charAt(0).toUpperCase() + props.name.slice(1)}
            </div>
            <img
                className='image'
                src={props.image}>
            </img>
            <div>
                <button id={props.name} className="buy-button" onClick={() => buyButton(props.name, props.image, props.numPrice, props.price)}>
                    BUY
                </button>
                <button onClick={expand} className="more-button">
                    {display ? 'LESS' : 'MORE'}
                </button>
            </div>
            <div className='stats-text-container'>
                <p className='stats-text'>
                    Current Price:
                </p>
                <p className='stats-number'>
                    ${props.price}
                </p>
            </div>
            <div className={display ? 'stats-text-container' : 'hide'}>
                <p className='stats-text'>
                    All Time High:
                </p>
                <p className='stats-number'>
                    ${props.ath}
                </p>
            </div>
            <div className={display ? 'stats-text-container' : 'hide'}>
                <p className='stats-text'>
                    % of ATH:
                </p>
                <p className='stats-number'>
                    {props.athChange}
                </p>
            </div>
            <div className={display ? 'stats-text-container' : 'hide'}>
                <p className='stats-text'>
                    MKT Cap:
                </p>
                <p className='stats-number'>
                    ${props.cap}
                </p>
            </div>
        </div>
    )
}