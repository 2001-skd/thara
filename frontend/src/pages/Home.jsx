import React from "react";
import Layout from "../components/Layout";
import About_us_section from "../components/home_components/About_us_section";
import Doorstep_section from "../components/home_components/Doorstep_section";
import Why_choose_us from "../components/home_components/Why_choose_us";
import Explore_menu from "../components/home_components/Explore_menu";
import HomeBanner from "../components/home_components/HomeBanner";
import CateringAvailable from "../components/home_components/CateringAvailable";

const Home = () => {
  return (
    <>
      <Layout>
        <HomeBanner />
        <About_us_section />
        <Explore_menu />
        <CateringAvailable />
        <Why_choose_us />
        <Doorstep_section />
      </Layout>
    </>
  );
};

export default Home;
