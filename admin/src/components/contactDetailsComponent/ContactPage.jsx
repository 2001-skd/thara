import React from "react";

import ContactHeader from "./ContactHeader";
import ContactTable from "./ContactTable";

const ContactPage = () => {
  return (
    <section className="py-8 px-4">
      <ContactHeader />

      {/* table starts */}
      <ContactTable />
      {/* table ends */}
    </section>
  );
};

export default ContactPage;
