import React, { useState, useEffect, useContext } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  CardFooter,
  Tooltip,
} from "@material-tailwind/react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoMdCart } from "react-icons/io";
import { cartContext } from "../../context-reducer/Context";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./customScrollbar.css"; // Add a custom CSS file for scrollbar styles

const FoodMenu = () => {
  const imgHost = "https://tharastakeaway.com/backend/";
  let menuId = 1;
  const [menuData, setMenuData] = useState([]);
  const token = localStorage.getItem("token");
  const { cartState, dispatch } = useContext(cartContext);

  function isLogin() {
    toast.warn("Kindly log in first to continue", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Slide,
    });
  }

  function handleaddToCart(menu) {
    dispatch({
      type: "add_to_cart",
      payload: menu,
    });
  }

  function handledeleteFromCart(menu) {
    dispatch({
      type: "delete_from_cart",
      payload: menu,
    });
  }

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}fetch_details_based_on_category.php`)
      .then((response) => response.json())
      .then((data) => {
        const groupByCategory = data.reduce((acc, item) => {
          if (!acc[item.foodcategory]) {
            acc[item.foodcategory] = {
              label: item.categoryname,
              value: item.categoryname.toLowerCase(),
              img: item.categoryimg,
              menuitems: [],
            };
          }
          acc[item.foodcategory].menuitems.push({
            id: menuId++,
            foodname: item.foodname,
            foodprice: item.foodprice,
            foodimg: item.foodimg,
            fooddesc: item.fooddesc,
          });
          return acc;
        }, {});
        setMenuData(Object.values(groupByCategory));
      })
      .catch((err) => {
        // console.log("error while fetching menu based on category", err);
      });
  }, []);

  return (
    <section className="md:py-8 py-4 px-4 bg-diagonalBg">
      <Card className="p-5">
        <Tabs value="briyani" orientation="horizontal">
          <TabsHeader className="w-full font-font-primary shadow-lg overflow-x-auto custom-scrollbar md:overflow-hidden">
            {menuData.map(({ label, value, img }) => (
              <Tooltip content={`${label}`} className="font-font-primary">
                <Tab
                  key={value}
                  value={value}
                  className="font-bold text-primary font-font-primary flex items-center justify-center gap-3 my-2"
                >
                  <img
                    src={`${imgHost}/${img}`}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  {label.slice(0, 5) + "..."}
                </Tab>
              </Tooltip>
            ))}
          </TabsHeader>
          <TabsBody>
            {menuData.map(({ value, menuitems }) => (
              <TabPanel key={value} value={value} className="p-0 py-4">
                <div className="grid md:grid-cols-3 grid-cols-1 gap-5">
                  {menuitems.map((menu, index) => (
                    <Card
                      className="w-full max-w-[26rem] shadow-lg"
                      key={index}
                    >
                      <CardHeader floated={false} color="blue-gray">
                        <img
                          src={`${imgHost}/${menu.foodimg}`}
                          alt={menu.foodname}
                        />
                        <div className="absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60" />
                      </CardHeader>
                      <CardBody>
                        <div className="mb-3 flex items-center justify-between">
                          <Typography
                            variant="h5"
                            color="blue-gray"
                            className="font-medium text-primary font-font-primary"
                          >
                            {menu.foodname}
                          </Typography>
                          <Typography
                            color="blue-gray"
                            className="flex items-center gap-1.5 font-bold text-xl text-primary font-font-primary"
                          >
                            £{menu.foodprice}
                          </Typography>
                        </div>
                        <Typography
                          color="gray"
                          className="font-font-primary font-semibold mt-3"
                        >
                          {menu.fooddesc}
                        </Typography>
                      </CardBody>
                      <CardFooter className="pt-3">
                        {cartState.some(
                          (cartitems) => cartitems.id === menu.id
                        ) ? (
                          <Button
                            size="lg"
                            fullWidth={true}
                            className="bg-red-500 text-bold tracking-widest text-white font-font-primary flex items-center justify-center gap-5"
                            onClick={() => {
                              handledeleteFromCart(menu);
                            }}
                          >
                            <IoMdCart className="text-xl" />
                            Remove From Cart
                          </Button>
                        ) : (
                          <Button
                            size="lg"
                            fullWidth={true}
                            className="bg-primary text-bold text-white font-font-primary flex items-center justify-center gap-3"
                            onClick={
                              token
                                ? () => {
                                    handleaddToCart(menu);
                                  }
                                : isLogin
                            }
                          >
                            <IoMdCart className="text-xl" />
                            Add To Cart
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      </Card>
    </section>
  );
};

export default FoodMenu;
