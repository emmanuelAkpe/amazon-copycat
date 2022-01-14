import React, {useState, useEffect} from 'react'
import "./Payment.css";
import {useSelector, useDispatch } from "react-redux";
import CurrencyFormat from 'react-currency-format';
import CheckoutProduct from '../../components/CheckoutProduct/CheckoutProduct';
import {getBasketTotal} from "../../utils/BasketTotal";
import {useHistory, Link} from "react-router-dom";
import { db } from "../../utils/firebase";
import {CardElement, useStripe, useElements} from "@stripe/react-stripe-js";
import axios from "../../utils/axios";
import {setBasketEmpty} from "../../redux/actions"

function Payment() {
    const dispatch = useDispatch();
    let history = useHistory();
    const {basket, user} = useSelector((state) => state.data);

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [error, setError]  = useState(null);
    const [disabled, setDisabled] = useState()
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(()=>{

        // generate the spacial strip secret which allows us to charge a customer
        const getClientSecret = async () => {
            const response = await axios({
                method: "POST",

                // Strip expects the total in a currencies subunits
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            })
            setClientSecret(response.data.clientSecret)
        }
        getClientSecret();
    }, [basket]);



    const stripe = useStripe();
    const elements = useElements();
    
    
    const handleSubmit = async (e) =>{

        // do all the stripe stuff....
           e.preventDefault();
           setProcessing(true);

           const payload = await stripe.confirmCardPayment(clientSecret, {
               payment_method: {
                   card: elements.getElement(CardElement) 
               }
           }).then(({ paymentIntent }) => {
                     // paymentIntent = payment confirmation
                     console.log(paymentIntent)

                   db.collection('users')
                       .doc(user?.uid)
                       .collection('orders')
                       .doc(paymentIntent.id) // as order id
                       .set({
                           basket: basket,
                           amount: paymentIntent.amount,
                           created: paymentIntent.created,  // it gives us time stamp
                       });
                   setSucceeded(true);
                   setError(null);
                   setProcessing(false);
                   dispatch(setBasketEmpty());
                   history.replace("/orders");
               });
    }



    const handleChange = (e) => {
         setDisabled(e.empty);
         setError(e.error ? e.error.message : "");
    }
    

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
                            <form  onSubmit={handleSubmit}>

                                <CardElement onChange={handleChange}/>
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

                 <button disabled={processing || disabled || succeeded}>
                    <span>{ processing ? <p>Processing</p> : "Buy Now"}</span>
                 </button>

                                  </div>
                             {error && <div>{error}</div>} 
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
