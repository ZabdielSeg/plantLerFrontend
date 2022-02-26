import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from "react-router-dom";
import PlantService from "./plant-service";

const PlantDetails = props => {
    const [plant, setPlant] = useState(null);
    useEffect(() => {
        getPlant();
    }, []);
    let { id } = useParams();
    const servicePlant = new PlantService();

    const getPlant = () => {
        servicePlant.getSinglePlant(id)
            .then(response => {
                setPlant(response);
            });
    };

    const openAndClosePicture = () => {
        const modal = document.getElementById('modal-js-example');
        modal.classList.toggle('is-active');
    }

    const addCeros = num => {
        if (!num.toString().includes('.')) return num += '.00';
        if (num.toString().split('.')[1].length !== 2) return num += '0';
        return num;
    };

    return (
        <div className="section">
            {plant &&
                <div>
                    <div className="columns">
                        <div className="column is-5 is-flex is-justify-content-center is-flex-direction-column">
                            <figure className="image is-1by1">
                                <img src={plant.imageUrl} alt={plant.plantName} />
                            </figure>
                            <button onClick={openAndClosePicture} className="js-modal-trigger button is-primary" data-target="modal-js-example">
                                See bigger
                            </button>
                        </div>
                        <div className="column is-7 ">
                            <div className="is-flex is-justify-content-space-evenly is-align-items-center is-flex-direction-column" style={{ height: '100%' }}>
                                <h2 className="subtitle is-1">{plant.plantName}</h2>
                                <p className="subtitle is-3">{plant.description}</p>
                                <p className="subtitle is-4">Sold By: <Link className="is-size-4" to={`/profile/${plant.owner._id}`}>{plant.owner.username}</Link></p>
                                <ul>
                                    <li className="is-size-4">Prefered Light: <b className="is-size-4">{plant.light}</b></li>
                                    <li className="is-size-4">Where to place: <b className="is-size-4">{plant.location}</b></li>
                                </ul>
                                <p className="subtitle is-4">Price: $<b className="is-size-4">{addCeros(plant.price)}</b></p>
                                <button onClick={() => props.addToCart(plant)} className="button is-primary is-outlined is-large">
                                    <span className="icon">
                                        <FontAwesomeIcon icon={faShoppingCart} size='lg' />
                                    </span>
                                    <span>Add to cart</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div id="modal-js-example" class="modal">
                        <div class="modal-background"></div>

                        <div class="modal-content">
                            <div class="image is-5by4">
                                <img src={plant.imageUrl} alt={plant.plantName} />
                            </div>
                        </div>

                        <button onClick={openAndClosePicture} class="modal-close is-large" aria-label="close"></button>
                    </div>
                </div>
            }
        </div>
    );
};

export default PlantDetails;