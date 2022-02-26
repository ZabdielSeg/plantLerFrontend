import React from "react";
import { Link } from "react-router-dom";

const AllPlantsCard = props => {

    const updateCart = () => {
        props.addItem();
    };

    return (
        <div className='card plant-card'>
            <div className="card-image" style={{ width: '80%', margin: 'auto' }}>
                <figure className="image is-4by3">
                    <img src={props.imageUrl} alt="Placeholder" style={{ objectFit: 'contain' }} />
                </figure>
            </div>

            <div className="card-content">
                <div className="media">
                    <div className="media-content">
                        <p className="is-size-4">{props.plantName}</p>
                        <p className="is-size-6">${(props.price).toFixed(2)}</p>
                    </div>
                </div>
            </div>

            <footer className="card-footer">
                {props.isOwner
                    ?
                    <div className="is-flex is-flex-direction-column" style={{width: '100%'}}>
                        <button onClick={() => props.removeItem(props._id)} className="button is-danger card-footer-item is-small">Delete</button>
                        <Link to={`edit-plant/${props._id}`} className="button is-info card-footer-item is-small">Edit Plant</Link>
                        <Link className="button is-primary card-footer-item is-small" to={`/plant/${props._id}`}>More Info</Link>
                    </div>
                    :
                    <>
                        <button onClick={updateCart} className="button is-primary card-footer-item">Add to cart</button>
                        <Link className="button is-primary card-footer-item" to={`/plant/${props._id}`}>More Info</Link>
                    </>
                }
            </footer>
        </div>
    )
}

export default AllPlantsCard;