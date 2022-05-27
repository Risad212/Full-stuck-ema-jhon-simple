import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './Product.css'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Product = (props) => {
    const {name, img,seller,price,stock,key} = props.product
    return (
        <div className='product'>
           <div>
              <img src={img} alt="" />
           </div>
           <div>
               <h3 className='product-name'><Link to={'/product/'+key}>{name}</Link></h3>
               <br />
               <p><small>by: {seller}</small></p>
               <p>${price}</p>
               <p><small>Left in stock - order soon {stock}</small></p>
               {
                props.showAddToCart && <button 
                   className='main-button' onClick={() => props.handleaddproduct(props.product)}>
                   <FontAwesomeIcon icon={faCartShopping} style={{marginRight: '5px'}}/>
                   add to cart
                </button>
              }
           </div>
        </div>
    );
};

export default Product;