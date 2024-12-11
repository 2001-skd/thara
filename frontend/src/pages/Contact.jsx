import React from "react";
import Layout from "../components/Layout";
import Contact_form from "../components/contact_page_components/Contact_form";
import Contact_details from "../components/contact_page_components/Contact_details";
import OtherPageBanner from "../components/OtherPageBanner";
import { ToastContainer, toast } from "react-toastify";

const Contact = () => {
  return (
    <Layout>
      <OtherPageBanner>Contact Us</OtherPageBanner>
      <ToastContainer />
      <Contact_details />
      <Contact_form />
    </Layout>
  );
};

export default Contact;
