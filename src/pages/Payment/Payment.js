import React, {useState, useEffect} from 'react'
import "./Payment.css";
import {useSelector, useDispatch } from "react-redux";
import CurrencyFormat from 'react-currency-format';
import CheckoutProduct from '../../components/CheckoutProduct/CheckoutProduct';
import {getBasketTotal} from "../../utils/BasketTotal";
import {useHistory, Link} from "react-router-dom";

function Payment() {
    const dispatch = useDispatch();
    let history = useHistory();
    const {basket, user} = useSelector((state) => state.data);


    useEffect(()=>{

      
    }, [basket]);

    

    return (
        <div className="payment">
            <div className="payment-container">
                <h1>Checkout   {<Link to="/checkout">{basket.length}items</Link>}</h1>
                <div className="payment-section">
                    <div className="payment-title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment-address">
                        <p>{user && user.email}</p>
                        <p> Near Botanical Garden</p>
                        <p>Atlanta</p>
                    </div>
                </div>

                <div className="payment-section">
                    <div className="payment-title">
                        <h3>Review items and Delivery</h3>
                    </div>
                    <div className="payment-items">
                        {basket  && basket.map((item) => (
                            <CheckoutProduct
                              id={item.id}
                              title={item.title}
                              image={item.image}
                              price={item.price}
                              rating={item.rating}
                            />
                        ))}
                    </div>
                </div>

                <div className="payment-section">
                    <div className="payment-title">
                        <h3>Payment method</h3>
                        <div className="payment-details">
                            <form  >
                                  <div className="payment-priceContainer">
                                  <CurrencyFormat
                                 renderText={(value) => (
                                <>
                               <h3>Order Total: {value}</h3>
                                    </>
              )}
               
              decimalScale={2}
              value={getBasketTotal(basket)}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}

            />

                 <button >
                    <span>Buy Now</span>
                 </button>

                                  </div>
                            </form>

                        </div>
                        {/* // payment detail div finished */}
                    </div>
                </div>

                {/* // payment section finished here */}
            </div>

            {/* // paymentContainer finished here */}
        </div>
    )
}

export default Payment
