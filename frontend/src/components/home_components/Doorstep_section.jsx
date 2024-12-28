import React from "react";
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
          Get Your Order Right At Your Doorsteps
        </Typography>
        <Typography className="font-font-primary text-white text-xl">
          Simply place your order online, and our team will take care of the
          rest – packing your food securely and delivering it promptly to your
          doorstep. Enjoy an authentic, flavorful experience with Tharas
          Takeaway!
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
