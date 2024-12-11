import React from "react";
import MenuHeader from "./MenuHeader";
import MenuList from "./MenuList";
import MenuPageTab from "./MenuPageTab";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MenuPage = () => {
  return (
    <section className="py-8 px-4">
      <ToastContainer />
      <MenuHeader />
      <MenuPageTab />
    </section>
  );
};

export default MenuPage;
