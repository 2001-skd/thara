import React from "react";
import UserHeader from "./UserHeader";
import UserPageList from "./UserPageList";

const UserPage = () => {
  return (
    <section className="py-8 px-4">
      <UserHeader />

      {/* table starts */}
      <UserPageList />
      {/* table ends */}
    </section>
  );
};

export default UserPage;
