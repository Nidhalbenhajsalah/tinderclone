import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import PhotoDelete from '../../components/photoDelete/photoDelete';
import PhotoUpload from '../../components/photoUpload/photoUpload';
import instance from '../../axios'

import './EditProfile.css'

export const EditProfile = ({ id }) => {
    const [dbUser, setDbUser] = useState(null);
    const firstName = dbUser ? dbUser.firstName : '';
    const lastName = dbUser ? dbUser.lastName : '';
    const googleId = id;


    const [photos, setPhotos] = useState([]);



    useEffect(() => {
        let isMounted = false;
        const getUserPhotos = async () => {
            try {
                const response = await instance.post(`/user/getPhotos`, {
                    googleId: googleId
                });
                if (isMounted) return
                setPhotos(response.data.photos);
                setDbUser(response.data.dbUser);
            } catch (error) {
                console.log(error);
            }
        }
        getUserPhotos();
        return () => {
            isMounted = true;
        }
    }, []);



    return (
        <div className='edit_profile'>
            <div className='profile__header'>
                <Link to='/profile'>
                    <i className="fa-solid fa-chevron-left back"></i>
                </Link>
            </div>
            <div className='body'>
                <div className='photos'>
                    {
                        photos?.map((photo, index) => (
                            <div className='photo_container'
                                key={photo._id}
                                style={{ backgroundImage: `url(${photo.url})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}
                            >
                                {photo.url === '' ?
                                    <PhotoUpload index={index} googleId={googleId} />
                                    :
                                    <PhotoDelete index={index} googleId={googleId} />
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
            </div>
        </div>
    )
}

export default EditProfile