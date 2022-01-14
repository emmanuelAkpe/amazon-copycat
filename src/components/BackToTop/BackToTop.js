import React from 'react';
import './BackToTop.css';
import { AiOutlineArrowUp } from "react-icons/ai";


const BackToTop = () => {
    return (
        <div className='back-top-container'>
            <h1 className='scroll-to-top'>
                <a href="#banner" >
                Back to Top <AiOutlineArrowUp/>
                </a>
            </h1>
        </div>
    )
}

export default BackToTop
