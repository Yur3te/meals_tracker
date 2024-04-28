import React from 'react'
import { Link } from 'react-router-dom'
import { FaBars } from "react-icons/fa6";

function Navbar() {
    return (
        <div>
            <div className="navbar">
                <Link to="#" className='menu-bars'>
                    <FaBars />
                    {/* 13:00 https://www.youtube.com/watch?v=CXa0f4-dWi4 */}
                </Link>
            </div>
        </div>
    )
}

export default Navbar
