import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Avatar,
  IconButton,
  Tooltip,
  CardFooter,
  Dialog,
  Input,
  Checkbox,
  Textarea,
} from "@material-tailwind/react";
import { IoMdCloseCircle } from "react-icons/io";
import { useContext, useEffect, useState } from "react";
import { cartContext } from "../../context-reducer/Context";
import { IoMdTrash } from "react-icons/io"; // For delete icon
import { allAssets } from "../../../public/assets/assets";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";

const TABLE_HEAD = [
  "Food Details",
  "Price / QTY",
  "Edit Quantity",
  "Total Price",
  "",
];

const CartTable = () => {
  const { cartState, dispatch } = useContext(cartContext); // Context for managing cart state
  const host = "http://localhost:5000"; // Use environment variable for host
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash_on_delivery");

  // console.log("cart state",)

  // Calculate net price for the entire cart
  const netPrice = cartState
    .reduce((acc, item) => {
      const itemTotalPrice = Number(item.foodprice) * item.qty; // Calculate total price for each item
      return acc + itemTotalPrice;
    }, 0)
    .toFixed(2);

  // Function to handle quantity decrease
  const handleDecreaseQty = (menuItem) => {
    if (menuItem.qty > 1) {
      dispatch({
        type: "update_quantity",
        payload: { ...menuItem, qty: menuItem.qty - 1 },
      });
    } else {
      handleDeleteFromCart(menuItem); // Optionally remove item if qty reaches 1
    }
  };

  // Function to handle quantity increase
  const handleIncreaseQty = (menuItem) => {
    dispatch({
      type: "update_quantity",
      payload: { ...menuItem, qty: menuItem.qty + 1 },
    });
  };

  // Function to handle item removal from the cart
  const handleDeleteFromCart = (menuItem) => {
    dispatch({
      type: "delete_from_cart",
      payload: menuItem,
    });
  };

  const user = JSON.parse(localStorage.getItem("userDetails"));
  console.log(user);

  // order data details starts
  const orderData = {
    userId: user.id,
    cartItems: cartState,
    totalPrice: netPrice,
    paymentMethod: paymentMethod,
    userName: user.name,
    userEmail: user.email,
    userMobile: user.usermobile,
    userAddress: shippingAddress,
  };

  console.log(orderData);
  // order data details ends

  // create order function starts
  async function handleOrderSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${host}/order/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });
      const responseData = await response.json();
      if (response.ok) {
        if (paymentMethod === "stripe") {
          alert("payment mad with stripe");
          window.location.href = "/thank-you";
          setLoading(false);
        } else {
          // alert("payment made with COD");
          window.location.href = "/thank-you";
          setLoading(false);
        }
      } else {
        alert("Error: " + responseData.message);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("Something went wrong, please try again");
      setLoading(false);
    }
  }
  // create order function ends

  return (
    <>
      <section className="px-4 py-8">
        {cartState.length === 0 ? (
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
            </Card>
          </div>
        ) : (
          <Card className="h-full w-full p-5">
            <CardHeader floated={false} shadow={false} className="rounded-none">
              <div className="mb-8 flex items-center justify-between gap-8">
                <div>
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    className="font-font-primary text-xl"
                  >
                    Cart list
                  </Typography>
                  <Typography
                    color="gray"
                    className="mt-1 font-normal font-font-primary"
                  >
                    See information about Your Orders
                  </Typography>
                </div>
              </div>
            </CardHeader>
            <CardBody className="overflow-scroll px-0">
              <table className="mt-4 w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head, index) => (
                      <th
                        key={index}
                        className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50 font-font-primary"
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="flex items-center justify-between gap-2 leading-none opacity-70 font-font-primary text-xl font-bold"
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {cartState.map((menu, index) => {
                    if (!menu || !menu.foodprice) {
                      return null; // Skip this item if it's invalid
                    }

                    const priceInt = Number(menu.foodprice);
                    const totalPrice = parseFloat(priceInt * menu.qty).toFixed(
                      2
                    );

                    return (
                      <tr key={index}>
                        <td className="p-4 border-b border-blue-gray-50">
                          <div className="flex items-center gap-3">
                            <Avatar
                              src={`${host}/${menu.foodimg}`}
                              alt={menu.foodname}
                              size="sm"
                            />
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal font-font-primary text-xl text-primary"
                              >
                                {menu.foodname}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal font-font-primary text-xl"
                          >
                            £{menu.foodprice}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70 font-font-primary"
                          >
                            QTY: {menu.qty}
                          </Typography>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <div className="flex items-center gap-2">
                            <Button
                              className="font-font-primary"
                              size="sm"
                              variant="outlined"
                              onClick={() => handleDecreaseQty(menu)}
                            >
                              <FaMinus />
                            </Button>
                            <Typography className="font-font-primary text-xl font-bold text-black">
                              {menu.qty}
                            </Typography>
                            <Button
                              className="font-font-primary"
                              size="sm"
                              variant="outlined"
                              onClick={() => handleIncreaseQty(menu)}
                            >
                              <FaPlus />
                            </Button>
                          </div>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal text-xl font-font-primary"
                          >
                            £{totalPrice}
                          </Typography>
                        </td>
                        <td className="p-4 border-b border-blue-gray-50">
                          <Tooltip content="Remove from Cart">
                            <IconButton
                              variant="text"
                              onClick={() => handleDeleteFromCart(menu)}
                            >
                              <IoMdTrash className="text-red-500" size={20} />
                            </IconButton>
                          </Tooltip>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </CardBody>
            <CardFooter className="flex items-center justify-between gap-5 border-t border-blue-gray-50 p-4 md:flex-row flex-col">
              <Button
                size="lg"
                className="w-full bg-transparent text-primary border-primary font-font-primary text-xl"
              >
                Total Price: £{netPrice}
              </Button>
              <Button
                size="lg"
                className="w-full bg-primary text-white font-font-primary text-xl"
                onClick={handleOpen}
              >
                Checkout
              </Button>
            </CardFooter>
          </Card>
        )}
      </section>

      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography
              variant="h4"
              color="blue-gray"
              className="font-font-primary"
            >
              Checkout
            </Typography>
            <IconButton
              size="sm"
              variant="text"
              className="!absolute right-3.5 top-3.5"
              onClick={handleOpen}
            >
              <IoMdCloseCircle className="h-4 w-4 stroke-2" />
            </IconButton>

            <div className="check_details my-1 border p-3 rounded-md border-dashed border-red-400">
              <Typography className="font-font-primary text-black text-[16px] font-bold">
                Name: {orderData.userName}
              </Typography>
              <Typography className="font-font-primary text-black text-[16px] font-bold">
                Email: {orderData.userEmail}
              </Typography>
              <Typography className="font-font-primary text-black text-[16px] font-bold">
                Mobile: {orderData.userMobile}
              </Typography>
              <Typography className="font-font-primary text-black text-[16px] font-bold">
                Total Price: £{orderData.totalPrice}
              </Typography>
            </div>
            <Typography variant="h6" className="font-font-primary -mb-2">
              Shipping Address
            </Typography>
            <Textarea
              label="Shipping Address"
              size="lg"
              required
              name="shiiping_address"
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              className="!font-font-primary placeholder:!font-font-primary text-xl"
            />
            {/* payment method option starts */}
            <div>
              <input
                type="radio"
                id="cod"
                name="paymentMethod"
                value="cash_on_delivery"
                className="peer hidden"
                checked={paymentMethod === "cash_on_delivery"}
                onChange={() => setPaymentMethod("cash_on_delivery")}
                required
              />
              <label
                htmlFor="cod"
                className="block w-full cursor-pointer rounded-lg border border-gray-300 p-4 text-gray-900 ring-1 ring-transparent peer-checked:border-gray-900 peer-checked:ring-gray-900"
              >
                <div className="block">
                  <Typography className="font-semibold text-primary font-font-primary">
                    Cash On Delivery
                  </Typography>
                  {/* <Typography className="font-normal text-gray-600">
                    5-7 business days.{" "}
                    <strong className="text-gray-900">Free</strong>
                  </Typography> */}
                </div>
              </label>
            </div>

            {/* <div>
              <input
                type="radio"
                id="stripe"
                name="paymentMethod"
                value="stripe"
                className="peer hidden"
                checked={paymentMethod === "stripe"}
                onChange={() => setPaymentMethod("stripe")}
                required
              />
              <label
                htmlFor="stripe"
                className="block w-full cursor-pointer rounded-lg border border-gray-300 p-4 text-gray-900 ring-1 ring-transparent peer-checked:border-gray-900 peer-checked:ring-gray-900"
              >
                <div className="block">
                  <Typography className="font-semibold text-primary font-font-primary">
                    Pay with Credit/Debit Card (Stripe)
                  </Typography>
                </div>
              </label>
            </div> */}
            {/* payment method option ends */}
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              className="bg-primary text-white font-font-primary"
              fullWidth
              onClick={handleOrderSubmit}
              type="submit"
              disabled={loading}
            >
              {loading ? "Please Wait" : "Place Order"}
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
};

export default CartTable;
