import React from 'react'
import Header from '../../components/Header/Header'
import TinderCards from '../../components/TinderCards/TinderCards'
import SwipeButtons from '../../components/Swipe-buttons/SwipeButtons'

const Home = ({ user }) => {
    return (
        <div>
            <Header user={user} />
            <TinderCards />
            <SwipeButtons />
        </div>
    )
}

export default Home