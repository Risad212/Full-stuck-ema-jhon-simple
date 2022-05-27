import React,{useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetails.css'
import Product from '../product/Product'

const ProductDetails = () => {
    const {productKey} = useParams()
    const [product, setProduct] = useState({})

     useEffect(() =>{
      fetch(`https://boiling-headland-63747.herokuapp.com/product/${productKey}`)
      .then(res => res.json())
      .then(data => setProduct(data))
     },[productKey])

    //--------------------
    return (
        <div>
          <h2>Your Product Details</h2>
          <Product showAddToCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDetails;