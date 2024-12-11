import { Avatar, Badge, Button, Typography } from "@material-tailwind/react";
import React from "react";
import { ImSpoonKnife } from "react-icons/im";
import { Link } from "react-router-dom";

import briyaniImg from "../../../public/assets/images/briynai_img.jpg";
import cookingBiryaniImg from "../../../public/assets/images/biryani_cooking.jpg";
import eatingBiryaniImg from "../../../public/assets/images/eating_biryani.jpg";
import { allAssets } from "../../../public/assets/assets";

const About_us_section = () => {
  const items = [
    {
      title: "Order Your Meals At Thara's Takeaway",
      img: briyaniImg,
      count: "01",
    },
    {
      title: "We Bring You Freshly Prepared Dishes",
      img: cookingBiryaniImg,
      count: "02",
    },
    {
      title: "Enjoy and Come Back for More Anytime",
      img: eatingBiryaniImg,
      count: "03",
    },
  ];
  return (
    <section className="py-10 px-4 bg-custom_gradient">
      <div className="top_part flex items-center justify-between flex-1 gap-4 md:flex-row flex-col">
        <Typography
          variant="h1"
          className="font-font-primary text-white"
          textGradient
        >
          Enjoy the Taste of Home with Every Bite
        </Typography>

        <div className="flex gap-4 flex-col">
          <Typography
            className="font-font-primary text-white text-xl font-semibold"
            textGradient
          >
            A Harmonious Blend of Flavors and Aromas to Elevate Your Dining
            Experience
          </Typography>
          <Link to="/menu">
            <Button className="flex items-center gap-4 font-font-primary w-64 justify-center bg-white text-secondary">
              Explore All Menu{" "}
              <span className="text-xl">
                <ImSpoonKnife />
              </span>
            </Button>
          </Link>
        </div>
      </div>

      <div className="center_part flex items-center justify-center md:flex-row flex-col my-10 gap-4">
        {items.map(({ title, img, count }) => (
          <div className=" flex items-center gap-4">
            <Badge
              placement="top-end"
              overlap="circular"
              content={count}
              className="w-10 h-10 text-xl font-bold font-font-primary bg-primary border border-white"
            >
              <img
                src={img}
                alt="avatar"
                className="border border-white-500 w-36 h-36 rounded-full object-cover"
                key={count}
              />
            </Badge>
            <div>
              <Typography
                variant="h6"
                className="text-white text-xl font-bold font-font-primary"
              >
                {title}
              </Typography>
            </div>
          </div>
        ))}
      </div>

      <div className="bottom_part flex gap-4 flex-col md:flex-row">
        <img
          src={allAssets.aboutUsImg}
          alt="about_us_img"
          className="object-cover h-96 rounded-md"
        />
        <div className="flex gap-4 flex-col">
          <Typography variant="h3" className="font-font-primary text-white">
            Who We Are ?
          </Typography>
          <Typography className="font-font-primary text-white text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
            fugiat, in est ut tempora architecto totam odit porro molestiae,
            iste optio quaerat facere, excepturi natus quas dignissimos nobis
            error sunt mollitia! Velit dolore quia magni. Sit ex ullam adipisci
            quas!
            <br /> Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Doloribus fugiat, in est ut tempora architecto totam odit porro
            molestiae, iste optio quaerat facere, excepturi natus quas
            dignissimos nobis error sunt mollitia! Velit dolore quia magni. Sit
            ex ullam adipisci quas!
          </Typography>
          <Link to="/about">
            <Button className="flex items-center gap-4 font-font-primary w-64 justify-center bg-white text-secondary">
              View More{" "}
              <span className="text-xl">
                <ImSpoonKnife />
              </span>
            </Button>
          </Link>
        </div>
        <img
          src={allAssets.aboutUsImg}
          alt="about_us_img"
          className="object-cover h-96 rounded-md hidden md:block"
        />
      </div>
    </section>
  );
};

export default About_us_section;
