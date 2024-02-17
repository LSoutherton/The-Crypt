import './styles/App.css';
import './styles/crypto.css'
import React, {useState, useEffect} from "react"
import { Route, Routes } from 'react-router-dom';
import CartPage from './components/CartPage';
import CryptoSheet from './components/cryptoSheet';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import { Link } from 'react-router-dom';
import BuyPage from './components/BuyPage';
import './styles/BuyPage.css'
import OrdersPage from './components/OrdersPage';
import HomeIcon from '@mui/icons-material/Home';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

function App() {

  let url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';
  
  const [coinData, setCoinData] = useState([]);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => setCoinData(data))
  }, [])

  const cryptoList = coinData.map((coin) => {
    return (
      <CryptoSheet 
        name={coin.id}
        ath={coin.ath.toLocaleString()}
        price={coin.current_price.toLocaleString()}
        athChange={coin.ath_change_percentage.toLocaleString()}
        image={coin.image}
        cap={coin.market_cap.toLocaleString()}
        symbol={coin.symbol}
      />
    )
  })

  const [filtered, setFiltered] = useState([]);

  const [input, setInput] = useState('');

  const getFilteredItems = (input, coinData) => {
    if (!input) {
      return coinData
    }
    return coinData.filter(coin => coin.id.includes(input))
  }

  const filteredItems = getFilteredItems(input, coinData);

  const [cartItems, setCartItems] = useState([]);

  const [buyPage, setBuyPage] = useState([]);

  const filteredList = filteredItems.map((coin) => {

    let smallPrice = false;

    if (coin.current_price < 1 ) {
      smallPrice = true;
    }

    return (
      <CryptoSheet 
        name={coin.id}
        ath={smallPrice ? coin.ath : coin.ath.toLocaleString()}
        price={smallPrice ? coin.current_price : coin.current_price.toLocaleString()}
        athChange={coin.ath_change_percentage.toLocaleString()}
        image={coin.image}
        cap={coin.market_cap.toLocaleString()}
        symbol={coin.symbol}
        numPrice={coin.current_price}
        buy={setBuyPage}
      />
    )
  })

  const [showFilters, setShowFilters] = useState(false)

  const displayFilters = () => {
    setShowFilters(previousShowFilters => !previousShowFilters)
  }

  const priceHighToLow = () => {
    const newArray = [].concat(coinData)
      .sort((a,b) => b.current_price - a.current_price);
    setCoinData(newArray)
  }

  const priceLowToHigh = () => {
    const newArray = [].concat(coinData)
      .sort((a,b) => a.current_price - b.current_price);
    setCoinData(newArray)
  }

  const ATHHighToLow = () => {
    const newArray = [].concat(coinData)
      .sort((a,b) => b.ath - a.ath);
    setCoinData(newArray)
  }

  const ATHLowToHigh = () => {
    const newArray = [].concat(coinData)
      .sort((a,b) => a.ath - b.ath);
    setCoinData(newArray)
  }

  const percentageHighToLow = () => {
    const newArray = [].concat(coinData)
      .sort((a,b) => b.ath_change_percentage - a.ath_change_percentage);
    setCoinData(newArray)
  }

  const percentageLowToHigh = () => {
    const newArray = [].concat(coinData)
      .sort((a,b) => a.ath_change_percentage - b.ath_change_percentage);
    setCoinData(newArray)
  }

  const marketCapHighToLow = () => {
    const newArray = [].concat(coinData)
      .sort((a,b) => b.market_cap - a.market_cap);
    setCoinData(newArray)
  }

  const marketCapLowToHigh = () => {
    const newArray = [].concat(coinData)
      .sort((a,b) => a.market_cap - b.market_cap);
    setCoinData(newArray)
  }
  
  return (
    <>
      <div className='header'>
        <Link to='/' className='title-container'>
          <HomeIcon
            fontSize='large'
            className='cart-icon'
          />
            <p className='title'>THE CRYPT</p>
        </Link>
        <div className="search-container">
        <input
          className='search-bar' 
          type='text' 
          placeholder='Search'
          onChange={(e) => {
          setInput(e.target.value)
          }}>
        </input>
        </div>
        <div className='buttons-grid'>
          <Link to='/cart' className='cart-button'>
            <ShoppingCartIcon
              fontSize='large'
              className='cart-icon'
            />
            <p className='cart-text'>
              CART
            </p>
          </Link>
          <Link to='/orders' className='cart-button'>
            <AccessTimeFilledIcon
              fontSize='large'
              className='cart-icon'
            />
            <p className='cart-text'>
              ORDERS
            </p>
          </Link>
        </div>
      </div>
      <Routes>
        <Route path='/cart' element={<CartPage cart={cartItems} changeCart={setCartItems} />} />
        <Route 
          path='/'
          element={
            <>
              <button onClick={displayFilters} className='filters'>
                <FilterAltIcon
                  fontSize='large'
                />
                SORT
              </button>
              <div className={`filters-page-show ${showFilters ? '' : 'filters-hidden'}`}>
                <button onClick={priceHighToLow} className='filter-buttons'>
                  PRICE HIGH TO LOW
                </button>
                <button onClick={priceLowToHigh} className='filter-buttons filter-buttons-alternate'>
                  PRICE LOW TO HIGH
                </button>
                <button onClick={ATHHighToLow} className='filter-buttons'>
                  ATH HIGH TO LOW
                </button>
                <button onClick={ATHLowToHigh} className='filter-buttons filter-buttons-alternate'>
                  ATH LOW TO HIGH
                </button>
                <button onClick={percentageHighToLow} className='filter-buttons'>
                  % OF ATH HIGH TO LOW
                </button>
                <button onClick={percentageLowToHigh} className='filter-buttons filter-buttons-alternate'>
                  % OF ATH LOW TO HIGH
                </button>
                <button onClick={marketCapHighToLow} className='filter-buttons'>
                  MKT CAP HIGH TO LOW
                </button>
                <button onClick={marketCapLowToHigh} className='filter-buttons filter-buttons-alternate'>
                  MKT CAP LOW TO HIGH
                </button>
              </div>
              <div className='crypto-grid'>
                {filteredList}
                {buyPage.length != 0 ? 
                  <BuyPage 
                    name={buyPage.name}
                    image={buyPage.image}
                    price={buyPage.price}
                    close={setBuyPage}
                    numPrice={buyPage.numPrice}
                    cart={cartItems} 
                    changeCart={setCartItems}
                  /> : ''}
              </div>
            </>}
        />
        <Route path='/orders' element={<OrdersPage />} />
      </Routes>
    </>
  );
}

export default App;
