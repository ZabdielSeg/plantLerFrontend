import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const ProductsCard = props => {
    const updateCart = () => {
        props.deleteFunction();
    };

    return (
        <div key={props.idx} className="card" style={{ width: '90%', margin: '20px auto' }}>
            <div className="card-content">
                <div className="media">
                    <div className="media-left">
                        <figure className="image is-64x64">
                            <img src={props.imageUrl} alt="Placeholder" />
                        </figure>
                    </div>
                    <div className="media-content">
                        <p className="title is-4">{props.plantName}</p>
                        <p className="subtitle is-6">Unitary cost: ${props.price.toFixed(2)}</p>
                    </div>
                    <div className="media-right">
                        <div className="field">
                            <p>Quantity: {props.quantity} = ${(props.quantity * props.price).toFixed(2)}</p>
                        </div>
                        <div className="control">
                            <button onClick={() => props.addPrice(props.idx)} className="button is-info">
                                <FontAwesomeIcon icon={faPlus} size='sm' />
                            </button>
                            <button onClick={() => props.restPrice(props.idx)} className="button is-info">
                                <FontAwesomeIcon icon={faMinus} size='sm' />
                            </button>
                            <button onClick={updateCart} className="button is-danger">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductsCard;