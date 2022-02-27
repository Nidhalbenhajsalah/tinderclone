import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
import './profile.css';




const Profile = ({ id }) => {

    const [dbUser, setDbUser] = useState(null);

    useEffect(() => {
        const getDbUser = async () => {
            const response = await axios.get(`http://localhost:8001/user/findById/${id}`);
            setDbUser(response.data);
        }
        getDbUser();
    }, [id])

    const firstName = dbUser ? dbUser.firstName : '';
    const image = dbUser ? dbUser.Image : '';




    return (
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
                        <h3>Setting</h3>
                    </div>
                    <div className='add__photo'>
                        <IconButton>
                            <i className="fa-regular fa-images icon"></i>
                        </IconButton>
                        <h3>Add Photos</h3>
                    </div>
                </div>
                <div className='level2'>
                    <div className='edit__profile'>
                        <IconButton>
                            <i className="fa-solid fa-user-pen edit__icon"></i>
                        </IconButton>
                        <h3>Edit Profile</h3>
                    </div>
                </div>


            </div>
        </div>
    );
}

export default Profile;