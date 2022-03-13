import React from "react";



import './message.css'

const Message = ({ message, own }) => {
    return (
        <div className={own ? "messageown" : "message"}>
            <div className='message_top'>
                <img
                    className='message_image'
                    src="https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                    alt="user"
                />
                <p className="message_text">
                    {message.text}
                </p>
            </div>
            <div className='message_time'>
                {message.createdAt}
            </div>
        </div>
    )
}

export default Message