import { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import CarouselItem from './CarouselItem';

const CarouselPlants = props => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        setProducts(props.allProducts);
    }, [props.allProducts]);

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 2 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    };

    return (
        <div className='carousel-div'>
            <h2 className=''>Some of our Products</h2>
            {products &&
                <Carousel responsive={responsive} showDots={true} itemClass="carousel-item" autoPlay={true} autoPlaySpeed={3000} infinite={true}>
                    {[...products].splice(0, 5).map(plant => <CarouselItem key={plant.plantName} {...plant} />)}
                </Carousel>
            }
        </div>
    )
}

export default CarouselPlants;