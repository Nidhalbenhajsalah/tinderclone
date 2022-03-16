import React, { useState, useEffect } from 'react'
import './match.css';
import instance from '../../axios'

function Match({ match, userId, onlineUsers }) {

    const [crush, setCrush] = useState({});
    useEffect(() => {
        let isMounted = false;
        const matchId = match?.members.filter(member => member !== userId);
        const getMatch = async () => {
            const response = await instance.post('/user/findByUserId', { userId: matchId });
            if (isMounted) return
            setCrush(response.data.user);

        }
        getMatch();
        return () => {
            isMounted = true;
        }

    }, [match, userId]);



    return (
        <div className='match'>
            <div className='image_container'>
                <img className='match__image' src={crush.Image} alt='match' />
            </div>
            {onlineUsers.map(onlineUser =>
                onlineUser.userId === crush._id ?
                    <div className='online_badge'></div>
                    :
                    null
            )}
            <div className='match__info'>
                <span className='match_name'>{crush.firstName}</span>
            </div>
        </div>
    )
}

export default Match