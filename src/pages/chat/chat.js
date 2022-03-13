import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import Message from '../../components/conversations/message';
import Match from '../../components/matches/match';
import './chat.css'


const Chat = ({ user }) => {

    //main id of current user
    const userId = user?._id;

    const [matches, setMatches] = useState([]);
    const [currentMatch, setCurrentMatch] = useState(null);
    const [messages, setMessages] = useState(null);
    const conversationId = currentMatch?._id;


    useEffect(() => {
        let isMounted = false;
        const getMatches = async () => {
            const response = await axios.post(`http://localhost:8001/chat/getAllconversations`, {
                userId: userId
            });
            if (isMounted) return
            setMatches(response.data);
        }
        getMatches();
        return () => {
            isMounted = true;
        }
    }, [])

    useEffect(() => {
        let isMounted = false;
        const getMessages = async () => {
            const response = await axios.post(`http://localhost:8001/chat/getAllMessages`, {
                conversationId: conversationId
            });
            if (isMounted) return
            setMessages(response.data);
        }
        getMessages();
        return () => {
            isMounted = true;
        }

    }, [conversationId]);





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
                        {/* <input placeholder='Seach for matches...' type='text' className='matches_input' /> */}
                        {matches.map(match => (
                            <div onClick={() => setCurrentMatch(match)}>
                                <Match key={match._id} match={match} userId={userId} />
                            </div>
                        ))}

                    </div>

                </div>
                <div className='conversation'>
                    <div className='conversation_wrapper'>
                        {currentMatch ?
                            <>
                                <div className='conversation_top'>
                                    {messages?.map(message => (
                                        <Message message={message} own={message.senderId === userId} />

                                    ))}
                                </div>
                                <div className='conversation-bottom'>
                                    <textarea
                                        className='chat_textarea'
                                        placeholder='Type a message...'
                                    >
                                    </textarea>
                                    <div className='chat_send'>
                                        <IconButton className='icon_send' >
                                            <i className="fa-solid fa-paper-plane send"></i>
                                        </IconButton>
                                    </div>
                                </div>
                            </>
                            :
                            <span className='No_conversation_text'>Open a conversation</span>
                        }
                    </div>

                </div>
            </div>


        </>
    )
}

export default Chat