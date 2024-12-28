import {
  Card,
  CardBody,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast, Slide } from "react-toastify";

const NewOrderDetails = () => {
  const [orderedItems, setOrderedItems] = useState([]);
  const [statuses, setStatuses] = useState({});

  // Fetching ordered details that are in pending state
  useEffect(() => {
    async function newPendingOrder() {
      try {
        const response = await fetch(
          "https://tharastakeaway.com/backend/api/new_order_items_fetch.php"
        );
        const responseData = await response.json();

        const groupById = responseData.reduce((acc, item) => {
          if (!acc[item.order_id]) {
            acc[item.order_id] = {
              customer: [],
              foodOrder: [],
            };
          }

          if (acc[item.order_id].customer.length === 0) {
            acc[item.order_id].customer.push({
              customerName: item.user_name,
              customerEmail: item.user_email,
              customerPhone: item.user_phone,
              customerAddress: item.user_address,
              orderId: item.order_id,
            });
          }

          acc[item.order_id].foodOrder.push({
            foodname: item.food_name,
            foodprice: item.food_price,
            foodqty: item.quantity,
            totalPrice: item.total_price,
            paymentMethod: item.payment_method,
          });

          return acc;
        }, {});

        setOrderedItems(Object.values(groupById));

        // Initialize statuses for each order
        const initialStatuses = Object.values(groupById).reduce(
          (acc, order) => {
            acc[order.customer[0].orderId] = "pending"; // Assuming default status is "pending"
            return acc;
          },
          {}
        );
        setStatuses(initialStatuses);
      } catch (err) {
        console.log(err);
      }
    }

    newPendingOrder();
  }, []);

  // Handle status change for each order
  const handleStatusChange = async (orderId, newStatus) => {
    // Update status in local state (optimistic UI update)
    setStatuses((prevStatuses) => ({
      ...prevStatuses,
      [orderId]: newStatus,
    }));

    // Send the updated status to the backend
    try {
      const response = await fetch(
        "https://tharastakeaway.com/backend/api/update_order_details.php", // PHP API URL
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ orderId, newStatus }), // Sending orderId and newStatus to the backend
        }
      );

      const responseData = await response.json(); // Ensure response is parsed as JSON

      // Check if the status update was successful
      if (response.ok) {
        toast.success(`Order status updated to ${newStatus}`, {
          position: "top-right",
        });

        // Optionally refresh the page or update local state (optional for optimization)
        setTimeout(() => {
          window.location.reload(); // Reload the page to reflect changes
        }, 3000);
      } else {
        throw new Error(responseData.error || "Failed to update status"); // Handle errors from backend
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`, {
        position: "top-right",
      });
    }
  };

  return (
    <div className="new-order-details font-font-primary grid md:grid-cols-3 grid-cols-1 gap-5">
      {orderedItems.length > 0 ? (
        orderedItems
          .slice()
          .reverse()
          .map((order, index) => (
            <Card key={index}>
              <CardBody>
                <div className="grid grid-cols-2">
                  <Typography
                    variant="h5"
                    className={`font-font-primary text-primary ${
                      statuses[order.customer[0].orderId] === "pending"
                        ? "text-red-500"
                        : ""
                    }`}
                  >
                    Order Id - #TTA{order.customer[0].orderId}
                  </Typography>

                  <Select
                    label="Order Status"
                    value={statuses[order.customer[0].orderId]}
                    onChange={(e) =>
                      handleStatusChange(order.customer[0].orderId, e)
                    }
                  >
                    <Option value="pending">Pending</Option>
                    <Option value="processing">Processing</Option>
                    <Option value="delivered">Delivered</Option>
                  </Select>
                </div>

                <div className="customer-details border border-dashed border-primary font-font-primary p-3 rounded-md my-2">
                  <Typography
                    variant="small"
                    className="font-font-primary text-primary font-bold"
                  >
                    Name : {order.customer[0].customerName}
                  </Typography>
                  <Typography
                    variant="small"
                    className="font-font-primary text-primary font-bold"
                  >
                    Email : {order.customer[0].customerEmail}
                  </Typography>
                  <Typography
                    variant="small"
                    className="font-font-primary text-primary font-bold"
                  >
                    Phone : {order.customer[0].customerPhone}
                  </Typography>
                  <Typography
                    variant="small"
                    className="font-font-primary text-primary font-bold"
                  >
                    Address : {order.customer[0].customerAddress}
                  </Typography>
                  <Typography
                    variant="small"
                    className="font-font-primary text-primary font-bold"
                  >
                    Payment Method : {order.foodOrder[0].paymentMethod}
                  </Typography>
                </div>

                <table className="w-full table-auto text-left border-collapse border border-blue-gray-200">
                  <tbody>
                    <tr>
                      <td
                        className="p-2 border border-blue-gray-200"
                        colSpan="2"
                      >
                        <strong className="text-black">
                          Ordered Items ({order.foodOrder.length})
                        </strong>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2 border border-blue-gray-200">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-font-primary font-bold"
                        >
                          Item
                        </Typography>
                      </td>
                      <td className="p-2 border border-blue-gray-200">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-font-primary font-bold"
                        >
                          Quantity x Price
                        </Typography>
                      </td>
                    </tr>

                    {order.foodOrder.map(
                      ({ foodname, foodqty, foodprice }, idx) => (
                        <tr key={idx}>
                          <td className="p-2 border border-blue-gray-200">
                            <Typography
                              className="font-font-primary font-bold"
                              variant="small"
                              color="blue-gray"
                            >
                              {foodname}
                            </Typography>
                          </td>
                          <td className="p-2 border border-blue-gray-200">
                            <Typography
                              className="font-font-primary font-bold"
                              variant="small"
                              color="blue-gray"
                            >
                              {foodqty} x {foodprice}
                            </Typography>
                          </td>
                        </tr>
                      )
                    )}

                    {/* Total Price */}
                    <tr>
                      <td className="p-2 border border-blue-gray-200">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-font-primary font-bold"
                        >
                          <strong>Total Price</strong>
                        </Typography>
                      </td>
                      <td className="p-2 border border-blue-gray-200">
                        <Typography
                          className="font-font-primary font-bold"
                          variant="small"
                          color="blue-gray"
                        >
                          £
                          {order.foodOrder.reduce(
                            (acc, item) => acc + item.foodqty * item.foodprice,
                            0
                          )}
                        </Typography>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </CardBody>
            </Card>
          ))
      ) : (
        <div className="text-center font-font-primary text-lg text-primary">
          No new orders found
        </div>
      )}
    </div>
  );
};

export default NewOrderDetails;
