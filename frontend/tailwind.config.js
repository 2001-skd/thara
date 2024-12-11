/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
import hh from "./src/assets/images/home_banner_1.png";

export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      "font-primary": ["Josefin Sans", "serif"],
    },
    colors: {
      primary: "#5e885a",
      secondary: "#33562e",
    },
    extend: {
      backgroundImage: {
        custom_gradient: "linear-gradient(115deg, #33562e, #5e885a)",
        custom_gradient_one: "linear-gradient(115deg, #f0f0f0, #b7a570)",
        diagonalBg: 'url("./src/images/diagonal_bg.png")',
        bg_image: 'url("./src/images/other_banner.jpg")',
        contact_bg_img: 'url("./src/images/contact_bg.jpg")',
        homeBannerOneImg: 'url("./src/images/home_banner_1.png")',
        homeBannerTwoImg: 'url("./src/images/home_banner_2.png")',
      },
    },
  },
  plugins: [],
});
