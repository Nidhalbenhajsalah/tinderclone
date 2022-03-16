import React from 'react'
import { IconButton } from '@material-ui/core';
import instance from '../../axios'

const PhotoDelete = ({ googleId, index }) => {

    const handleDelete = async () => {
        try {
            await instance.post(`/user/deletePhoto`, {
                googleId: googleId,
                index: index
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <IconButton onClick={handleDelete}>
            <div >
                <i className="fa-solid fa-circle-minus add" ></i>
            </div>
        </IconButton>
    )
}
export default PhotoDelete