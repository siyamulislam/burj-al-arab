import { Button } from '@mui/material';
import React, { useContext } from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebaseConfig';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { UserContext } from '../../App';
import { useLocation, useNavigate } from 'react-router-dom';
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const navigate = useNavigate();
    const { state } = useLocation();
    const handelLogin = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                //   console.log(user );
                const { displayName, email, photoURL } = user;
                const signInUser = { name: displayName, email, url: photoURL };
                setLoggedInUser(signInUser);
                storeAuthToken()
                
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }
    const storeAuthToken = () => {
        auth.currentUser.getIdToken(/* forceRefresh */ true).then(function (idToken) {
            // Send token to your backend via HTTPS 
            sessionStorage.setItem('token', idToken)
            navigate(state?.path || "/");

        }).catch(function (error) {
            // Handle error
        });
    }
    return (
        <div style={{ color: 'red', textAlign: 'center' }}>
            <h1>This is Login</h1>
            <Button variant="outlined" onClickCapture={handelLogin}><GoogleIcon /> Sign in With Google</Button>
        </div>
    );
};

export default Login;