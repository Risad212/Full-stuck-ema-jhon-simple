import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { userContext } from '../../App';

const PrivetRoute = ({children}) => {
    const [logInUser, setLogInUser] = useContext(userContext)
    // Navigate to login if user not validate
    return logInUser ? children : <Navigate to="/login"/>
};

export default PrivetRoute;