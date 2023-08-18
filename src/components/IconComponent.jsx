import React from "react";
import { FcHighPriority } from "react-icons/fc";
import { BiFlag, BiHorizontalCenter } from "react-icons/bi";
import { AiOutlineWarning } from "react-icons/ai";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { LuSignalLow, LuSignalMedium, LuSignalHigh } from "react-icons/lu";

const IconComponentForPriority = ({ priority }) => {
  // Define the icons for different priority levels
  const iconsByPriority = {
    "0" : <BiDotsHorizontalRounded />, // no priority put doticons
    "1": <LuSignalLow/>, 
    "2": <LuSignalMedium/>,
    "3": <LuSignalHigh/>, 
    "4" : <FcHighPriority />,
  };

  return iconsByPriority[priority] || null;
};

export default IconComponentForPriority;