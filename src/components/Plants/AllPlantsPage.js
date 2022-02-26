import { React, useState, useEffect } from 'react';
import AllPlantsCard from './AllPlantsCard';
import FilterService from './sort-and-filters-service';

const AllPlantsPage = props => {
    const filter = new FilterService();
    const [products, setProducts] = useState([]);
    useEffect(() => {
        setProducts(props.allProducts);
    }, [props.allProducts]);

    const [sortedByName, setSortedByName] = useState(false);
    useEffect(() => {
        checkAllSortings();
    }, [sortedByName]);

    const [sortedByCost, setSortedByCost] = useState(false);
    useEffect(() => {
        checkAllSortings();
    }, [sortedByCost]);

    const [onlyIndoorPlants, setOnlyIndoorPlants] = useState(false);
    useEffect(() => {
        checkFilters();
    }, [onlyIndoorPlants]);

    const [onlyOutdoorPlants, setOnlyOutdoorPlants] = useState(false);
    useEffect(() => {
        checkFilters();
    }, [onlyOutdoorPlants]);

    const [productsShown, setProductsShown] = useState([]);
    useEffect(() => {
        setProductsShown([...products]);
        console.log(productsShown);
    }, [products]);

    const handleSorting = () => {
        setSortedByName(!sortedByName);
        setSortedByCost(false);
    };
    const handleSortCost = () => {
        setSortedByCost(!sortedByCost);
        setSortedByName(false);
    };

    const handleOnlyIndoor = () => {
        setOnlyIndoorPlants(!onlyIndoorPlants);
        setOnlyOutdoorPlants(false);
    };

    const handleOutdoor = () => {
        setOnlyOutdoorPlants(!onlyOutdoorPlants);
        setOnlyIndoorPlants(false);
    };

    const checkAllSortings = () => {
        if (sortedByName) { setProductsShown(filter.sortByName(productsShown)); }
        if (sortedByCost) { setProductsShown(filter.sortByCost(productsShown)); }
        if (!sortedByName && !sortedByCost && !onlyIndoorPlants && !onlyOutdoorPlants) { setProductsShown(props.allProducts); }
    };

    const checkFilters = () => {
        if (onlyIndoorPlants) { setProductsShown(filter.onlyIndoor(products)); }
        if (onlyOutdoorPlants) { setProductsShown(filter.onlyOutdoor(products)); }
        if (!sortedByName && !sortedByCost && !onlyIndoorPlants && !onlyOutdoorPlants) { setProductsShown(props.allProducts); }
    };

    const abx = obj => {
        props.addToCart(obj);
    };

    return (
        <>
            <div>
                <div className='section box is-flex is-flex-wrap-wrap is-justify-content-space-evenly' style={{ width: '90%', margin: '20px auto' }}>
                    <label className="checkbox">
                        <input onChange={handleSorting} checked={sortedByName} type="checkbox" />
                        Sort by Name
                    </label>
                    <label className="checkbox">
                        <input onChange={handleSortCost} checked={sortedByCost} type="checkbox" />
                        Sort by Cost
                    </label>
                    <label className="checkbox">
                        <input onChange={handleOnlyIndoor} checked={onlyIndoorPlants} type="checkbox" />
                        Only Indoor Plants
                    </label>
                    <label className="checkbox">
                        <input onChange={handleOutdoor} checked={onlyOutdoorPlants} type="checkbox" />
                        Only Outdoor Plants
                    </label>
                </div>
            </div>
            <div className='section is-flex is-flex-wrap-wrap is-justify-content-space-evenly' style={{ minHeight: '500px' }}>
                {
                    productsShown.map(product => <AllPlantsCard addItem={() => abx(product)} key={product._id} {...product} />)
                }
            </div>
        </>
    )
}

export default AllPlantsPage;