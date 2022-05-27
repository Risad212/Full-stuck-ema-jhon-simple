import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../cart/Cart';
import Product from '../product/Product';
import './Shop.css'


const Shop = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])

    useEffect(() => {
      fetch('https://boiling-headland-63747.herokuapp.com/products')
      .then(res => res.json())
      .then(data => setProducts(data))
    },[])

  //----------------------------

    useEffect(() =>{
      const savedCart = getDatabaseCart()
      const productKey = Object.keys(savedCart)
      fetch('https://boiling-headland-63747.herokuapp.com/productsByKeys',{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(productKey)
    })
    .then(res => res.json())
    .then(data => setCart(data))
    },[])


    
    /*
     handle product button
     --------------------
    */
    const handleAddProduct = (product) =>{
        const tobeAddedKey = product.key
        const sameProduct = cart.find(pd => pd.key === tobeAddedKey)
        let count = 1
        let newCart;
        if(sameProduct){
          count = sameProduct.quantity + 1;
          sameProduct.quantity = count
          const others = cart.filter(pd => pd.key !== tobeAddedKey)
          newCart = [...others, sameProduct]
        }
        else{
          product.quantity = 1
          newCart = [...cart, product]
        }
        setCart(newCart)
        addToDatabaseCart(product.key, count)
    }

    return (
        <div className='twin-container'>
          <div className="product-container">
            <ul>
               {
                  products.map((pd) => 
                  <Product
                  key={pd.key}
                  showAddToCart={true}
                  product={pd}
                  handleaddproduct={handleAddProduct}
                  ></Product>)
               }
            </ul>
          </div>
          <div className="cart-container">
             <Cart cart={cart}>
               <Link to={'/review'}>
                 <button className='main-button'>Review Order</button>
              </Link>
             </Cart>
          </div>
        </div>
    );
};

export default Shop;