import React, { useState, useEffect } from 'react'
import TinderCard from 'react-tinder-card'
import './tindercards.css'
import instance from '../../axios'

function TinderCards({ people, swiped, outOfFrame, user }) {

    const userId = user?._id;

    return (
        <div className='tinderCards'>

            <div className='tinderCards__cardContainer'
            >
                {
                    people?.filter(person => person._id !== userId).map(person => (
                        <TinderCard
                            className='swipe'
                            key={person._id}
                            preventSwipe={['up', 'down']}
                            onSwipe={(dir) => swiped(dir, person._id)}
                            onCardLeftScreen={() => outOfFrame(person._id)}
                        >
                            {person.photos.filter(photo => photo.url !== '').length > 0 ?
                                <div
                                    style={{ backgroundImage: `url(${person.photos.filter(photo => photo.url !== '')[0].url})` }}
                                    className='card'
                                >
                                    <h3>{person.firstName}</h3>
                                </div>
                                :
                                <div
                                    style={{ backgroundImage: `url(${person.Image})` }}
                                    className='card'
                                >
                                    <h3>{person.firstName}</h3>
                                </div>

                            }
                        </TinderCard>
                    ))
                }
            </div>
        </div>
    )
}

export default TinderCards