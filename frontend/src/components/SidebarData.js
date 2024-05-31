import React from "react";

import { FaChartSimple } from "react-icons/fa6";
import { FaHome, FaInfoCircle, FaUser } from "react-icons/fa";

export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <FaHome />,
  },

  {
    title: "Graph",
    path: "/graph",
    icon: <FaChartSimple />,
  },

  {
    title: "Info",
    path: "/info",
    icon: <FaInfoCircle />,
  },

  {
    title: "Profile",
    path: "/profile",
    icon: <FaUser />,
  },
];
