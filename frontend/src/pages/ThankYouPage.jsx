import React, { useContext } from "react";
import Layout from "../components/Layout";
import OtherPageBanner from "../components/OtherPageBanner";
import { Typography } from "@material-tailwind/react";

const ThankYouPage = () => {
  return (
    <Layout>
      <section className="bg-diagonalBg px-4 py-8 w-full h-screen flex items-center justify-center flex-col gap-5">
        <Typography className="font-font-primary text-white md:text-7xl text-3xl font-bold tracking-widest">
          Thank You
        </Typography>
        <Typography className="font-font-primary text-white text-xl font-bold">
          Your Order has been Placed
        </Typography>
        <Typography className="font-font-primary text-white text-xl font-bold">
          We Will Process Your Order Shortly
        </Typography>
      </section>
    </Layout>
  );
};

export default ThankYouPage;
