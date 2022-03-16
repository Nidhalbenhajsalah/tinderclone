import React from 'react'
import { Link } from 'react-router-dom'
import './setting.css'



const Setting = () => {

    const logout = () => {
        window.open('https://nidhal-tinder-backend.herokuapp.com/auth/logout', '_self');
    }

    return (
        <div className='setting_view'>
            <div className='profile__header'>
                <Link to="/profile">
                    <i className="fa-solid fa-chevron-left back"></i>
                </Link>
            </div>
            <div className='setting_view__container'>
                <div className='logout_button' onClick={logout}>
                    <i className="fa-solid fa-right-from-bracket logout_icon"></i>
                    <span>Logout</span>
                </div>
            </div>
        </div>
    )
}

export default Setting