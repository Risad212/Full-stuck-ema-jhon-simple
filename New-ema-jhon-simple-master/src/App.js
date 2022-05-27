import { createContext, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Inventory from './components/Inventory/Inventory';
import Login from './components/Login/Login';
import NotFound from './components/NoMatch/NotFound';
import PrivetRoute from './components/PrivetRoute/PrivetRoute';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Review from './components/review/Review';
import Shipment from './components/shipment/Shipment';
import Shop from './components/Shop/Shop';


export const userContext = createContext()

function App() {
  const [logInUser, setLogInUser] = useState()
  return (
     <userContext.Provider value={[logInUser, setLogInUser]}>
     <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path='/' element={<Shop />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/review' element={<Review />} />
          <Route path='/login' element={<Login />} />
          <Route path='/inventory' element={<PrivetRoute><Inventory /></PrivetRoute>} />
          <Route path='/product/:productKey' element={<ProductDetails />} />
          <Route path='/shipment' element={<PrivetRoute><Shipment /></PrivetRoute>} />
          <Route path='*' element={<NotFound />} />
        </Routes>
     </BrowserRouter>
     </userContext.Provider>
  );
}

export default App;

