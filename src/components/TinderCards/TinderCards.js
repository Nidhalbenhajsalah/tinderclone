import React, { useState, useEffect } from 'react'
import TinderCard from 'react-tinder-card'
import './tindercards.css'
import instance from '../../axios'

function TinderCards() {

    const [people, setPeople] = useState([])

    useEffect(() => {
        let isMounted = false;
        async function fetchData() {
            const res = await instance.get('/tinder/cards')
            if (isMounted) return
            setPeople(res.data)
        }
        fetchData()
        return () => {
            isMounted = true;
        }

    }, [])


    const swiped = (direction, nameToDelete) => {
        if (direction === 'right') {
            console.log('liked ' + nameToDelete)
            setPeople(people.filter(person => person.name !== nameToDelete))
        }
        else if (direction === 'left') {
            console.log('removed ' + nameToDelete)
            setPeople(people.filter(person => person.name !== nameToDelete))
        }
        console.log(people);
        return people;

        // direction === 'right' ? console.log('liked' + nameToDelete) : console.log('nope ' + nameToDelete)
        // setPeople(people.filter(person => person.name !== nameToDelete))
        // console.log(people);

    }

    const outOfFrame = (name) => {
        console.log(name + ' left the screen!')
    }



    return (
        <div className='tinderCards'>
            <div className='tinderCards__cardContainer'>
                {
                    people.map(person => (
                        <TinderCard
                            className='swipe'
                            key={person.name}
                            preventSwipe={['up', 'down']}
                            onSwipe={(dir) => swiped(dir, person.name)}
                            onCardLeftScreen={() => outOfFrame(person.name)}
                        >
                            <div
                                style={{ backgroundImage: `url(${person.imgUrl})` }}
                                className='card'
                            >
                                <h3>{person.name}</h3>
                            </div>
                        </TinderCard>
                    ))
                }
            </div>

        </div>
    )
}

export default TinderCards