import {
  Card,
  Typography,
  CardBody,
  CardHeader,
  IconButton,
  Chip,
  Button,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { FaCalendarCheck } from "react-icons/fa";
import { GoPackage } from "react-icons/go";
import { allAssets } from "../../../public/assets/assets";
import { Link } from "react-router-dom";

const OrderHistory = () => {
  const user = JSON.parse(localStorage.getItem("userDetails"));
  const [orderhistory, setOrderHistory] = useState([]);
  const imgHost = "https://tharastakeaway.com/backend/";

  // Fetching order details on component mount
  useEffect(() => {
    async function fetchOrderDetails() {
      try {
        const userId = user.id;

        const response = await fetch(
          `${
            import.meta.env.VITE_API_URL
          }order_history_user.php?user_id=${userId}`
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const responseData = await response.json();
        console.log("order history", responseData);
        setOrderHistory(responseData);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    }

    if (user.id) {
      fetchOrderDetails();
    }
  }, [user.id]);

  return (
    <section className="py-5 w-full">
      {/* order part starts */}
      {orderhistory.length > 0 ? (
        <div className="order_part grid md:grid-cols-3 gap-5">
          {orderhistory.map((value) => {
            // Formatting the date for each order
            const createdAt = value.created_at;
            const dateObject = new Date(createdAt);
            const formattedDate = !isNaN(dateObject)
              ? dateObject.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                })
              : "Invalid Date"; // Handle invalid date

            return (
              <Card
                key={value.id}
                className="w-full md:max-w-sm overflow-hidden"
              >
                <CardHeader
                  floated={false}
                  shadow={false}
                  color="transparent"
                  className="m-0 rounded-none"
                >
                  <img
                    src={`${imgHost}/${value.foodimg}`}
                    alt="briyani_img"
                    className="h-60 w-full object-cover"
                  />
                </CardHeader>
                <CardBody>
                  <div className="flex justify-between items-center w-full">
                    <Typography className="font-font-primary text-2xl font-bold text-black">
                      {value.food_name}
                    </Typography>
                    <Typography className="font-font-primary text-2xl font-bold text-primary">
                      £{value.food_price}
                    </Typography>
                  </div>
                </CardBody>

                <div className="price_list flex flex-col justify-between p-5 gap-5">
                  {/* Ordered Date */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <IconButton className="text-xl bg-primary">
                        <FaCalendarCheck />
                      </IconButton>
                      <Typography className="font-font-primary text-xl font-semibold text-primary">
                        Ordered Date
                      </Typography>
                    </div>
                    <Typography className="font-font-primary text-xl font-semibold text-secondary">
                      {formattedDate}
                    </Typography>
                  </div>

                  {/* Order Status */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <IconButton className="text-xl bg-primary">
                        <GoPackage />
                      </IconButton>
                      <Typography className="font-font-primary text-xl font-semibold text-primary">
                        Order Status
                      </Typography>
                    </div>
                    <Typography className="font-font-primary text-xl font-semibold text-secondary">
                      <Chip
                        variant="outlined"
                        value={value.cooking_status}
                        className="font-font-primary text-secondary"
                      />
                    </Typography>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="no_order_part">
          <Card className="flex items-center justify-center flex-col py-5 gap-5">
            <img
              src={allAssets.emptyCartPng}
              alt="emptyCart"
              className="w-20 h-20"
            />
            <Typography className="font-font-primary text-2xl font-bold text-primary text-center">
              Your basket is empty.
            </Typography>
            <Link to="/menu">
              <Button className="bg-primary text-white font-font-primary">
                Go To Menu
              </Button>
            </Link>
          </Card>
        </div>
      )}
      {/* order part ends */}
    </section>
  );
};

export default OrderHistory;
