import firebaseConfig  from '../Login/FirebaseConfiq'
import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, FacebookAuthProvider, getAuth, GoogleAuthProvider, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateEmail, updateProfile} from "firebase/auth";


// initialize Login 
export const initializeLoginFramework = () =>{
  const app = initializeApp(firebaseConfig)
}


// handle sign in with Google
export const handleGoogleSignin = () => {
  const auth = getAuth()
  const provider = new GoogleAuthProvider()
  // provider here 
  return signInWithPopup(auth, provider)
  .then((result) => {
  const credential = GoogleAuthProvider.credentialFromResult(result);
  const token = credential.accessToken;
  const user = result.user;
  const {displayName, email,photoURL} = user
  
  const signInUser = {
     isSignIn: true,
     name: displayName,
     email: email,
     photo: photoURL,
     sucess: true,
  }
  return signInUser
}).catch((error) => {
  const errorCode = error.code;
  const errorMessage = error.message;
  const email = error.email;
  const credential = GoogleAuthProvider.credentialFromError(error);
});
};



// handle sign in with facebook
export const handlefbSignIn = () =>{
    const fbprovider = new FacebookAuthProvider()
    const auth = getAuth();
    // provider here 
    return signInWithPopup(auth, fbprovider)
      .then((result) => {
        const user = result.user;
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        user.sucess =  true;
        return user
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = FacebookAuthProvider.credentialFromError(error);
      });
  }


  // handle sign out button
  export const handleSignOut = () =>{
    const auth = getAuth()
    return signOut(auth).then(() => {
     const SignOutuser = {
       isLogIn: false, 
       name: '', 
       email: '', 
       photo: '',
    }
    return SignOutuser
}).catch((error) => {
  console.log(error)
  });
}




// handle create user with email and password
export const createUserEmailPassword = (name, email, password) =>{
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
     const user = userCredential.user;
     // succesfull 
     const newUserInfo = {...user}
     newUserInfo.error = ''
     newUserInfo.sucess = true;
     updateUserName(name)
     verifyEmail()
     return newUserInfo
   })
   .catch((error) => {
     const newUserInfo = {}
     newUserInfo.error = error.message
     newUserInfo.sucess = false;
     return newUserInfo
   });
} 



// handle sign in with email and password
export const signInEmailandpassword = (email, password) =>{
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
     // Signed in 
     const user = userCredential.user;
     const newUserInfo = {...user}
     newUserInfo.error = ''
     newUserInfo.sucess = true;
     return newUserInfo
  })
  .catch((error) => {
     const newUserInfo = {}
      newUserInfo.error = error.message
      newUserInfo.sucess = false;
      return newUserInfo
  });
}



// update user name
const updateUserName = (name) =>{
    const auth = getAuth();
      updateProfile(auth.currentUser, {
        displayName: name, 
      })
      .then(() => {
       // response 
      }).catch((error) => {
        console.log(error)
      });
  }


  // verify email 
  const verifyEmail = () => {
    const auth = getAuth();
   sendEmailVerification(auth.currentUser)
  .then(() => {
    // Email verification sent!
    // ...
  });
  }


  // reset password

  export const resetPassword = (email) =>{
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        // ..
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }