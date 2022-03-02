import React, { useState } from 'react'
import axios from 'axios';
import { IconButton } from '@material-ui/core';

import './EditProfile.css'

export const EditProfile = ({ handleShowEditProfile, dbUser }) => {

    const firstName = dbUser ? dbUser.firstName : '';
    const lastName = dbUser ? dbUser.lastName : '';
    const googleId = dbUser ? dbUser.googleId : '';

    const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState();

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        previewFile(file);
    }

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);

        }
    }

    const handleSubmitFile = (e) => {
        e.preventDefault();
        if (!previewSource) return;
        uploadImage(previewSource)
    }

    const uploadImage = async (base64EncodedImage) => {
        try {
            await axios.post(`http://localhost:8001/user/upload`, {
                data: base64EncodedImage,
                googleId: googleId

            });
        } catch (error) {
            console.log(error);
        }

    }

    console.log(googleId);
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
                <div className='photos'>
                    <div className='photo_container'>
                        <IconButton >
                            <i className="fa-solid fa-circle-plus add">
                            </i>
                        </IconButton>
                    </div>
                    <div className='photo_container'>
                        <IconButton>
                            <i className="fa-solid fa-circle-plus add"></i>
                        </IconButton>
                    </div>
                    <div className='photo_container'>
                        <IconButton>
                            <i className="fa-solid fa-circle-plus add"></i>
                        </IconButton>
                    </div>
                    <div className='photo_container'>
                        <IconButton>
                            <i className="fa-solid fa-circle-plus add"></i>
                        </IconButton>
                    </div>
                    <div className='photo_container'>
                        <IconButton>
                            <i className="fa-solid fa-circle-plus add"></i>
                        </IconButton>
                    </div>
                    <div className='photo_container'>
                        <IconButton>
                            <i className="fa-solid fa-circle-plus add"></i>
                        </IconButton>
                    </div>
                    <div className='photo_container'>
                        <IconButton>
                            <i className="fa-solid fa-circle-plus add"></i>
                        </IconButton>
                    </div>
                    <div className='photo_container'>
                        <IconButton>
                            <i className="fa-solid fa-circle-plus add"></i>
                        </IconButton>
                    </div>
                    <div className='photo_container'>
                        <IconButton>
                            <i className="fa-solid fa-circle-plus add"></i>
                        </IconButton>
                    </div>

                </div>
                <div>
                    {
                        previewSource && (
                            <img src={previewSource} alt='preview' />
                        )
                    }
                </div>
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
                <div>
                    <form onSubmit={handleSubmitFile}>
                        <input type='file' name='image' onChange={handleFileInputChange} value={fileInputState} ></input>
                        <button type='submit'>Upload</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
