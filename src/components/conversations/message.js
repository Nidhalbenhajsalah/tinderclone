import React, { useEffect, useState } from "react";
import moment from 'moment';
import instance from '../../axios'



import './message.css'

const Message = ({ message, own, setShowMatchProfile, showMatchProfile, setMatchId }) => {
    const [senderObj, setSenderObj] = useState(null);

    const [bool, setBool] = useState();


    useEffect(() => {
        const getSenderObj = async () => {
            const response = await instance.post(`/user/findByUserId`, {
                userId: message.senderId
            });

            setSenderObj(response.data.user);
            //Check if user has at least one photo uploaded
            setBool(response.data.user.photos.filter(photo => photo.url !== '').length > 0);
        }
        getSenderObj();

    }, [])

    const handleAvatarClick = () => {
        setShowMatchProfile(!showMatchProfile);
        setMatchId(message.senderId);
    }



    return (
        <div className={own ? "messageown" : "message"}>
            <div className='message_top'>
                {bool ?
                    <img
                        className='message_image'
                        src={senderObj?.photos.filter(photo => photo.url !== '')[0].url}
                        alt="user"
                        onClick={handleAvatarClick}
                    />
                    :
                    <img
                        className='message_image'
                        src={senderObj?.Image}
                        alt='user'
                        onClick={handleAvatarClick}
                    />
                }
                <p className="message_text">
                    {message.text}
                </p>
            </div>
            <div className='message_time'>
                {moment(message.createdAt).fromNow()}
            </div>
        </div>
    )
}

export default Message