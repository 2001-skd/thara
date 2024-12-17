import { IconButton, Tooltip, Typography } from "@material-tailwind/react";
import { allAssets } from "../../public/assets/assets";
import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";

const QUICKLINKS = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "About Us",
    link: "/about",
  },
  {
    title: "Menu",
    link: "/menu",
  },
  {
    title: "Contact Us",
    link: "/contact",
  },
  {
    title: "Login",
    link: "/login",
  },
  {
    title: "Catering",
    link: "/catering",
  },
];

const OTHERLINKS = [
  {
    title: "Menu",
    link: "/menu",
  },
  {
    title: "Create an Account",
    link: "/login",
  },
  {
    title: "Set New Password",
    link: "/set_new_password",
  },
  {
    title: "User Dashboard",
    link: "/user_dashboard",
  },
];

const OPENHOURS = [
  {
    day: "Monday",
    timing: "09:00 AM - 10:00 PM",
  },
  {
    day: "Tuesday",
    timing: "09:00 AM - 10:00 PM",
  },
  {
    day: "Wednesday",
    timing: "09:00 AM - 10:00 PM",
  },
  {
    day: "Thursday",
    timing: "09:00 AM - 10:00 PM",
  },
  {
    day: "Friday",
    timing: "09:00 AM - 10:00 PM",
  },
  {
    day: "Saturday",
    timing: "09:00 AM - 10:00 PM",
  },
  {
    day: "Sunday",
    timing: "09:00 AM - 10:00 PM",
  },
];

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="relative w-full border-t-2 border-t-primary bg-[whitesmoke]">
      <div className="mx-auto w-full max-w-7xl px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center md:items-start gap-5">
            <img src={allAssets.headerLogo} alt="footerLogo" />
            <div>
              <Typography className="font-font-primary text-primary text-center md:text-left">
                Tharas takeaway address will come
              </Typography>
              <Typography className="font-font-primary text-primary text-center md:text-left">
                <a href="#">1234567890</a>
              </Typography>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ul>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-3 font-medium opacity-80 font-font-primary text-secondary underline underline-offset-4"
              >
                Quick Links
              </Typography>
              {QUICKLINKS.map(({ title, link }, index) => (
                <li key={index} className="flex items-center gap-3">
                  <Link to={link}>
                    <Typography className="py-1.5 font-normal transition-colors text-primary hover:text-secondary hover:underline underline-offset-4 font-font-primary">
                      {title}
                    </Typography>
                  </Link>
                </li>
              ))}
            </ul>

            <ul>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-3 font-medium opacity-80 font-font-primary text-secondary underline underline-offset-4"
              >
                Other Links
              </Typography>
              {OTHERLINKS.map(({ title, link }, index) => (
                <li key={index} className="flex items-center gap-3">
                  <Link to={link}>
                    <Typography className="py-1.5 font-normal transition-colors text-primary hover:text-secondary hover:underline underline-offset-4 font-font-primary">
                      {title}
                    </Typography>
                  </Link>
                </li>
              ))}
            </ul>

            <ul>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-3 font-medium opacity-80 font-font-primary text-secondary underline underline-offset-4"
              >
                Opening Time
              </Typography>
              {OPENHOURS.map(({ day, timing }, index) => (
                <li key={index} className="flex items-center gap-3">
                  <Typography className="py-1.5 font-normal transition-colors text-primary hover:text-secondary hover:underline underline-offset-4 font-font-primary">
                    {day} : {timing}
                  </Typography>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-center border-t border-blue-gray-50 py-4 md:flex-row md:justify-between">
          <Typography
            variant="small"
            className="mb-4 text-center font-normal text-blue-gray-900 md:mb-0 font-font-primary"
          >
            &copy; {currentYear}{" "}
            <a href="#" className="font-font-primary">
              Tharas Takeaway
            </a>
            . All Rights Reserved.
          </Typography>

          <div className="flex gap-4 text-blue-gray-900 sm:justify-center">
            <Tooltip
              content="Facebook"
              className="bg-primary text-xl text-white font-font-primary"
            >
              <a href="#">
                <FaFacebook className="text-primary text-xl" />
              </a>
            </Tooltip>

            <Tooltip
              content="Instagram"
              className="bg-primary text-xl text-white font-font-primary"
            >
              <a href="#" className="text-primary text-xl">
                <FaInstagramSquare />
              </a>
            </Tooltip>

            <Tooltip
              content="Linkedin"
              className="bg-primary text-xl text-white font-font-primary"
            >
              <a href="#" className="text-primary text-xl">
                <FaLinkedin />
              </a>
            </Tooltip>

            <Tooltip
              content="Tik Tok"
              className="bg-primary text-xl text-white font-font-primary"
            >
              <a href="#" className="text-primary text-xl">
                <AiFillTikTok />
              </a>
            </Tooltip>
          </div>
        </div>
      </div>
    </footer>
  );
}
