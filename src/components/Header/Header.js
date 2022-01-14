import React from 'react';
import './Header.css'
import SearchIcon from '@material-ui/icons/Search'
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined'
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined'
import {Link} from 'react-router-dom'
import Logo from './logo.png'
import {useSelector, useDispatch} from 'react-redux'
import { logOutInitiate } from '../../redux/actions';


// User signs out by clicking on signout
const Header = () => {
    const {user, basket } = useSelector((state)=>state.data);

    let dispatch = useDispatch();
    const handleAuth =()=>{
        if(user){
            dispatch(logOutInitiate());
        }
    }

    return (
        <div className='header' id='header'>
            <Link to='/'>
                <img className='header-logo' src={Logo} />
            </Link>

            <div className="header-option" style={{marginRight: '-10px'}}>
                <LocationOnOutlinedIcon/>
            </div>
            <div className="header-option">
                <span className='header-option1'>Hello</span>
                <span className='header-option2'>Select your address</span>
            </div>
            <div className="search">
                <select name="" id="">
                    <option value="">All</option>
                </select>
                <input type="text" className="searchInput" />
                <SearchIcon className='searchIcon' />
            </div>
            <div className="header-nav">
                <Link to='/login' className='header-link' >
                    <div onClick={handleAuth} className="header-option">       
                        <span className='header-option1'>Hello, {user ? user.email:'Guest'} </span>
                        <span className='header-option2'>{user? 'sign Out' : 'sign In'}</span>
                    </div>
                </Link>

                <Link to='/orders' className='header-link' >
                    <div className="header-option">       
                        <span className='header-option1'>Returns</span>
                        <span className='header-option2'>& Orders</span>
                    </div>
                </Link>
                <Link to='/login' className='header-link' >
                    <div className="header-option">       
                        <span className='header-option1'>Your</span>
                        <span className='header-option2'>Prime</span>
                    </div>
                </Link>

                <Link to='/checkout' className='header-link' >
                    <div className="header-basket">       
                        <ShoppingCartOutlinedIcon/>
                        <span className='header-option2 basket-count'> 
                            {basket && basket.length}
                        </span>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Header
