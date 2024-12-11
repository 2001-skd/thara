import React from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Avatar,
  MenuItem,
  MenuList,
  Menu,
  MenuHandler,
} from "@material-tailwind/react";
import { adminAssets } from "../assets/adminAssets";
import { Link, useNavigate } from "react-router-dom"; // Use `useNavigate` for redirection
import { FaUserCircle } from "react-icons/fa";

export default function Header() {
  const [openNav, setOpenNav] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const closeMenu = () => setIsMenuOpen(false);

  const profileMenuItems = [
    {
      label: "Sign Out",
      // You can add an icon here if needed (for example, PowerIcon)
    },
  ];

  // Logout function to clear the token and redirect to login
  const logout = () => {
    localStorage.removeItem("token"); // Remove the token
    navigate("/"); // Redirect to login page
  };

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navItems = [
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

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {navItems.map(({ link, title }) => (
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-semibold font-font-primary"
          key={title}
        >
          <Link
            to={link}
            className="flex items-center text-primary hover:text-secondary hover:underline underline-offset-4"
          >
            {title}
          </Link>
        </Typography>
      ))}
    </ul>
  );

  return (
    <Navbar className="sticky top-0 z-30 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-2 shadow-none bg-[whitesmoke]">
      <div className="flex items-center justify-between text-blue-gray-900">
        <div className="logo flex items-center md:flex-row">
          <img
            src={adminAssets.headerLogo}
            alt="header logo"
            className="h-20 w-20 object-cover"
          />
          <Typography className="font-font-primary text-primary md:text-xl font-bold">
            Thara's Takeaway
          </Typography>
        </div>
        <div className="flex items-center gap-4">
          <div className="mr-4 hidden lg:block">{navList}</div>
          <div className="flex items-center gap-x-4">
            <Menu
              open={isMenuOpen}
              handler={setIsMenuOpen}
              placement="bottom-end"
            >
              <MenuHandler>
                <Button
                  variant="text"
                  color="blue-gray"
                  className="flex items-center rounded-full p-0"
                >
                  <Avatar
                    variant="circular"
                    size="md"
                    alt="tania andrew"
                    withBorder={true}
                    color="blue-gray"
                    className=" p-0.5"
                    src={adminAssets.headerLogo}
                  />
                </Button>
              </MenuHandler>
              <MenuList className="p-1">
                {profileMenuItems.map(({ label }, key) => {
                  const isLastItem = key === profileMenuItems.length - 1;
                  return (
                    <MenuItem
                      key={label}
                      onClick={logout} // Call logout on Sign Out click
                      className={`flex items-center gap-2 rounded ${
                        isLastItem
                          ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                          : ""
                      }`}
                    >
                      <FaUserCircle className="h-4 w-4" />
                      <Typography
                        as="span"
                        variant="small"
                        className="font-normal font-font-primary"
                        color={isLastItem ? "red" : "inherit"}
                      >
                        {label}
                      </Typography>
                    </MenuItem>
                  );
                })}
              </MenuList>
            </Menu>
          </div>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
      </div>
      <MobileNav open={openNav}>{navList}</MobileNav>
    </Navbar>
  );
}
