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
import React, { useState } from "react";
import TotalMenuItems from "./TotalMenuItems";
import TotalRegisteredUser from "./TotalRegisteredUser";
import TotalRevenue from "./TotalRevenue";

const DashboardFullPage = () => {
  const [dbTabType, setDbTabType] = useState("menulist");
  return (
    <section className="bg-diagonalBg w-full h-full md:h-screen py-8 px-4">
      <Card className="w-full">
        <CardBody>
          <Tabs value={dbTabType}>
            <TabsHeader>
              <Tab
                className="font-bold text-primary font-font-primary"
                value="menulist"
                onClick={() => setDbTabType("menulist")}
              >
                Menu List Details
              </Tab>

              <Tab
                className="font-bold text-primary font-font-primary"
                value="registered_users"
                onClick={() => setDbTabType("registered_users")}
              >
                Registered User Details
              </Tab>

              <Tab
                className="font-bold text-primary font-font-primary"
                value="revenue"
                onClick={() => setDbTabType("revenue")}
              >
                Revenue Details
              </Tab>
            </TabsHeader>
            <TabsBody
              className="!overflow-x-hidden"
              animate={{
                initial: {
                  x:
                    dbTabType === "menulist"
                      ? 400
                      : dbTabType === "registered_users"
                      ? -400
                      : 800,
                },
                mount: {
                  x: 0,
                },
                unmount: {
                  x:
                    dbTabType === "registered_users"
                      ? 400
                      : dbTabType === "revenue"
                      ? -600
                      : -400,
                },
              }}
            >
              <TabPanel value="menulist" className="py-5 w-full">
                <TotalMenuItems />
              </TabPanel>
              <TabPanel value="registered_users" className="py-5 w-full">
                <TotalRegisteredUser />
              </TabPanel>
              <TabPanel value="revenue" className="py-5 w-full">
                <TotalRevenue />
              </TabPanel>
            </TabsBody>
          </Tabs>
        </CardBody>
      </Card>
    </section>
  );
};

export default DashboardFullPage;
