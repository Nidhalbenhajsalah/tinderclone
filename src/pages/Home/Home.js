import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import TinderCards from '../../components/TinderCards/TinderCards'
import SwipeButtons from '../../components/Swipe-buttons/SwipeButtons'
import axios from 'axios';


const Home = ({ id }) => {





    return (
        <div>
            <Header />
            <TinderCards />
            <SwipeButtons />
        </div >
    )
}

export default Home