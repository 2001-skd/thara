import React, { useContext } from "react";
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
  Badge,
} from "@material-tailwind/react";
import { allAssets } from "../../public/assets/assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaWhatsappSquare } from "react-icons/fa";
import { BiSolidCart } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { cartContext } from "../context-reducer/Context";

export default function Header() {
  const token = localStorage.getItem("token");
  const [openNav, setOpenNav] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { cartState } = useContext(cartContext);
  const navigate = useNavigate(); // Hook for navigation
  const loaction = useLocation();

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const profileMenuItems = [
    {
      label: "Go To Dashboard",
      link: "/user_dashboard", // Add the dashboard link here
    },
    {
      label: "Sign Out",
      action: "logout", // Indicate this item is for logout
    },
  ];

  // Logout function to clear the token and redirect to login
  const logout = () => {
    localStorage.removeItem("token"); // Remove the token
    navigate("/"); // Redirect to login page
  };

  const navItems = [
    {
      link: "/",
      title: "Home",
    },
    {
      link: "/menu",
      title: "Menu",
    },
    {
      link: "/contact",
      title: "Contact Us",
    },
    {
      link: "/about",
      title: "About Us",
    },
    {
      link: "/catering",
      title: "Catering",
    },
  ];

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {navItems.map(({ link, title }) => (
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className={`p-1 font-semibold font-font-primary ${
            location.pathname === link
              ? "text-secondary underline underline-offset-4"
              : "text-primary"
          }`}
          key={link} // Add key for list rendering
        >
          <Link to={link}>{title}</Link>
        </Typography>
      ))}
    </ul>
  );

  return (
    <Navbar className="sticky top-0 z-30 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-2 shadow-none bg-[whitesmoke]">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Link to="/">
          <div className="logo flex items-center md:flex-row gap-3">
            <img
              src={allAssets.headerLogo}
              alt="header logo"
              className="h-20 w-20 object-cover"
            />
            <Typography className="font-font-primary text-primary md:text-2xl font-bold">
              Tharas Takeaway
            </Typography>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <div className="mr-4 hidden lg:block">{navList}</div>
          <div className="flex items-center justify-center gap-4">
            {/* cart icon starts */}
            <Link to="/cart">
              <Badge
                content={cartState.length}
                className="font-font-primary text-bold text-white text-xl"
                size="sm"
              >
                <IconButton className="lg:inline-block bg-primary">
                  <BiSolidCart className="w-4 h-4" />
                </IconButton>
              </Badge>
            </Link>
            {/* cart icon ends */}
            {token ? (
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
                    <Badge
                      placement="top-end"
                      overlap="circular"
                      color="green"
                      withBorder
                    >
                      {" "}
                      <Avatar
                        variant="circular"
                        size="md"
                        alt="tania andrew"
                        withBorder={true}
                        color="blue-gray"
                        className=" p-0.5"
                        src={allAssets.activeUser}
                      />
                    </Badge>
                  </Button>
                </MenuHandler>
                <MenuList className="p-1">
                  {profileMenuItems.map(({ label, link, action }, key) => {
                    const isLogout = action === "logout";
                    return (
                      <MenuItem
                        key={label}
                        onClick={isLogout ? logout : undefined} // Call logout on Sign Out click
                        className={`flex items-center gap-2 rounded ${
                          isLogout
                            ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                            : ""
                        }`}
                      >
                        <FaUserCircle className="h-4 w-4" />
                        {link ? (
                          <Link to={link} className="w-full">
                            <Typography
                              as="span"
                              variant="small"
                              className="font-normal font-font-primary"
                            >
                              {label}
                            </Typography>
                          </Link>
                        ) : (
                          <Typography
                            as="span"
                            variant="small"
                            className="font-normal font-font-primary"
                            color={isLogout ? "red" : "inherit"}
                          >
                            {label}
                          </Typography>
                        )}
                      </MenuItem>
                    );
                  })}
                </MenuList>
              </Menu>
            ) : (
              <Link to="/login">
                <IconButton className="lg:inline-block bg-primary" size="sm">
                  <FaUserCircle className="w-4 h-4" />
                </IconButton>
              </Link>
            )}
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
