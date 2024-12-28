import { Typography, Button } from "@material-tailwind/react";
import React from "react";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { ImSpoonKnife } from "react-icons/im";
import { Link } from "react-router-dom";

const HomeBanner = () => {
  return (
    <section className="w-full md:h-screen bg-homeBannerOneImg bg-cover md:bg-top bg-center bg-no-repeat p-5 md:p-0 bg-primary flex items-center justify-center">
      <div className="bannertext flex items-center justify-center flex-col gap-5">
        <div className="text-7xl bg-custom_gradient_one p-5 rounded-full text-primary">
          <GiForkKnifeSpoon />
        </div>
        <Typography className="text-5xl !text-white font-font-primary font-bold text-wrap">
          Craving Sri Lankan and South Indian?
        </Typography>
        <Typography className="text-2xl text-wrap !text-white font-bold font-font-primary">
          We deliver authentic flavors to your door!
        </Typography>
        <Link to="/menu">
          <Button className="flex items-center gap-4 font-font-primary w-64 justify-center bg-white text-secondary">
            Explore Menu{" "}
            <span className="text-xl">
              <ImSpoonKnife />
            </span>
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default HomeBanner;
