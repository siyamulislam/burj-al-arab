import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import header from '../../images/header.png';
import logo from '../../images/icons/logo.png';
import { UserContext } from '../../App';
import { getAuth, signOut } from "firebase/auth";

const Header = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const handleLogIn = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            setLoggedInUser({})
           console.log('successfully SignOut')
        }).catch((error) => {
            // An error happened.
        });
    }
    return (
        <div style={{ backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${header})` }} className="header">
            <nav className="nav">
                <ul>
                    <li>
                        <img className="logo" src={logo} alt="" />
                    </li>
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link className="btn-book" to="/book">Book</Link>
                    </li>

                    <li>  <span><img className="userLogo" src={loggedInUser.url} alt="" /></span></li>
                    <li className="signInUser">  {loggedInUser.name && 'hi, ' + loggedInUser.name} </li>
                    <li className="authUser"> <span onClick={handleLogIn}>{loggedInUser.name && " Sign Out "} </span> </li>

                </ul>
            </nav>
            <div className="title-container">
                <h1>Burj Al Arab</h1>
                <h2>A global icon of Arabian luxury</h2>
            </div>
        </div>
    );
};

export default Header;