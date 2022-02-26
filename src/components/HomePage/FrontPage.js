import React from "react";

const FrontPage = () => {
    return (
        <div className="" style={{ position: 'relative', boxSizing: 'border-box' }}>
            <div className="has-text-right cover-text" style={{ width: '40%', zIndex: '100' }}>
                <h1 className=" principal-title" >Welcome to PlantLer</h1>
                <p className="lema">"Where you can buy a plant or a tree"</p>
            </div>
            <figure className="image" >
                <img src='https://res.cloudinary.com/ds3hh2gv2/image/upload/v1643753215/PlantLer/PortadaPlantLer1_r2cyye.jpg' alt="Cover" style={{ width: '80%', margin: '0 auto' }} />
            </figure>
        </div>
    )
}

export default FrontPage;