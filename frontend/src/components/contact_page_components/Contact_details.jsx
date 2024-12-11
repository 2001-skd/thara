import {
  Badge,
  Card,
  CardBody,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import { allAssets } from "../../../public/assets/assets";

const Contact_details = () => {
  return (
    <section className="py-8 px-4 bg-[whitesmoke]">
      <div className="contact_details_part grid md:grid-cols-3 gap-10">
        <Badge
          content="Call Us"
          className="font-font-primary bg-secondary w-280 px-5 py-2 left-[50%] -translate-x-[50%] -translate-y-[50%] font-bold text-xl tracking-widest border-2"
        >
          <Card className="bg-primary w-full">
            <CardBody className="flex items-center flex-col justify-center gap-4 my-5">
              <IconButton className="bg-[whitesmoke]">
                <img src={allAssets.phonePng} alt="phone png" />
              </IconButton>
              <Typography className="text-xl font-font-primary font-semibold text-white">
                <a href="tel:+91 123456789">+91 123456789</a>
              </Typography>
            </CardBody>
          </Card>
        </Badge>

        <Badge
          content="Email Us"
          className="font-font-primary bg-secondary w-280 px-5 py-2 left-[50%] -translate-x-[50%] -translate-y-[50%] font-bold text-xl tracking-widest border-2"
        >
          <Card className="bg-primary w-full">
            <CardBody className="flex items-center flex-col justify-center gap-4 my-5">
              <IconButton className="bg-[whitesmoke]">
                <img src={allAssets.emailPng} alt="phone png" />
              </IconButton>
              <Typography className="text-xl font-font-primary font-semibold text-white">
                <a href="mailto:test@gmail.com">test@gmail.com</a>
              </Typography>
            </CardBody>
          </Card>
        </Badge>

        <Badge
          content="Address"
          className="font-font-primary bg-secondary w-280 px-5 py-2 left-[50%] -translate-x-[50%] -translate-y-[50%] font-bold text-xl tracking-widest border-2"
        >
          <Card className="bg-primary w-full">
            <CardBody className="flex items-center flex-col justify-center gap-4 my-5">
              <IconButton className="bg-[whitesmoke]">
                <img src={allAssets.locationPng} alt="phone png" />
              </IconButton>
              <Typography className="text-xl font-font-primary font-semibold text-white text-center">
                7232 Broadway Suite 308, Jackson Heights, 11372, NY, United
                States
              </Typography>
            </CardBody>
          </Card>
        </Badge>
      </div>
    </section>
  );
};

export default Contact_details;
