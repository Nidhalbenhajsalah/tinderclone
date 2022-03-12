import React, { useState, useRef } from 'react'
import { IconButton } from '@material-ui/core';
import axios from 'axios';
import './photoUpload.css'

const PhotoUpload = ({ googleId, index }) => {

    const [previewSource, setPreviewSource] = useState([]);

    const [fileInputState, setFileInputState] = useState('');
    const hiddenFileInput = useRef(null);

    const handleClick = () => {
        hiddenFileInput.current.click();
    }

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

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource([reader.result]);

            uploadImage(reader.result);
        }
    }

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        previewFile(file);

    }


    return (
        <div className='photo_container'
            style={{ backgroundImage: `url(${previewSource})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}
        >
            <IconButton onClick={handleClick}>
                <i className="fa-solid fa-circle-plus add" ></i>
            </IconButton>
            <div>
                <input id="add-photo" type='file' name='image'
                    onChange={handleFileInputChange}
                    value={fileInputState}
                    ref={hiddenFileInput}
                    style={{ display: 'none' }}
                />
            </div>
        </div>
    )
}

export default PhotoUpload