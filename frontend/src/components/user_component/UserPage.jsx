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
import ProfileCard from "./ProfileCard";
import OrderHistory from "./OrderHistory";

const UserPage = () => {
  const [userTabType, setUserTabType] = useState("profile");
  return (
    <section className="bg-diagonalBg w-full flex items-center justify-center h-auto py-8 px-4">
      <Card className="w-full">
        <CardBody>
          <Tabs value={userTabType}>
            <TabsHeader>
              <Tab
                className="font-bold text-primary font-font-primary"
                value="profile"
                onClick={() => setUserTabType("profile")}
              >
                Profile Details
              </Tab>

              <Tab
                className="font-bold text-primary font-font-primary"
                value="history"
                onClick={() => setUserTabType("history")}
              >
                Order History Details
              </Tab>
            </TabsHeader>
            <TabsBody
              className="!overflow-x-hidden"
              animate={{
                initial: {
                  x: userTabType === "profile" ? 400 : -400,
                },
                mount: {
                  x: 0,
                },
                unmount: {
                  x: userTabType === "history" ? 400 : -400,
                },
              }}
            >
              <TabPanel value="profile" className="py-5 w-full">
                <ProfileCard />
              </TabPanel>
              <TabPanel value="history" className="py-5 w-full">
                <OrderHistory />
              </TabPanel>
            </TabsBody>
          </Tabs>
        </CardBody>
      </Card>
    </section>
  );
};

export default UserPage;
