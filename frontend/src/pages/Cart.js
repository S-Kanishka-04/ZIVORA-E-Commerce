import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getImage } from "../utils/getImage";

export default function Cart({ cartItems, setCartItems }) {
    const [complete, setComplete] = useState(false);

    function increaseQty(item) {
        if (item.product.stock === item.qty) return;

        const updatedItems = cartItems.map((i) =>
            i.product._id === item.product._id
                ? { ...i, qty: i.qty + 1 }
                : i
        );

        setCartItems(updatedItems);
    }

    function decreaseQty(item) {
        if (item.qty <= 1) return;

        const updatedItems = cartItems.map((i) =>
            i.product._id === item.product._id
                ? { ...i, qty: i.qty - 1 }
                : i
        );

        setCartItems(updatedItems);
    }


    function removeItem(item) {
        const updatedItems = cartItems.filter(
            (i) => i.product._id !== item.product._id
        );

        setCartItems(updatedItems)
    }

    function placeOrderHandler() {
        fetch(process.env.REACT_APP_API_URL + '/order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cartItems)
        })
            .then(() => {
                setCartItems([]);
                setComplete(true);
                toast.success("Order Success!")
            })
    }

    return cartItems.length > 0 ? <Fragment>
        <div className="container container-fluid">
            <h2 className="mt-5">Your Cart: <b>{cartItems.length} items</b></h2>
            <div className="row d-flex justify-content-between">
                <div className="col-12 col-lg-8">
                    {cartItems.map((item) =>
                    (<Fragment key={item.product._id}>
                        <hr />
                        <div className="cart-item">
                            <div className="row">
                                <div className="col-4 col-lg-3">
                                    <img
                                        src={getImage(item.product.images?.[0])}
                                        alt={item.product.name}
                                        height="90"
                                        width="115"
                                    />
                                </div>

                                <div className="col-5 col-lg-3">
                                    <Link to={"/product/" + item.product._id} >{item.product.name}</Link>
                                </div>


                                <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                    <p id="card_item_price">${item.product.price}</p>
                                </div>

                                <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                    <div className="stockCounter d-inline">
                                        <span className="btn btn-danger minus" onClick={() => decreaseQty(item)}>-</span>
                                        <input type="number" className="form-control count d-inline" value={item.qty} readOnly />

                                        <span className="btn btn-primary plus" onClick={() => increaseQty(item)}>+</span>
                                    </div>
                                </div>

                                <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                                    <i id="delete_cart_item" onClick={() => removeItem(item)} className="fa fa-trash btn btn-danger"></i>
                                </div>

                            </div>
                        </div>
                    </Fragment>)
                    )}

                </div>

                <div className="col-12 col-lg-3 my-4">
                    <div id="order_summary">
                        <h4>Order Summary</h4>
                        <hr />
                        <p>Subtotal:  <span className="order-summary-values">{cartItems.reduce((acc, item) => (acc + item.qty), 0)} (Units)</span></p>
                        <p>Est. total: <span className="order-summary-values">${Number(cartItems.reduce((acc, item) => (acc + item.product.price * item.qty), 0)).toFixed(2)}</span></p>

                        <hr />
                        <button id="checkout_btn" onClick={placeOrderHandler} className="btn btn-primary btn-block">Place Order</button>
                    </div>
                </div>
            </div>
        </div>
    </Fragment> : (!complete ? <h2 className='mt-5'>Your Cart is Empty!</h2>
        : <Fragment>
            <h2 className='mt-5'>Order Complete!</h2>
            <p>Your order has been placed succesfully.</p>
        </Fragment>)
}