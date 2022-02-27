import * as React from 'react'
import { useEffect, useState } from 'react'
import PersonIcon from '@material-ui/icons/Person';
import { IconButton } from '@material-ui/core';
import ForumIcon from '@material-ui/icons/Forum';
// import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import Profile from '../../pages/profile/profile';


import './Header.css'
import axios from 'axios';

function Header({ id }) {



    const logout = () => {
        window.open('http://localhost:8001/auth/logout', '_self');
    }




    return (
        <div className='header'>
            <Link to='/profile'>
                <IconButton>
                    <PersonIcon />
                </IconButton>
            </Link>
            <img
                className='header__logo'
                src='https://logos-world.net/wp-content/uploads/2020/09/Tinder-Emblem.png'
                alt='tinder logo'
            />
            <IconButton onClick={logout}>
                <ForumIcon fontSize='large' className='header__icon' />
            </IconButton>
        </div>


    )
}

export default Header