import React from 'react';
import "./SubTotal.css";
import { useSelector } from "react-redux";
import CurrencyFormat from 'react-currency-format';
import { useHistory } from "react-router-dom";
import {getBasketTotal} from "../../utils/BasketTotal";
function SubTotal() {

    const {basket , user} = useSelector(state => state.data);
    const history = useHistory();
    const handleCheckout = () => {
         if(user){
            history.replace("/payment"); 
         }else{
             history.replace("/login");
         }
    }

    return (
        <div className="subtotal">
            <CurrencyFormat
              renderText={(value) => (
                  <>
                 <p>
                     SubTotal ({basket.length} items) : <strong>{value}</strong>
                 </p>
                 <small className="subtotal-gift">
                   <input type="checkbox" />
                     This order contain a gift
                 </small>

                  </>
              )}
               
              decimalScale={2}
              value={getBasketTotal(basket)}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}

            />
            <button onClick={handleCheckout}>Proceeed to Checkout</button>
        </div>
    )
}

export default SubTotal
