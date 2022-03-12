import React from 'react'
import { Link } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import Message from '../../components/conversations/message';
import Match from '../../components/matches/match';
import './chat.css'


const Chat = () => {
    return (
        <>
            <div className='chat__header'>
                <Link to='/'>
                    <i className="fa-solid fa-chevron-left back"></i>
                </Link>
            </div>
            <div className='chat_view'>
                <div className='matches'>
                    <div className='matches_wrapper'>
                        <input placeholder='Seach for matches...' type='text' className='matches_input' />
                        <Match />
                        <Match />
                        <Match />
                        <Match />
                        <Match />
                        <Match />
                    </div>

                </div>
                <div className='conversation'>
                    <div className='conversation_wrapper'>
                        <div className='conversation_top'>
                            <Message />
                            <Message own={true} />
                            <Message />
                            <Message own={true} />
                            <Message />
                            <Message own={true} />
                            <Message />
                            <Message own={true} />
                            <Message />
                            <Message own={true} />
                            <Message />
                            <Message own={true} />

                        </div>
                        <div className='conversation-bottom'>
                            <textarea
                                className='chat_textarea'
                                placeholder='Type a message...'
                            >
                            </textarea>
                            <IconButton className='chat_send'>
                                <i className="fa-solid fa-paper-plane"></i>
                            </IconButton>
                        </div>

                    </div>

                </div>
            </div>


        </>
    )
}

export default Chat