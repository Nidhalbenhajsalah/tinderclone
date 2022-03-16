import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
import './profile.css';




const Profile = ({ id }) => {

    const [dbUser, setDbUser] = useState(null);

    useEffect(() => {
        let isMounted = false;
        const getDbUser = async () => {
            const response = await axios.post(`https://nidhal-tinder-backend.herokuapp.com/user/findById/`, {
                googleId: id
            });
            if (isMounted) return
            setDbUser(response.data);
        }
        getDbUser();
        return () => {
            isMounted = true;
        }
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
            <Link className='Link' to='/profile_view'>
                <div className='main_avatar'>

                    <img src={image} alt='avatar'
                        className='img' />

                    <div className='profile__info'>
                        <h1>{firstName}</h1>
                    </div>

                </div>
            </Link>
            <div className='profile__options'>
                <div className='level1'>
                    <Link className='Link' to='setting'>
                        <div className='setting'>
                            <IconButton>
                                <i className="fa-solid fa-gear icon"></i>
                            </IconButton>
                            <span>Setting</span>
                        </div>
                    </Link>
                    <Link className='Link' to='edit_profile'>
                        <div className='add__photo'>
                            <IconButton >
                                <i className="fa-solid fa-user-pen icon"></i>
                            </IconButton>
                            <span>Edit Profile</span>
                        </div>
                    </Link>
                </div>
            </div>
        </div>

    );
}

export default Profile;