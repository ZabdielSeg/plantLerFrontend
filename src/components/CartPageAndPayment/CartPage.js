import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import ProductsCard from "./CartProductsCard";

const CartPage = props => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        setProducts(props.productsInCart);
    }, [props.productsInCart]);

    const [total, setTotal] = useState(0);
    useEffect(() => {
        getTotal();
    }, [products]);

    const getTotal = () => {
        let cart = [...products].reduce((acc, item) => acc + (item.price * item.quantity), 0);
        setTotal(cart);
    };

    const addition = i => {
        const copy = [...products].map((item, o) => {
            if (i === o) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });

        setProducts(copy);
    };

    const substraction = i => {
        const copy = [...products].map((item, o) => {
            if (i === o) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        });

        setProducts(copy);
    }

    const abx = obj => {
        props.cartManipulation(obj, true);
    };

    return (
        <div>
            <div className="">
                <h2>Cart</h2>
            </div>
            <div className="tile is-ancestor">
                <div className="tile is-parent is-8 is-vertical" style={{ minHeight: '550px' }}>
                    {
                        products.length
                        ?
                        products.map((product, i) => <ProductsCard key={i} idx={i} restPrice={substraction} addPrice={addition} {...product} deleteFunction={() => abx(product)} />)
                        :
                        <div className="is-flex is-justify-content-space-evenly is-flex-direction-column" style={{height: '90%'}}>
                            <h2>Oooops...</h2>
                            <h2>There are no products on your cart</h2>
                        </div>
                    }

                </div>
                <div className="tile is-parent">
                    <article className="tile is-child">
                        <div className="content box">
                            <p className="title">Total: ${total.toFixed(2)} </p>
                            {
                                total >= 1
                                ?
                                <Link to={'payment'} className="button is-success is-fullwidth is-medium">Continue to pay</Link>
                                :
                                <button className="button is-success is-fullwidth is-medium" disabled>Continue to pay</button>
                            }
                        </div>
                    </article>
                </div>
            </div>
            <Outlet context={[total, setTotal]} />
        </div>
    )
}

export default CartPage;