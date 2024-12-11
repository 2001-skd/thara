import { Typography } from "@material-tailwind/react";
import { adminAssets } from "../assets/adminAssets";
import { Link } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();
  const footerItems = [
    {
      link: "/dashboard",
      title: "Dashboard",
    },
    {
      link: "/dashboard/orders",
      title: "Orders",
    },
    {
      link: "/dashboard/menu_list",
      title: "Menu List",
    },
    {
      link: "/dashboard/contact_details",
      title: "Contact Details",
    },
  ];
  return (
    <footer className="w-full bg-[whitesmoke] p-8">
      <div className="flex md:flex-row flex-col items-center justify-center gap-y-6 gap-x-12 text-center md:justify-between">
        <img src={adminAssets.headerLogo} alt="logo-ct" />
        <ul className="flex flex-col md:flex-row flex-wrap items-center gap-y-2 gap-x-8">
          {footerItems.map(({ link, title }) => (
            <Link to={link}>
              <li>
                <Typography className="font-normal transition-colors text-primary hover:text-secondary font-font-primary">
                  {title}
                </Typography>
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <hr className="my-8 border-blue-gray-50" />
      <Typography className="text-center font-normal font-font-primary text-primary">
        &copy; {currentYear} Thara's Takeaway
      </Typography>
    </footer>
  );
}

export default Footer;
