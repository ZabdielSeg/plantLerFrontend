import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { NavLink, useNavigate } from 'react-router-dom';
import AuthService from './Auth/auth-service';

const NavBar = props => {
    const [user, setUser] = useState({});
    useEffect(() => {
        setUser(props.theUser);
    }, [props.theUser]);

    const toggleBurger = () => {
        let burgerIcon = document.getElementById('burger');
        let dropMenu = document.getElementById('navbarBasicExample');
        burgerIcon.classList.toggle('is-active');
        dropMenu.classList.toggle('is-active');
    };

    const service = new AuthService();
    const navigate = useNavigate();

    const handleLogOut = () => {
        service.logout()
            .then(() => {
                props.getUser(null);
                navigate('/');
            });
    };

    return (
        <nav className="navbar mt-2 has-shadow" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <NavLink to='/' className="navbar-item">
                    <img src='https://res.cloudinary.com/ds3hh2gv2/image/upload/v1644629896/PlantLer/LogoPlantLer_rmspxe.jpg' width='50' alt='logo' />
                </NavLink>


                <a role="button" id='burger' className="navbar-burger" aria-label="menu" aria-expanded="true" data-target="navbarBasicExample" onClick={toggleBurger}>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>

            </div>

            <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-start">
                    <NavLink to='/' className="navbar-item is-size-5">
                        Home
                    </NavLink>
                    <NavLink to='products' className="navbar-item is-size-5">
                        All Products
                    </NavLink>
                </div>

                <div className="navbar-end">
                    {user &&
                        <figure className="image is-48x48">
                            <img alt='Profile' className="is-rounded" src={user.imageUrl} />
                        </figure>
                    }
                    <div className='navbar-item' >
                        <NavLink to='cart' className="button is-success is-outlined">
                            <span className="icon is-large" >
                                <FontAwesomeIcon className='fa-2x' icon={faShoppingCart} style={{ position: 'absolute' }} />
                                <i className="is-relative has-text-dark" style={{ top: '-4px', left: '3px' }}>{props.theCart.length <= 9 ? props.theCart.length : '9+'}</i>
                            </span>
                        </NavLink>
                    </div>

                    <div className="navbar-item">
                        <div className="buttons is-centered">
                            {
                                user
                                    ?
                                    <>
                                        {user.isSeller
                                            &&
                                            <div>
                                                <NavLink to={`/profile/${user._id}`} className="button is-primary">
                                                    <strong>Profile</strong>
                                                </NavLink>
                                                <NavLink to={`/create-plant`} className="button is-link">
                                                    <strong>Create plant</strong>
                                                </NavLink>
                                            </div>
                                        }
                                        <button onClick={handleLogOut} className="button is-danger">
                                            <strong>Logout</strong>
                                        </button>
                                    </>
                                    :
                                    <div>
                                        <NavLink to="signup" className="button is-primary">
                                            <strong>Sign up</strong>
                                        </NavLink>
                                        <NavLink to='login'className="button is-light">
                                            Log in
                                        </NavLink>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
};

export default NavBar;