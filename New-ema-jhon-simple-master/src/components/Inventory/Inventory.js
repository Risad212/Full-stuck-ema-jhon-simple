import React from 'react';
import './Inventory.css'



const Inventory = () => {
    const product = {}
    const handleAddProduct = () =>{
       fetch('https://boiling-headland-63747.herokuapp.com/addProduct', {
           method: 'POST',
           headers: {'Content-Type': 'application/json'},
           body: JSON.stringify(product)
       })
   }

    
    return (
        <div>
           <h3>THis is Manage Inventory</h3>
            <p><span>Name</span><input type="text" /></p>
            <p><span>Price</span><input type="text" /></p>
            <p><span>Quantity:</span><input type="text" /></p>
            <p><span>uploadImage</span><input type="file" /></p>
           <button onClick={handleAddProduct}>add Products</button>
        </div>
    );
};

export default Inventory;