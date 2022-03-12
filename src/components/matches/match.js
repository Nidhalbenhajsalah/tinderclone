import React from 'react'
import './match.css'

function Match() {
    return (
        <div className='match'>
            <img className='match__image' src='https://images.unsplash.com/photo-1516117172878-fd2c41f4a759?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80' alt='match' />
            <span className='match_name'>Match Name</span>
        </div>
    )
}

export default Match