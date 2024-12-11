import React from "react";
import Layout from "../components/Layout";
import CartTable from "../components/cart_page_component/CartTable";
import OtherPageBanner from "../components/OtherPageBanner";

const Cart = () => {
  return (
    <Layout>
      <OtherPageBanner>Cart</OtherPageBanner>;
      <CartTable />
    </Layout>
  );
};

export default Cart;
