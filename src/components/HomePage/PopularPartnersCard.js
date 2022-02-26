import React from "react";
import { Link } from "react-router-dom";

const PopoularPartnersCard = props => {
    return (
        <div className="column is-half">
            <div className="card">
                <div className="card-content container" style={{ width: '90%' }}>
                    <div className="media is-align-items-center">
                        <div className="media-left" style={{ width: '30%' }}>
                            <figure className="image" >
                                <img className="is-rounded" src={props.imageUrl} alt="Placeholder" />
                            </figure>
                        </div>
                        <div className="media-content">
                            <p className="title is-4">{props.username}</p>
                            <p className="subtitle is-6">@{props.username}</p>
                            <Link to={`/profile/${props._id}`} className="button is-success is-light is-medium is-responsive">See More</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PopoularPartnersCard;