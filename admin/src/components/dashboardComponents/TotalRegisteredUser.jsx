import React, { useState, useEffect } from "react";
import { Typography, Card } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const TotalRegisteredUser = () => {
  const [totalRegisteredUser, setTotalRegisteredUser] = useState(0);

  async function handleUserDetailsCount() {
    try {
      const url = await fetch(
        "http://localhost/tharas_takeaway/backend/api/fetch_user_details.php"
      );
      const responseData = await url.json();
      // console.log("type of of response data", typeof responseData);
      //   console.log(userTableData);
      if (Array.isArray(responseData)) {
        setTotalRegisteredUser(responseData.length);
      } else {
        setTotalRegisteredUser(0);
      }
    } catch (err) {
      // console.log("error fetching details", err);
    }
  }

  useEffect(() => {
    handleUserDetailsCount();
  }, []);
  return (
    <section className="grid grid-cols-1 gap-5">
      <Card className="max-w-sm md:h-32 h-auto">
        <div className="header">
          <Typography className="text-center rounded-t-md  bg-primary text-white font-extrabold font-font-primary">
            User Details
          </Typography>
        </div>
        <div className="p-5 flex items-center justify-between">
          <Typography className="font-font-primary font-extrabold text-primary">
            Total Registered Users
          </Typography>
          <Typography className="font-font-primary font-extrabold text-primary">
            {totalRegisteredUser}
          </Typography>
        </div>
        <div className="pr-5 flex items-center justify-end">
          <Link
            to="user_details"
            className="font-font-primary text-primary font-semibold hover:underline"
          >
            View More{"  >"}
          </Link>
        </div>
      </Card>
    </section>
  );
};

export default TotalRegisteredUser;
