import { Card, IconButton, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { FaUserCheck } from "react-icons/fa";
import { MdAddCall } from "react-icons/md";
import { MdMarkEmailRead } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";

const ProfileCard = () => {
  const user = JSON.parse(localStorage.getItem("userDetails"));
  console.log("user", user);
  const host = "http://localhost:5000";
  const [totalOrder, setTotalOrder] = useState(0);

  useEffect(() => {
    async function fetchOrderDetails() {
      try {
        // Assuming you have the userId available (from local storage, context, etc.)
        const userId = user.id; // Replace this with actual user ID logic

        const response = await fetch(
          `${host}/order/fetch-order-details?user_id=${userId}`
        );

        // Handle response status
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const responseData = await response.json();
        console.log("order history", responseData);
        setTotalOrder(responseData.length);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    }

    fetchOrderDetails();
  }, []);
  const userdetails = [
    {
      title: "Name",
      icon: <FaUserCheck />,
      value: user.name,
    },
    {
      title: "Email Id",
      icon: <MdMarkEmailRead />,
      value: user.email,
    },
    {
      title: "Mobile Number",
      icon: <MdAddCall />,
      value: user.usermobile,
    },
    {
      title: "Total Orders",
      icon: <FaCartShopping />,
      value: totalOrder,
    },
  ];

  return (
    <div className="py-5 w-full">
      <div className="user_details_part grid md:grid-cols-3 grid-cols-1 gap-5">
        {userdetails.map(({ title, icon, value }) => (
          <Card className="flex flex-row gap-5 items-center p-5 w-full">
            <IconButton className="bg-primary text-white text-2xl">
              {icon}
            </IconButton>
            <div className="">
              <Typography className="font-font-primary font-bold text-xl text-primary">
                {title}
              </Typography>
              <Typography className="font-font-primary text-black font-semibold">
                {value}
              </Typography>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProfileCard;
