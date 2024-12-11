import {
  Card,
  CardBody,
  Tabs,
  TabsHeader,
  Tab,
  TabsBody,
  TabPanel,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import NewOrderDetails from "./NewOrderDetails";
import ProcessingOrderDetails from "./ProcessingOrderDetails";
import DeliveredOrderDetails from "./DeliveredOrderDetails";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrderFullPage = () => {
  const [orderTabType, setOrderTabType] = useState("new-order");

  return (
    <section className="bg-diagonalBg w-full h-full py-8 px-4">
      <ToastContainer />
      <Card className="w-full">
        <CardBody>
          <Tabs value={orderTabType}>
            <TabsHeader>
              <Tab
                className="font-bold text-primary font-font-primary"
                value="new-order"
                onClick={() => setOrderTabType("new-order")}
              >
                New Order Details
              </Tab>

              <Tab
                className="font-bold text-primary font-font-primary"
                value="processing-order"
                onClick={() => setOrderTabType("processing-order")}
              >
                Processing Details
              </Tab>

              <Tab
                className="font-bold text-primary font-font-primary"
                value="delivered-order"
                onClick={() => setOrderTabType("delivered-order")}
              >
                Delivered Order Details
              </Tab>
            </TabsHeader>
            <TabsBody
              className="!overflow-x-hidden"
              animate={{
                initial: {
                  x:
                    orderTabType === "new-order"
                      ? 400
                      : orderTabType === "processing-order"
                      ? -400
                      : 800,
                },
                mount: {
                  x: 0,
                },
                unmount: {
                  x:
                    orderTabType === "processing-order"
                      ? 400
                      : orderTabType === "delivered-order"
                      ? -600
                      : -400,
                },
              }}
            >
              <TabPanel value="new-order" className="py-5 w-full">
                <NewOrderDetails />
              </TabPanel>
              <TabPanel value="processing-order" className="py-5 w-full">
                <ProcessingOrderDetails />
              </TabPanel>
              <TabPanel value="delivered-order" className="py-5 w-full">
                <DeliveredOrderDetails />
              </TabPanel>
            </TabsBody>
          </Tabs>
        </CardBody>
      </Card>
    </section>
  );
};

export default OrderFullPage;
