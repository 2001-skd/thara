import {
  Avatar,
  Badge,
  Button,
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import { ImSpoonKnife } from "react-icons/im";
import { Link } from "react-router-dom";

// import briyaniImg from "../../../public/assets/images/briynai_img.jpg";
// import cookingBiryaniImg from "../../../public/assets/images/biryani_cooking.jpg";
// import eatingBiryaniImg from "../../../public/assets/images/eating_biryani.jpg";
import { allAssets } from "../../../public/assets/assets";

const Why_choose_us = () => {
  const items = [
    {
      title: "Delicious & Freshly Cooked Food",
      img: allAssets.biryani_png,
      count: "#01",
    },
    {
      title: "Safety & Hygiene Assured",
      img: allAssets.hygiene_png,
      count: "#02",
    },
    {
      title: "Sustainable Packaging",
      img: allAssets.foodDelivry_png,
      count: "#03",
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
          Why We're the Best Choice
        </Typography>
      </div>

      <div className="center_part grid md:grid-cols-3 grid-cols-1 my-10 gap-5">
        {items.map(({ title, count, img, index }) => (
          <>
            <Badge
              content={count}
              className="font-font-primary bg-secondary text-white font-semibold"
            >
              <Card key={index} className="w-full">
                <CardBody className="flex items-center gap-5">
                  <img
                    src={img}
                    alt="biryani"
                    className="w-16 h-16 object-cover"
                  />
                  <Typography className="font-semibold font-font-primary text-xl text-primary">
                    {title}
                  </Typography>
                </CardBody>
              </Card>
            </Badge>
          </>
        ))}
      </div>
    </section>
  );
};

export default Why_choose_us;
