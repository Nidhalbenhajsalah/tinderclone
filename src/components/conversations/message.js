import React, { useEffect, useState } from "react";
import moment from 'moment';
import instance from '../../axios'
import { Link } from "react-router-dom";



import './message.css'

const Message = ({ message, own, setShowMatchProfile, showMatchProfile, setMatchId }) => {
    const [senderObj, setSenderObj] = useState(null);

    useEffect(() => {
        const getSenderObj = async () => {
            const response = await instance.post(`/user/findByUserId`, {
                userId: message.senderId
            });

            setSenderObj(response.data.user);
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
                <img
                    className='message_image'
                    src={senderObj?.Image}
                    alt="user"
                    onClick={handleAvatarClick}
                />
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