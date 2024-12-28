import {
  Button,
  Card,
  CardBody,
  CardHeader,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { ImSpoonKnife } from "react-icons/im";
import { Link } from "react-router-dom";

// Skeleton loader component
const SkeletonLoader = () => {
  return (
    <div className="w-full p-4 animate-pulse">
      <div className="h-60 bg-gray-300 mb-4"></div>
      <div className="">
        <div className="h-8 bg-gray-300 mb-2"></div>
        <div className="h-8 bg-gray-300 mb-2"></div>
      </div>
      <div className="h-8 bg-gray-300 w-1/4 mb-2"></div>
      <div className="h-8 bg-gray-300 w-1/2 mb-2"></div>
    </div>
  );
};

const ExploreMenu = () => {
  const [foodMenu, setFoodMenu] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const imgHost = "https://tharastakeaway.com/backend/";

  // Fetching menu details based on category
  useEffect(() => {
    const fetchMenuDetails = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}fetch_details_based_on_category.php`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        // Group data by category
        const groupByCategory = data.reduce((acc, item) => {
          if (!acc[item.foodcategory]) {
            acc[item.foodcategory] = {
              categoryname: item.categoryname,
              categoryimg: item.categoryimg,
              menuitems: [],
            };
          }
          acc[item.foodcategory].menuitems.push({
            foodname: item.foodname,
            foodprice: item.foodprice,
          });
          return acc;
        }, {});

        // Log grouped categories to check the result
        // console.log(groupByCategory);

        // Set the grouped food menu
        setFoodMenu(Object.values(groupByCategory));
      } catch (err) {
        // console.log("Error while fetching menu based on category", err);
      } finally {
        setLoading(false); // Turn off loading once data is fetched or error occurs
      }
    };

    fetchMenuDetails();
  }, []);

  return (
    <section className="py-10 px-4 bg-custom_gradient">
      <div className="top_part flex items-center justify-between flex-1 gap-4 md:flex-row flex-col">
        <Typography variant="h1" className="font-font-primary text-white">
          Explore <span>Tharas Takeaway</span> Menu
        </Typography>

        <div className="flex gap-4 flex-col">
          <Typography className="font-font-primary text-white text-xl font-semibold">
            Order delicious food made with love and prepared with the highest
            standards of hygiene.
          </Typography>
          <Link to="/menu">
            <Button className="flex items-center gap-4 font-font-primary w-64 justify-center bg-white text-secondary">
              Explore Menu <ImSpoonKnife />
            </Button>
          </Link>
        </div>
      </div>

      <div className="menu-part my-10 grid md:grid-cols-4 grid-cols-1 gap-5">
        {/* Show loading skeleton while data is being fetched */}
        {loading ? (
          <>
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
          </>
        ) : (
          /* Show the menu when data is loaded */
          foodMenu.slice(0, 4).map((category, index) => (
            <Card className="w-full overflow-hidden" key={index}>
              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="m-0 rounded-none"
              >
                <img
                  src={`${imgHost}/${category.categoryimg}`}
                  alt={category.categoryname}
                  className="h-60 w-full object-cover"
                />
              </CardHeader>
              <CardBody className="md:h-[380px]">
                <div className="flex justify-between items-center">
                  <Typography className="font-font-primary text-2xl font-bold text-black flex-1">
                    {category.categoryname}
                  </Typography>
                  <Link to="/menu">
                    <Button className="bg-primary font-font-primary text-white">
                      Order {category.categoryname}
                    </Button>
                  </Link>
                </div>

                {category.menuitems.slice(0, 3).map((value, index) => (
                  <div
                    className="price_list my-5 flex flex-col justify-between"
                    key={index}
                  >
                    <div className=" flex items-center justify-between my-3">
                      <div className="flex items-center gap-3">
                        <IconButton className="text-xl bg-primary">
                          <ImSpoonKnife />
                        </IconButton>
                        <Typography className="font-font-primary text-xl font-semibold text-primary">
                          {value.foodname}
                        </Typography>
                      </div>
                      <Typography className="font-font-primary text-xl font-semibold text-secondary">
                        £{value.foodprice}
                      </Typography>
                    </div>
                  </div>
                ))}
              </CardBody>
            </Card>
          ))
        )}
      </div>
    </section>
  );
};

export default ExploreMenu;
