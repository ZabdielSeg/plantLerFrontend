import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCcMastercard, faCcVisa } from '@fortawesome/free-brands-svg-icons';
import React from 'react';

const CreditCard = props => {
    const hideNumbers = num => {
        return num.length <= 16 ? num.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ') : false;
    };

    return (
        <div style={{ width: '70%', height: '90%', border: '1px solid black', borderRadius: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', backgroundColor: '#708BBC' }}>
            <div className='card-information'>
                <p>{props.number ? hideNumbers(props.number) : 'Card number'}</p>
            </div>
            <div className='card-information'>
                <p> Expiration date: {props.expirationMonth ? props.expirationMonth : '00'} / {props.expirationYear ? props.expirationYear : '00'}</p>
            </div>
            <div className='card-information'>
                <p>{props.theName ? props.theName.toUpperCase() : 'Owner card name'} <FontAwesomeIcon icon={faCcVisa} size='md' /> <FontAwesomeIcon icon={faCcMastercard} size='md' /></p> 
            </div>
        </div>
    )
};

export default CreditCard;