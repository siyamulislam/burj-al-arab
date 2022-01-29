import { Button } from '@mui/material';
import React, { useContext } from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebaseConfig';
import { getAuth, signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import { UserContext } from '../../App';
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

const Login = () => {
     const [loggedInUser,setLoggedInUser]=useContext(UserContext);
    const handelLogin = ()=>{
        signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          console.log(user );
          const {displayName,email,photoURL}=user;
          console.log(displayName,email,photoURL);
          const signInUser= {name: displayName,email, url: photoURL};
           setLoggedInUser(signInUser);
        }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });
    }
    return (
        <div style={{color:'red', textAlign: 'center'}}>
            <h1>This is Login</h1>
            <Button variant="outlined" onClickCapture={handelLogin}><GoogleIcon/> Sign in With Google</Button>
        </div>
    );
};

export default Login;