import React from 'react'
import { IconButton } from '@material-ui/core';

import './EditProfile.css'

export const EditProfile = ({ handleShowEditProfile, dbUser }) => {

    const firstName = dbUser ? dbUser.firstName : '';
    const lastName = dbUser ? dbUser.lastName : '';
    return (
        <div className='edit_profile'>
            <div className='header'>
                <div className='back'>
                    <i className="fa-solid fa-chevron-left back"
                        onClick={handleShowEditProfile}
                    ></i>
                </div>
                <div className='title'>
                    <span>Edit Profile</span>
                </div>
            </div>
            <div className='body'>
                <div className='field'>
                    <span className='field_title'>First Name </span>
                    <span className='item_text'>{firstName}</span>
                </div>
                <div className='field'>
                    <span className='field_title'>Last Name </span>
                    <span className='item_text'>{lastName}</span>
                </div>
                <div className='field'>
                    <span className='field_title'>Birthday </span>
                    <span className='item_text'>
                        27/09/1986
                    </span>
                </div>
            </div>
        </div>
    )
}
