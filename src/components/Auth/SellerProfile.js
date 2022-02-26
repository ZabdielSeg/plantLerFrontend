import React, { useState, useEffect } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import AllPlantsCard from "../Plants/AllPlantsCard";
import PlantService from "../Plants/plant-service";
import AuthService from "./auth-service";

const SellerProfile = props => {
    const [userInfo, setUserInfo] = useState({});
    const [isOwner, setIsOwner] = useState(false);
    const [plants, setPlants] = useState(true);
    let { userId } = useParams();
    useEffect(() => {
        getUser();
    }, [props.theUser, userId]);

    const service = new AuthService();
    const servicePlant = new PlantService();

    const getUser = () => {
        service.getProfile(userId)
            .then(response => {
                ownProfileCheck(response);
                setUserInfo(response);
                if(!response.plants.length) {
                    setPlants(false);
                }
            });
    };

    const ownProfileCheck = user => {
        if (props.theUser && user._id === props.theUser._id) {
            setIsOwner(true);
        }
    };

    const deleteItem = id => {
        servicePlant.deletePlant(id)
            .then(() => getUser())
            .catch(err => console.log(err));
    };

    return (
        <>
            <section className='section'>
                <div className="columns">
                    <div className="column is-3 is-flex is-justify-content-center">
                        <figure className="image is-128x128">
                            <img className="is-rounded" src={userInfo.imageUrl} alt={`${userInfo.name} profile`} />
                        </figure>
                    </div>
                    <div className="column is-8">
                        <div className="content is-medium">
                            <h2>{userInfo.username}</h2>
                            <p>{userInfo.description}</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className='section'>
                <div className="columns">
                    <div className="column">
                        <div className="content is-flex is-flex-wrap-wrap is-justify-content-space-evenly">
                            {userInfo.plants && userInfo.plants.map(plant1 => <AllPlantsCard removeItem={deleteItem} addItem={() => props.addToCart(plant1)} key={plant1._id} {...plant1} isOwner={isOwner} />)}
                            {!plants && <div className="section is-medium"><p className="is-size-2">No plants yet...</p></div>}
                        </div>
                    </div>
                    <div className="column is-4 is-flex  is-flex-direction-column">
                        <div className="content is-medium">
                            <h2>Contact Info</h2>
                            <p>Email: {userInfo.email}</p>
                            <p>Phone number: {userInfo.whatsAppNumber}</p>
                            {isOwner && <Link className="button is-outlined is-link is-responsive" to={'edit-info'}>Update my info</Link>}
                        </div>
                        <Outlet />
                    </div>
                </div>
            </section>
        </>
    )
};

export default SellerProfile;