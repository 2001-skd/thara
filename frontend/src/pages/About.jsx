import React from "react";
import Layout from "../components/Layout";
import About_us_section from "../components/home_components/About_us_section";
import Why_choose_us from "../components/home_components/Why_choose_us";
import Doorstep_section from "../components/home_components/Doorstep_section";
import OtherPageBanner from "../components/OtherPageBanner";

const About = () => {
  return (
    <Layout>
      <OtherPageBanner>About Us </OtherPageBanner>
      <About_us_section />
      <Why_choose_us />
      <Doorstep_section />
    </Layout>
  );
};

export default About;
