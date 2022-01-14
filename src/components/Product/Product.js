import React from 'react';
import './Product.css'
import { Link } from 'react-router-dom';
import { GiShoppingCart } from "react-icons/gi";
import {useDispatch} from 'react-redux';
import { addToBasket } from '../../redux/actions';



const Product = ({id, title, image, price, rating, specification, detail}) => {
    const dispatch = useDispatch();

    const addItemToBasket =()=>{
        const item ={
            id, title, image, price, rating, specification, detail
        }
        dispatch(addToBasket(item));
    }
    return (
        <div className='product'>
            <div className="info">
                <Link to={`/product/${id}`} className='title'>
                    {title}
                </Link>
                <div className="price">
                    <strong>$</strong>
                    <strong>{price}</strong>
                </div>
                <div className="rating">
                    {Array(rating).fill().map((_, index)=>{
                        <p>⭐</p>
                    })}
                </div>
                </div>
                <Link to={`/product/${id}`}>
                   <img src={image} alt=""  />
                </Link>

                <button onClick={addItemToBasket}>
                    <i>
                        <GiShoppingCart/>
                    </i>
                    Add to Basket
                </button>
            </div>
   
    )
}

export default Product
