import { useContext, useState } from 'react';
import { userContext } from '../../App';
import {useLocation, useNavigate } from 'react-router-dom';
import { createUserEmailPassword, handlefbSignIn, handleGoogleSignin, handleSignOut, initializeLoginFramework, resetPassword, signInEmailandpassword } from "../Login/loginManager";


function Login() {
  const [newUser, setNewUser] = useState(false)
  const [user, setUser] = useState({
    isLogIn: true,
    name: '',
    email: '',
    password: '',
    photo: '',
    error: '',
    sucess: false,
  })

   // initialize login
   initializeLoginFramework()


  // handle google sign in
  const GoogleSignin = () =>{
    handleGoogleSignin()
    .then(res => {
      handleResponse(res, true)
    })
  }

  
   // handle Facebook sign in
   const facebookSignin = () =>{
    handlefbSignIn()
    .then(res => {
      handleResponse(res, true)
    })
  }

  // handle sign out 
   const SignOut = () =>{
     handleSignOut()
     .then(res => {
      handleResponse(res, false)
     })
   }

//[===============================]

  // Redirect hooks
  const [logInUser, setLogInUser] = useContext(userContext)
  const location = useLocation()
  const navigate = useNavigate()
  let from = location.state?.from?.pathname || "/shipment";


  
  //[===============================]
   // handle Blur
   const handleBlur = (e) =>{
     let isFormValid
     if(e.target.name === 'email'){
         isFormValid = /\S+@\S+\.\S+/.test(e.target.value)
     }
     if(e.target.name === 'password'){
       const isPasswordValid = e.target.value.length > 8
       const passwordHasNumber = /\d{1}/.test(e.target.value)
       isFormValid = isPasswordValid && passwordHasNumber
    }
    if(e.target.name === 'name'){
      isFormValid = e.target.value;
    }
    if(isFormValid){
       const newUserInfo = {...user}
       newUserInfo[e.target.name] = e.target.value
       setUser(newUserInfo)
    }
  }

  //[===============================]

  // handle submit
  const handleSubmit = (e) =>{
    e.preventDefault()
    if(newUser && user.email && user.password){
      createUserEmailPassword(user.name, user.email, user.password)
      .then(res => {
        handleResponse(res, true)
      })
    }
    if(!newUser && user.email && user.password){
      signInEmailandpassword(user.email,user.password)
      .then(res =>{
        handleResponse(res, true)
      })
    } 
  }

  //[===============================]
  // handle response 
  const handleResponse = (res, redirect) =>{
    setUser(res)
    setLogInUser(res)
    if(redirect){
      navigate(from, { replace: true });
    }
  }


  


  return (
    <div className='Login' style={{textAlign: 'center'}}>
      {
         user.isSignIn ? <button onClick={SignOut}>Sign out</button>:
         <button onClick={GoogleSignin}>Sign In</button>
      }
       <br />
       <button onClick={facebookSignin}>Sign In using FaceBook</button>
       {
         user.isSignIn ?
          <div>
              <h4>Welcome {user.name}</h4>
               <p>Your Email: {user.email}</p>
               <img src={user.photoUrl} alt="" />
          </div>: ""
       }
       {/*-------- sign in -------  */}
       <h2>Our Own Authentication</h2>
        <input type="checkbox" onChange={() => setNewUser(!newUser) } name="newUser" id=""/>
        <label htmlFor="newUser">New User Sign Up</label>
        {/*------ form handle -----  */}
       <form action="#" onSubmit={handleSubmit}>
          {newUser && <input type="text" placeholder='Your name' name="name" onBlur={handleBlur} required/> }
          <br />
         <input type="email" name="email" id="email" onBlur={handleBlur} placeholder="Email" required/>
         <br />
         <input type="password" name="password" id="password" onBlur={handleBlur} placeholder="Password" required/>
         <br />
         <input type="submit" value={newUser? 'Sign Up': 'Sign In'} />
         <button onClick={() => () => resetPassword(user.email)}>forget or password</button>
       </form>
        {
          user.sucess ? <p style={{color: 'Green'}}>User {newUser? 'Created': 'Login'} sucessfull</p>:
          <p style={{color: 'red'}}>{user.error}</p>
        }
    </div>
  );
}

export default Login;
