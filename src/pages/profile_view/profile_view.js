import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { IconButton } from '@material-ui/core';
import './profile_view.css'
import instance from '../../axios'


const Profile_view = ({ id }) => {
    const [photos, setPhotos] = useState([])
    const [index, setIndex] = useState(0)

    const fetchPhotos = async () => {
        const response = await instance.post(`/user/getPhotos`, {
            googleId: id
        })
        setPhotos(response.data.photos.filter(photo => photo.url !== ''))

    }

    useEffect(() => {
        fetchPhotos()
    }, [id])

    const incrementIndex = () => {
        index < photos.length - 1 ? setIndex(index + 1) : setIndex(0)
    }

    const decrementIndex = () => {
        index > 0 ? setIndex(index - 1) : setIndex(photos.length - 1)
    }

    return (
        <div className='profile_view'>
            <div className='profile__header'>
                <Link to="/profile">
                    <i className="fa-solid fa-chevron-left back"></i>
                </Link>
            </div>
            <div className='container'>
                <IconButton onClick={decrementIndex} >
                    <i className="fa-solid fa-circle-left left"></i>
                </IconButton>
                <div className='profile_view__main'>
                    {
                        photos.length > 0 &&

                        <div className='profile_view__main__photo'>

                            <img id='img' src={photos[index].url} alt='profile' />

                        </div>
                    }
                </div>
                <IconButton onClick={incrementIndex}>
                    <i className="fa-solid fa-circle-right right"></i>
                </IconButton>
            </div>
        </div>
    )
}

export default Profile_view

