import React, { useState, useEffect } from 'react'
import TinderCard from 'react-tinder-card'
import './tindercards.css'
import instance from '../../axios'

function TinderCards() {

    const [people, setPeople] = useState([])

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


    const swiped = (direction, IdToDelete) => {
        if (direction === 'right') {
            console.log('liked ' + IdToDelete)
            setPeople(people.filter(person => person._id !== IdToDelete))

        }
        else if (direction === 'left') {
            console.log('removed ' + IdToDelete)
            setPeople(people.filter(person => person._id !== IdToDelete))
        }

        // direction === 'right' ? console.log('liked' + nameToDelete) : console.log('nope ' + nameToDelete)
        // setPeople(people.filter(person => person.name !== nameToDelete))
        // console.log(people);

    }

    const outOfFrame = (id) => {
        console.log(id + ' left the screen!')
    }





    return (
        <div className='tinderCards'>

            <div className='tinderCards__cardContainer'
            >
                {
                    people.map(person => (
                        <TinderCard
                            className='swipe'
                            key={person._id}
                            preventSwipe={['up', 'down']}
                            onSwipe={(dir) => swiped(dir, person._id)}
                            onCardLeftScreen={() => outOfFrame(person._id)}
                        >
                            <div
                                style={{ backgroundImage: `url(${person.Image})` }}
                                className='card'
                            >
                                <h3>{person.firstName}</h3>
                            </div>
                        </TinderCard>
                    ))
                }
            </div>
        </div>
    )
}

export default TinderCards