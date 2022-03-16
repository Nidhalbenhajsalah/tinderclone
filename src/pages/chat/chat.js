import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import Message from '../../components/conversations/message';
import Match from '../../components/matches/match';
import { io } from 'socket.io-client'
import './chat.css'


const Chat = ({ user }) => {

    //main id of current user
    const userId = user?._id;

    const [matches, setMatches] = useState([]);
    const [currentMatch, setCurrentMatch] = useState(null);
    const [messages, setMessages] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);

    const conversationId = currentMatch?._id;

    const socket = useRef();

    useEffect(() => {
        socket.current = io(`http://localhost:8900`);
        socket.current.on("getMessage", data => {
            setArrivalMessage({
                senderId: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            });
        })

    }, [])

    useEffect(() => {
        arrivalMessage && currentMatch?.members.includes(arrivalMessage.senderId) && setMessages(prev => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentMatch])


    useEffect(() => {
        socket.current.emit('addUser', user?._id);
        socket.current.on('getUsers', users => {
            setOnlineUsers(users);
        })
    }, [user])



    useEffect(() => {
        let isMounted = false;
        const getMatches = async () => {
            const response = await axios.post(`https://nidhal-tinder-backend.herokuapp.com/chat/getAllconversations`, {
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
            const response = await axios.post(`https://nidhal-tinder-backend.herokuapp.com/chat/getAllMessages`, {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            senderId: user?._id,
            text: newMessage,
            conversationId: currentMatch?._id
        }

        const receiverId = currentMatch?.members.find(
            member => member !== user._id
        )

        socket.current.emit('sendMessage', {
            senderId: user._id,
            receiverId: receiverId,
            text: newMessage,
        })
        try {
            const response = await axios.post(`https://nidhal-tinder-backend.herokuapp.com/chat/createMessage`, message)
            setMessages([...messages, response.data]);
            setNewMessage('');
        } catch (error) {
            console.log(error);
        }

    }







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
                        {matches?.map(match => (
                            <div onClick={() => setCurrentMatch(match)}>
                                <Match key={match._id} match={match} userId={userId} onlineUsers={onlineUsers} />
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
                                        <div key={message._id} >
                                            <Message message={message} own={message.senderId === user._id} userId={userId} />
                                        </div>
                                    ))}
                                </div>
                                <div className='conversation-bottom'>
                                    <textarea
                                        className='chat_textarea'
                                        placeholder='Type a message...'
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                    >
                                    </textarea>
                                    <div className='chat_send'>
                                        <IconButton className='icon_send' onClick={handleSubmit}>
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