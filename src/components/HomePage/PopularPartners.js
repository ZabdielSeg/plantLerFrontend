import { React, useEffect, useState } from "react";
import AuthService from "../Auth/auth-service";
import PopoularPartnersCard from "./PopularPartnersCard";

const PopoularPartnersSection = () => {
    const [allSellers, setAllSellers] = useState([]);
    useEffect(() => {
        getSellers();
    }, []);

    const service = new AuthService();
    const getSellers = () => {
        service.getAllSellers()
            .then(response => setAllSellers(response));
    };
    return (
        <div className="popular-partners-div" style={{ minHeight: '500px' }}>
            <h2 className="">Our best Sellers</h2>
            <div style={{ width: '90%' }}>
                {allSellers &&
                    <div className="columns is-multiline">
                        {allSellers.map(seller => <PopoularPartnersCard key={seller._id} {...seller} />)}
                    </div>
                }
            </div>
        </div>
    )
}

export default PopoularPartnersSection;