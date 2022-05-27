import React, { useEffect, useState } from 'react';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import './Review.css'
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../cart/Cart'
import happyImage from '../../images/giphy.gif'
import { useNavigate } from 'react-router-dom';

const Review = () => {
 const [cart , setCart] = useState([])
 const [orderPlace, setOrderPlace] = useState(false)
 // use navigate hook
 const navigate = useNavigate()
 // handle remove product
 const RemoveProduct = (productKey) =>{
     const newCart = cart.filter(pd => pd.key !== productKey)
     setCart(newCart)
     // remove product from localStorge or database
     removeFromDatabaseCart(productKey)
 }
 useEffect(()=>{
    //cart
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    
    fetch('https://boiling-headland-63747.herokuapp.com/productsByKeys',{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(productKeys)
    })
    .then(res => res.json())
    .then(data => setCart(data))
}, []);


   // place order button handler
   const handleProcedCkeckout = () =>{
       navigate('/shipment')
   }

   // thanks image 
   let thankyou 
   if(orderPlace){
       thankyou = <img src={happyImage} alt="" />
   }
    return (
        <div className='twin-container'>
           <div className="product-container">
              {
               cart.map((pd) => <ReviewItem product={pd} key={pd.key} removeProduct={RemoveProduct}/>)
              }
              {thankyou}
           </div>
           <div className="cart-container">
             <Cart cart={cart}>
                <button className="main-button" onClick={handleProcedCkeckout}>Proced CheckOut</button>
             </Cart>
           </div>
        </div>
    );
};

export default Review;