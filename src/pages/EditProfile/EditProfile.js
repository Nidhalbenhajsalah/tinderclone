import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import { IconButton } from '@material-ui/core';

import './EditProfile.css'

export const EditProfile = ({ handleShowEditProfile, dbUser }) => {

    const firstName = dbUser ? dbUser.firstName : '';
    const lastName = dbUser ? dbUser.lastName : '';
    const googleId = dbUser ? dbUser.googleId : '';

    const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState();
    const [photos, setPhotos] = useState([]);
    const [index, setIndex] = useState();





    const hiddenFileInput = useRef(null);

    const handleClick = e => {

        hiddenFileInput.current.click();
    }

    const handleId = e => {
        const id = e.target.id;
        setIndex(id);
        console.log(id);
    }

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        previewFile(file);

    }

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
            uploadImage(reader.result);
        }
    }

    // const handleSubmitFile = (e) => {
    //     e.preventDefault();
    //     if (!previewSource) return;
    //     uploadImage(previewSource)
    // }

    const uploadImage = async (base64EncodedImage) => {
        try {
            await axios.post(`http://localhost:8001/user/upload`, {
                data: base64EncodedImage,
                googleId: googleId,
                index: index

            });
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (e) => {
        try {
            await axios.post(`http://localhost:8001/user/deletePhoto`, {
                googleId: googleId,
                index: index
            });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        let isMounted = false;
        const getUserPhotos = async () => {
            try {
                const response = await axios.post(`http://localhost:8001/user/getPhotos`, {
                    googleId: googleId
                });
                if (isMounted) return
                setPhotos(response.data.photos);
                // console.log(response.data.photos[0]._id);
            } catch (error) {
                console.log(error);
            }
        }
        getUserPhotos();
        return () => {
            isMounted = true;
        }
    }, [googleId, photos, previewSource]);



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
                    {
                        photos?.map((photo, index) => (
                            <div className='photo_container'
                                key={photo._id}
                                style={{ backgroundImage: `url(${photo.url})` }}
                            >
                                {photo.url === '' ?
                                    <IconButton onClick={handleClick}>
                                        <i id={index} className="fa-solid fa-circle-plus add" onClick={handleId}></i>
                                    </IconButton>
                                    :
                                    <IconButton onClick={handleDelete}>
                                        <i id={index} className="fa-solid fa-circle-minus add" onClick={handleId}></i>
                                    </IconButton>
                                }
                            </div>
                        ))
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
                    <input id="add-photo" type='file' name='image'
                        onChange={handleFileInputChange}
                        value={fileInputState}
                        ref={hiddenFileInput}
                        style={{ display: 'none' }}
                    />
                </div>
            </div>
        </div>
    )
}
