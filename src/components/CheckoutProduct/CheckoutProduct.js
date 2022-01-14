import React from 'react';
import "./CheckoutProduct.css";
import { useDispatch } from "react-redux";
import ShoppingCartOutlinedIcon from '@material-ui/icons/AddShoppingCartOutlined';
import { removeFromBasket } from "../../redux/actions"

function CheckoutProduct({id, title, image, rating, price, hideButton}) {

    const dispatch = useDispatch();

    const removeItemFromBasket = () => {
       dispatch(removeFromBasket(id));
    }

    return (
        <div className="checkout-product">
            <img className="checkout-product-image"
             src={image}
              alt="" />

              <div className="checkout-product-info">
                  <p className="checkout-product-title">{title}</p>
                  <p className="checkout-product-price">
                      <strong>$</strong>
                      <strong>{price}</strong>
                  </p>

                  <div className="checkout-product-rating">
                      {Array(rating)
                      .fill()
                      .map((_, index) => (
                          <p key={index}>⭐</p>
                      ))}
                  </div>
                   {  !hideButton && (
                  <button onClick={removeItemFromBasket}>
                      <i><ShoppingCartOutlinedIcon/>
                         Remove from basket
                      </i>
                  </button>

                   )}
              </div>

        </div>
    )
}

export default CheckoutProduct
