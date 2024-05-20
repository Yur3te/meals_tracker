import React from "react";

import { FaChartSimple } from "react-icons/fa6";
import { FaHome, FaInfoCircle, FaUser } from "react-icons/fa";

export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <FaHome />,
    cName: "nav-text",
  },

  {
    title: "Graph",
    path: "/graph",
    icon: <FaChartSimple />,
    cName: "nav-text",
  },

  {
    title: "Info",
    path: "/info",
    icon: <FaInfoCircle />,
    cName: "nav-text",
  },

  {
    title: "Profile",
    path: "/profile",
    icon: <FaUser />,
    cName: "nav-text",
  },
];
