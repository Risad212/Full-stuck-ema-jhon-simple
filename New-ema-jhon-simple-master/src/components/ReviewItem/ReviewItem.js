import React from 'react';

const ReviewItem = (props) => {
    const {name,quantity, key,price} = props.product
    // style object for review item
    const reviewStyle = {
        borderBottom: '1px solid lightgray',
        marginBottom: '5px',
        paddingBottom: '5px',
    }
    return (
        <div className='review-item' style={reviewStyle}>
          <h3 className='product-name'>{name}</h3>
          <h4>Quantity:{quantity}</h4>
          <p>Price:<small>${price}</small></p>
          <br />
          <button className='main-button' onClick={() => props.removeProduct(key)}>remove</button>
        </div>
    );
};

export default ReviewItem;