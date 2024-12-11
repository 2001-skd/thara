import React from "react";
import { allAssets } from "../../public/assets/assets";

const Spinner = () => {
  return (
    <div>
      <Spinner>
        <img src={allAssets.headerLogo} alt="headerlogo" />
      </Spinner>
    </div>
  );
};

export default Spinner;
