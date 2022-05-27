import React, { useContext } from 'react';
import { Link} from 'react-router-dom';
import { userContext } from '../../App';
import Logo from '../../images/logo.png'
import './Header.css'

const Header = () => {
    const [logInUser, setLogInUser] = useContext(userContext)
    return ( 
        <div className='Header'>
           <img src={Logo} alt="" />
            <h2>Email: {logInUser?.email}</h2>
             <nav>
                <Link to="/shop">Shop</Link>
                <Link to="/review">Review</Link>
                <Link to="/inventory">Manage Inventory</Link>
                <button onClick={() => setLogInUser({})}>sign out</button>
           </nav>
        </div>
    );
};

export default Header;