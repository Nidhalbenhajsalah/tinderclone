
import React, { useEffect, useState } from "react";
import { IconButton } from '@material-ui/core';
import instance from '../../axios'
import './matchProfile.css'

const MatchProfile = ({ setShowMatchProfile, showMatchProfile, matchId }) => {

    const [match, setMatch] = useState(null);
    const [photos, setPhotos] = useState([]);
    const [index, setIndex] = useState(0)


    useEffect(() => {
        let isMounted = false;
        const getMatch = async () => {
            const response = await instance.post(`/match/getMatch`, {
                userId: matchId
            })
            if (isMounted) return
            setMatch(response.data.user);
            setPhotos(response.data.user.photos.filter(photo => photo.url !== ''))
        }
        getMatch()
        return () => {
            isMounted = true
        }

    }, [matchId])

    const incrementIndex = () => {
        index < photos.length - 1 ? setIndex(index + 1) : setIndex(0)
    }

    const decrementIndex = () => {
        index > 0 ? setIndex(index - 1) : setIndex(photos.length - 1)
    }

    return (
        <div className='profile_view'>
            <div className='profile__header'>
                <i className="fa-solid fa-chevron-left back"
                    onClick={() => setShowMatchProfile(!showMatchProfile)}
                ></i>
            </div>
            <div className='container'>
                <IconButton onClick={decrementIndex} >
                    <i className="fa-solid fa-circle-left left"></i>
                </IconButton>
                <div className='profile_view__main'>
                    {
                        photos.length > 0 &&

                        <div className='profile_view__main__photo'>

                            <img id='img' src={photos[index].url} alt='profile' />

                        </div>
                    }
                </div>
                <IconButton onClick={incrementIndex}>
                    <i className="fa-solid fa-circle-right right"></i>
                </IconButton>
            </div>
            <div className='profile_view_info'>
                <span className="match_infos">{match?.firstName}</span>
            </div>
        </div>
    )
}

export default MatchProfile