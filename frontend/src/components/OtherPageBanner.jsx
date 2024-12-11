import { Typography } from "@material-tailwind/react";
import React from "react";

const OtherPageBanner = ({ children }) => {
  return (
    <section className="bg-bg_image w-full h-96 bg-cover bg-no-repeat relative flex items-center justify-center overflow-hidden">
      <Typography className="text-white font-bold md:text-8xl text-6xl font-font-primary opacity-100 z-10">
        {children}
      </Typography>

      <div className="black_overlay absolute top-0 left-0 w-full h-full bg-primary opacity-40 overflow-hidden"></div>
    </section>
  );
};

export default OtherPageBanner;
