import React from "react";
import Layout from "../components/Layout";
import CateringAvailable from "../components/home_components/CateringAvailable";
import OtherPageBanner from "../components/OtherPageBanner";

const Catering = () => {
  return (
    <Layout>
      <OtherPageBanner>Catering</OtherPageBanner>
      <CateringAvailable />
    </Layout>
  );
};

export default Catering;
