import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { SidebarData } from "./SidebarData";

import { IconContext } from "react-icons";

import "./../style/Navbar.css";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const navbarRef = useRef(null);

  const showSidebar = () => setSidebar(!sidebar);

  const handleClickOutside = (event) => {
    if (navbarRef.current && !navbarRef.current.contains(event.target)) {
      setSidebar(false);
    }
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
        <div className="navbar">
          {/* <Link to="/" className="navbar-title" onClick={hideSidebar}> */}
          <h1 className="navbar-title">MealsTracker</h1>
          {/* </Link> */}
          <Link to="#" className="menu-bars">
            <FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav
          ref={navbarRef}
          className={sidebar ? "nav-menu active" : "nav-menu"}
        >
          <ul className="nav-menu-items">
            <li className="navbar-toggle">
              <Link to="#" classname="menu-bars">
                <IoMdClose onClick={showSidebar} />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link onClick={showSidebar} to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </div>
  );
}

export default Navbar;
