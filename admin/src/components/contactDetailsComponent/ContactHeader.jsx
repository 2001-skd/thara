import React from "react";
import { Typography, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const ContactHeader = () => {
  return (
    <div className="top_part flex items-center justify-between">
      <div className="header_text relative w-1/2">
        <Typography className="font-font-primary text-primary text-xl font-extrabold">
          Contact Details
        </Typography>
        <div className="absolute w-10 h-[2px] bg-primary left-40 top-[50%]"></div>
      </div>
    </div>
  );
};

export default ContactHeader;
