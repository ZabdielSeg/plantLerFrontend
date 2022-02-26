import React from 'react';
import { Link } from 'react-router-dom';

const CarouselItem = props => {
    return (
        <div className='is-flex is-flex-direction-column is-justify-content-space-between' style={{ height: '100%' }}>
            <div style={{ width: '100%', height: '50%' }}>
                <img src={props.imageUrl} alt='Profile' style={{ height: '100%' }} />
            </div>
            <div style={{ width: '100%', height: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center' }}>
                <h2 className='hekp'>{props.plantName}</h2>
                <Link to={`plant/${props._id}`} className='button is-primary box' >See More</Link>
            </div>
        </div>
    )
}

export default CarouselItem;