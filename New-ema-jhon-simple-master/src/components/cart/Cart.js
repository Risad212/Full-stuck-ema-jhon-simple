import React from 'react';
import './Cart.css'

const Cart = (props) => {
    const cart = props.cart
    // reduce function
    // let total = cart.reduce((total, prd) => total + prd.price, 0 )
    /*
       for loop
       ------------
    */
       let total = 0;
       for(let i = 0; i< cart.length; i++){
           const product = cart[i];
           total = total + product.price * product.quantity || 1;
      }
    /*
      shipping cost
       ------------
    */
    let shipping = 0

    if(total > 35){
        shipping = 0
    }
    else if(total > 15){
        shipping = 4.99
    }
    else if(total > 0){
        shipping = 12.99
    }

    /*
      taxt here
      ---------
    */
    const tax = Math.round(total / 10);
    // grand total
    const grandtotal = total + shipping + tax

    // number formeting in number
    const formetNumber = (num) =>{
      let presision = num.toFixed(2)
      return Number(presision)
    }


    return (
        <>
          <h3>Order summary</h3>
          <p>items order: {cart.length}</p>
          <p><small>shipping cost: {shipping}</small></p>
          <p>product price {formetNumber(total)}</p>
          <p><small>taxt + vat : {tax}</small></p>
          <p>total Price: {formetNumber(grandtotal)}</p>
          {props.children}
        </>
    );
};

export default Cart;