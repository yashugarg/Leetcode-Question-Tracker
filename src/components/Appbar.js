import React from 'react'
import './../stylesheets/Navigation.css'


function Appbar({ title, isDrawerOpen, toggleDrawer }) {
    return (
        <div className='appbar'>
            <button className='drawer-icon' onClick={toggleDrawer}>{isDrawerOpen ? 'Close' : 'Open'}</button>
            <div className='appbar-title'>{title}</div>
            <>Login</>
        </div>
    )
}

export default Appbar
