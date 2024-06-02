import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { SidebarData } from "./SidebarData";

import { IconContext } from "react-icons";

import { useNavigate } from 'react-router-dom';


function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const navbarRef = useRef(null);

  const showSidebar = () => setSidebar(!sidebar);

  const handleClickOutside = (event) => {
    if (navbarRef.current && !navbarRef.current.contains(event.target)) {
      setSidebar(false);
    }
  };
  
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setSidebar(false);
    navigate('/login'); 
  };


  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <IconContext.Provider value={{ color: "white" }}>
        <div className="h-20 flex items-center bg-navy-800">
            <h1 className="m-0 grow ml-20 text-4xl font-medium text-center">
              <Link to="/" onClick={() => setSidebar(false)}>
                MealsTracker
              </Link>
            </h1>
          <Link to="#" className="text-4xl mr-8 bg-transparent">
            <FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav
          ref={navbarRef}
          className={`bg-navy-900 h-full flex justify-center fixed top-0 right-0 z-10 transition-transform transform ${sidebar? "duration-500 translate-x-0" : " duration-200 translate-x-full"}`}
        >
          <ul className="w-full">
            <li className="bg-transparent p-4 flex justify-end items-center text-3xl">
              <Link to="#">
                <IoMdClose onClick={showSidebar} />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={"text-xl felx justify-start items-center p-1"}>
                  <Link onClick={showSidebar} to={item.path}>
                    <div className="flex items-center px-6 py-2 rounded hover:bg-blue-600">
                    {item.icon}
                    <span className="ml-4">{item.title}</span>
                    </div>
                  </Link>
                </li>
              );
            })}
            <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-red-600 rounded-full px-2" onClick={handleLogout}>Log Out</button>
          </ul>
        </nav>
      </IconContext.Provider>
    </div>
  );
}

export default Navbar;
