import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from 'moment';



import './message.css'

const Message = ({ message, own }) => {
    const [senderObj, setSenderObj] = useState(null);

    useEffect(() => {
        const getSenderObj = async () => {
            const response = await axios.post(`http://localhost:8001/user/findByUserId`, {
                userId: message.senderId
            });

            setSenderObj(response.data.user);
        }
        getSenderObj();

    }, [])


    return (
        <div className={own ? "messageown" : "message"}>
            <div className='message_top'>
                <img
                    className='message_image'
                    src={senderObj?.Image}
                    alt="user"
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