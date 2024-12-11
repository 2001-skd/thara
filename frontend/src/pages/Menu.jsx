import React from "react";
import Layout from "../components/Layout";
import OtherPageBanner from "../components/OtherPageBanner";
import FoodMenu from "../components/menu_page_components/FoodMenu";
import { ToastContainer, toast, Slide } from "react-toastify";

const Menu = () => {
  return (
    <Layout>
      <ToastContainer />
      <OtherPageBanner>Menu</OtherPageBanner>
      <FoodMenu />
    </Layout>
  );
};

export default Menu;
