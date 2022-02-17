import React, { useState } from 'react'
import TinderCard from 'react-tinder-card'
import './tindercards.css'

function TinderCards() {

    const [people, setPeople] = useState([
        {
            name: 'Scarlett Johansson',
            url: 'https://citas.in/media/authors/scarlett-johansson.jpeg'
        },
        {
            name: 'Emma Stone',
            url: 'https://m.media-amazon.com/images/M/MV5BMjI4NjM1NDkyN15BMl5BanBnXkFtZTgwODgyNTY1MjE@._V1_.jpg'
        },
        {
            name: 'Jennifer Lawrence',
            url: 'https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTQzMjgyNDgwNjIxODIzNTU5/jennifer-lawrence_gettyimages-626382596jpg.jpg'
        }
    ])

    const swiped = (direction, nameToDelete) => {
        console.log('removing: ' + nameToDelete)
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
                                style={{ backgroundImage: `url(${person.url})` }}
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