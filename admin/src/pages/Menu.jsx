import React from "react";
import Layout from "../components/Layout";
import MenuPage from "../components/menuListComponents/MenuPage";
import { ToastContainer, toast, Slide } from "react-toastify";

const Menu = () => {
  return (
    <Layout>
      <ToastContainer />
      <MenuPage />
    </Layout>
  );
};

export default Menu;
