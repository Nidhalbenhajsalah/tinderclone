import * as React from 'react'
import PersonIcon from '@material-ui/icons/Person';
import { IconButton } from '@material-ui/core';
import ForumIcon from '@material-ui/icons/Forum';
// import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';



import './Header.css'


function Header() {








    return (
        <div className='header'>
            <Link to='/profile'>
                <IconButton>
                    <PersonIcon className='header__icon'
                        fontSize='large' />
                </IconButton>
            </Link>
            <img
                className='header__logo'
                src='https://logos-world.net/wp-content/uploads/2020/09/Tinder-Emblem.png'
                alt='tinder logo'
            />
            <Link to='/chat'>
                <IconButton >
                    <ForumIcon fontSize='large' className='header__icon' />
                </IconButton>
            </Link>
        </div>


    )
}

export default Header