import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './match.css';

function Match({ match, userId }) {

    const [crush, setCrush] = useState({});
    useEffect(() => {
        let isMounted = false;
        const matchId = match?.members.filter(member => member !== userId);
        const getMatch = async () => {
            const response = await axios.post('http://localhost:8001/user/findByUserId', { userId: matchId });
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
            <div className='online_badge'></div>
            <div className='match__info'>
                <span className='match_name'>{crush.firstName}</span>
            </div>
        </div>
    )
}

export default Match