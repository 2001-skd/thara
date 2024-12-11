import React from "react";
import bg_waves from "../../../public/assets/images/bg_patter.png";
import { Typography, Chip, Button } from "@material-tailwind/react";
import { allAssets } from "../../../public/assets/assets";
import { Link } from "react-router-dom";
import { ImSpoonKnife } from "react-icons/im";

const Doorstep_section = () => {
  return (
    <section className="flex items-center flex-col md:flex-row py-8 px-4 gap-4 bg-[url('../../assets/images/bg_patter.png')]">
      <div className="left_side w-full md:w-1/2 flex gap-5 flex-col">
        <Chip
          size="sm"
          value="Take Away"
          className="font-font-primary w-24 text-center bg-secondary text-white"
        />
        <Typography variant="h3" className="font-font-primary text-white">
          Get Your Order 24/7 Right At Your Doorsteps
        </Typography>
        <Typography className="font-font-primary text-white text-xl">
          Plant-based diets may offer an advantage over those that are not plant
          based with respect to prevention and management of diabetes. the
          adventist health studies found that vegetarians have approximately
          half the risk of developing diabetes
        </Typography>
        <div className="flex items-center gap-4 flex-col md:flex-row">
          <Link to="/menu">
            <Button className="flex items-center gap-4 font-font-primary w-64 justify-center bg-white text-secondary">
              Order Now{" "}
              <span className="text-xl">
                <ImSpoonKnife />
              </span>
            </Button>
          </Link>
          <Link to="/">
            <Button className="flex items-center gap-4 font-font-primary w-64 justify-center bg-white text-secondary">
              Order On Whatsapp{" "}
              <span className="text-xl">
                <ImSpoonKnife />
              </span>
            </Button>
          </Link>
        </div>
      </div>

      <div className="right_side w-full md:w-1/2">
        <img src={allAssets.onlineDelivery} alt="about_us_img" />
      </div>
    </section>
  );
};

export default Doorstep_section;
