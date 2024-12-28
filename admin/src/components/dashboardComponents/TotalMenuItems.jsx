import { Typography, Card } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TotalMenuItems = () => {
  const [menuItemCount, setMenuItemCount] = useState(0);

  useEffect(() => {
    async function handlefetchMenuItemCount() {
      const response = await fetch(
        "https://tharastakeaway.com/backend/api/get_menu_details_table.php"
      );
      const responseData = await response.json();
      // console.log(responseData.length);
      setMenuItemCount(responseData.length);
    }
    handlefetchMenuItemCount();
  }, []);
  return (
    <section className="grid grid-cols-1 gap-5">
      <Card className="max-w-sm h-32">
        <div className="header">
          <Typography className="text-center rounded-t-md  bg-primary text-white font-extrabold font-font-primary">
            Menu List Details
          </Typography>
        </div>
        <div className="p-5 flex items-center justify-between">
          <Typography className="font-font-primary font-extrabold text-primary">
            Total Menu Items
          </Typography>
          <Typography className="font-font-primary font-extrabold text-primary">
            {menuItemCount}
          </Typography>
        </div>
        <div className="pr-5 flex items-center justify-end">
          <Link
            to="menu_list"
            className="font-font-primary text-primary font-semibold hover:underline"
          >
            View More{"  >"}
          </Link>
        </div>
      </Card>
    </section>
  );
};

export default TotalMenuItems;
