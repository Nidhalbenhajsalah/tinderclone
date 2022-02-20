import React from 'react';
import { IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
import './profile.css';

const Profile = () => {
    return (
        <div className='profile'>

            <div className='profile__header'>
                <Link to='/'>
                    <i className="fa-solid fa-chevron-left back"></i>
                </Link>
            </div>
            <div className='main_avatar'>
                <img src='https://media-exp1.licdn.com/dms/image/C5603AQE1LnRsW7CCuA/profile-displayphoto-shrink_200_200/0/1549987193384?e=1647475200&v=beta&t=BkJ3iIt0lnb4t4KbpZlFiioyvJ9bodcwRTKVKqPj188' alt='avatar'
                    className='img' />
            </div>
            <div className='profile__info'>
                <h1>Nidhal 35</h1>
            </div>
            <div className='profile__options'>
                <div className='level1'>
                    <div className='setting'>
                        <IconButton>
                            <i className="fa-solid fa-gear setting_icon"></i>
                        </IconButton>
                        <h3>Setting</h3>
                    </div>
                    <div className='add__photo'>
                        <IconButton>
                            <i className="fa-regular fa-images photo_icon"></i>
                        </IconButton>
                        <h3>Add Photos</h3>
                    </div>
                </div>
                <div className='level2'>
                    <div className='edit__profile'>
                        <IconButton>
                            <i className="fa-solid fa-user-pen edit_icon"></i>
                        </IconButton>
                        <h3>Edit Profile</h3>
                    </div>
                </div>


            </div>
        </div>
    );
}

export default Profile;