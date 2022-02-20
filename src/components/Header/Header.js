import * as React from 'react'
import PersonIcon from '@material-ui/icons/Person';
import { IconButton } from '@material-ui/core';
import ForumIcon from '@material-ui/icons/Forum';
// import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';


import './Header.css'

function Header({ user }) {

    const logout = () => {
        window.open('http://localhost:8001/auth/logout', '_self');

    }
    return (
        <div className='header'>
            <Link to='/profile'>
                <IconButton>
                    <img src={user.photos[0].value} fontSize='large' alt='avatar' className='avatar' />
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