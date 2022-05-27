import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { userContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import './Shipment.css'


const Shipment = () => {
  const [logInUser, setLogInUser] = useContext(userContext)

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = (data) => {
      const savedCart = getDatabaseCart();
      const orderDetails = {...logInUser, products: savedCart, shipment: data, ordeTime: new Date()}

      fetch('https://boiling-headland-63747.herokuapp.com/addOrder', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(orderDetails)
      })
      .then(res => res.json())
      .then(data => {
         if(data){
           processOrder()
           alert('your order placed successfully')
         }
      })
    }
   
  //=========================
  return (
    <form className="form-style" onSubmit={handleSubmit(onSubmit)}>
      <input name="name" defaultValue={logInUser?.name} {...register("name", { required: true })} placeholder="Your Name"/>
      {errors.name && <span className='error'>Name is required</span>}

      <input name="email" defaultValue={logInUser?.email} {...register("email", { required: true })} placeholder="Your Email"/>
      {errors.email && <span className='error'>email is required</span>}

      <input name="address" {...register("address", { required: true })} placeholder="Your Address"/>
      {errors.address && <span className='error'>address is required</span>}

      <input name="phone" {...register("phone", { required: true })} placeholder="Your Phone Number"/>
      {errors.phone && <span className='error'>Name is required</span>}

      <input type="submit"/>
    </form>
    )
};

export default Shipment;