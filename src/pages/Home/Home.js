
import React, { useState, useEffect } from 'react'
import Header from '../../components/Header/Header'
import TinderCards from '../../components/TinderCards/TinderCards'
import SwipeButtons from '../../components/Swipe-buttons/SwipeButtons'
import instance from '../../axios'


const Home = ({ user }) => {

    const [people, setPeople] = useState()
    const [liked, setLiked] = useState()
    const [removed, setRemoved] = useState()
    console.log('liked state', liked);
    console.log('removed state', removed);
    const userId = user?._id;

    useEffect(() => {
        let isMounted = false;
        async function fetchData() {
            const res = await instance.get('user/findAll')
            if (isMounted) return
            setPeople(res.data)
        }
        fetchData()
        return () => {
            isMounted = true;
        }
    }, [])

    useEffect(() => {
        let isMounted = false;
        const postliked = async () => {
            const res = await instance.post('user/like', {
                userId: userId,
                likedUsers: liked,
                dislikedUsers: removed
            })
        }
        if (isMounted) return
        postliked()
        return () => {
            isMounted = true;
        }

    }, [liked, removed, userId])


    const swiped = (direction, IdToDelete) => {
        if (direction === 'right') {
            setLiked((prevState) => (
                {
                    ...prevState,
                    [IdToDelete]: IdToDelete
                }
            )
            );


        }
        else if (direction === 'left') {
            setRemoved(
                (prevState) => (
                    {
                        ...prevState,
                        [IdToDelete]: IdToDelete
                    }
                )
            );
        }
    }

    const outOfFrame = (id) => {
        console.log(id + ' left the screen!')
    }

    const handleLikeButton = (IdToDelete) => {
        swiped('right', IdToDelete)
    }

    const handleDislikeButton = (IdToDelete) => {
        swiped('left', IdToDelete)
    }

    return (
        <div>
            <Header />
            <TinderCards people={people} swiped={swiped} outOfFrame={outOfFrame} user={user} />
            <SwipeButtons people={people} swiped={swiped} outOfFrame={outOfFrame} handleLikeButton={handleLikeButton} handleDislikeButton={handleDislikeButton} />
        </div >
    )
}

export default Home