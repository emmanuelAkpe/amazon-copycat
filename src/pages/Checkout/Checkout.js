import React from 'react'
import "./Checkout.css";
import { useSelector} from "react-redux";
import CheckoutProduct from '../../components/CheckoutProduct/CheckoutProduct';
import SubTotal from '../../components/SubTotal/SubTotal';

function Checkout() {
    const {basket, user} = useSelector(state => state.data)

    return (
        <div className="checkout">
                 {/* // checkout left start */}
           <div className="checkout-left">
              <img src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg" alt="" className="checkout-ad" />
         

           <div>
              <h3>Hello, {user?.email}</h3>
              <h2 className="checkout-title">
                  {basket.length === 0 ? "Your Shopping Basket is empty" : "Your Shopping Basket"}
              </h2>
             {/* checkout Product */}
             {basket && basket.map((item) => (
                 <CheckoutProduct
                      key={item.id}
                      id={item.id}
                      title={item.title}
                      image={item.image}
                      price={item.price}
                      rating={item.rating}
                 />
             ))}
           </div>
           </div> 
           {/* // checkout left end */}
            <div className="checkout-right">
                <SubTotal/>
            </div>

        </div>
    )
}

export default Checkout
