import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
import './profile.css';
import { EditProfile } from '../EditProfile/EditProfile.js';




const Profile = ({ id }) => {

    const [dbUser, setDbUser] = useState(null);
    const [showEditProfile, setShowEditProfile] = useState(false);

    useEffect(() => {
        const getDbUser = async () => {
            const response = await axios.get(`http://localhost:8001/user/findById/${id}`);
            setDbUser(response.data);
        }
        getDbUser();
    }, [id])

    const firstName = dbUser ? dbUser.firstName : '';
    const image = dbUser ? dbUser.Image : '';


    const handleShowEditProfile = () => {
        setShowEditProfile(!showEditProfile);
    }

    return (
        !showEditProfile ?
            <div className='profile'>

                <div className='profile__header'>
                    <Link to='/'>
                        <i className="fa-solid fa-chevron-left back"></i>
                    </Link>
                </div>
                <div className='main_avatar'>
                    <img src={image} alt='avatar'
                        className='img' />
                    <div className='profile__info'>
                        <h1>{firstName}</h1>
                    </div>
                </div>
                <div className='profile__options'>
                    <div className='level1'>
                        <div className='setting'>
                            <IconButton>
                                <i className="fa-solid fa-gear icon"></i>
                            </IconButton>
                            <span>Setting</span>
                        </div>
                        <div className='add__photo'>
                            <IconButton onClick={handleShowEditProfile}>
                                <i className="fa-solid fa-user-pen icon"></i>
                            </IconButton>
                            <span>Edit Profile</span>
                        </div>
                    </div>
                </div>
            </div>
            :
            <EditProfile handleShowEditProfile={handleShowEditProfile} dbUser={dbUser} />

    );
}

export default Profile;