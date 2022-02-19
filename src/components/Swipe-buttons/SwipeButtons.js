import React from 'react'
import './swipebuttons.css'
import { IconButton } from '@material-ui/core';

function SwipeButtons() {
    return (
        <div
            className="swipeButtons"
        >
            <IconButton className='iconbutton' >
                <i className="fa-solid fa-rotate-left" id='swipeButtons__repeat'></i>
            </IconButton>
            <IconButton >
                <i className="fa-solid fa-x"
                    id='swipeButtons__left'></i>
            </IconButton>
            <IconButton >
                <i className="fa-solid fa-star"
                    id='swipeButtons__star'></i>
            </IconButton>
            <IconButton >
                <i className="fa-solid fa-heart"
                    id='swipeButtons__heart'></i>
            </IconButton>
            <IconButton >
                <i className="fa-solid fa-bolt-lightning"
                    id='swipeButtons__lightning'></i>
            </IconButton>
        </div>
    )
}

export default SwipeButtons