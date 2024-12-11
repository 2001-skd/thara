import React from "react";
// import bg_waves from "../../assets/images/bg_patter.png";
import { Typography, Chip, Button } from "@material-tailwind/react";
import { allAssets } from "../../../public/assets/assets";
import { Link } from "react-router-dom";
import { ImSpoonKnife } from "react-icons/im";

const CateringAvailable = () => {
  return (
    <section className="flex items-center flex-col md:flex-row px-4 py-8 gap-4 bg-diagonalBg">
      <div className="left_side w-full md:w-1/2 flex gap-5 flex-col">
        <Chip
          size="sm"
          value="Catering"
          className="font-font-primary w-24 text-center bg-secondary text-white"
        />
        <Typography variant="h3" className="font-font-primary text-white">
          We also offer professional catering services for all occasions.
        </Typography>
        <Typography className="font-font-primary text-white text-xl">
          At Thara's Takeaway, we proudly offer tailored catering services for
          any event, from intimate gatherings to grand celebrations, so book
          with us today and let us make your occasion unforgettable before we're
          fully booked!
          <br></br>
          <br></br>
          You Can Book Us Through Phone Call or Whatsapp.
        </Typography>
        <div className="flex items-center gap-4 flex-col md:flex-row">
          <Link to="/contact">
            <Button className="flex items-center gap-4 font-font-primary w-64 justify-center bg-white text-secondary">
              Book Now{" "}
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
        <img
          src={allAssets.chef}
          alt="about_us_img"
          className="bg-custom_gradient_one rounded-full"
        />
      </div>
    </section>
  );
};

export default CateringAvailable;
