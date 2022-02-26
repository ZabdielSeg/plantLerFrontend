import React from 'react';
import { Navigate} from 'react-router-dom';

export const ProtectedRoutesCart = ({children, theUser, ...rest}) => {
    console.log({children, theUser, ...rest})
    return theUser ? children : <Navigate to='/login' />
}

export const ProtectedRoutesLoggedUser = ({children, theUser, ...rest}) => {
    console.log({children, theUser, ...rest})
    return theUser ? <Navigate to='/' />  : children;
}