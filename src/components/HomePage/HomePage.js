import React, { useEffect, useState } from "react";
import CarouselPlants from "./Carousel";
import FrontPage from "./FrontPage";
import PopoularPartnersSection from "./PopularPartners";
import 'react-multi-carousel/lib/styles.css';

const HomePage = props => {
    return (
        <>
            <FrontPage />
            <PopoularPartnersSection />
            <CarouselPlants allProducts={props.allProducts} />
        </>
    )
}

export default HomePage