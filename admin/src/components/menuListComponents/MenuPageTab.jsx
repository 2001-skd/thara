import React, { useState } from "react";
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
import MenuList from "./MenuList";
import CategoryList from "./CategoryList";

const MenuPageTab = () => {
  const [tabmenu, setTabMenu] = useState("menu");
  return (
    <section className="w-full h-full md:h-screen py-8">
      <Card className="w-full">
        <CardBody>
          <Tabs value={tabmenu}>
            <TabsHeader>
              <Tab
                className="font-bold text-primary font-font-primary"
                value="menu"
                onClick={() => setTabMenu("menu")}
              >
                Food Menu
              </Tab>

              <Tab
                className="font-bold text-primary font-font-primary"
                value="category"
                onClick={() => setTabMenu("category")}
              >
                Category
              </Tab>
            </TabsHeader>
            <TabsBody
              className="!overflow-x-hidden"
              animate={{
                initial: {
                  x: setTabMenu === "menu" ? 400 : -400,
                },
                mount: {
                  x: 0,
                },
                unmount: {
                  x: setTabMenu === "category" ? 400 : -400,
                },
              }}
            >
              <TabPanel value="menu" className="py-5 w-full">
                <MenuList />
              </TabPanel>
              <TabPanel value="category" className="py-5 w-full">
                <CategoryList />
              </TabPanel>
            </TabsBody>
          </Tabs>
        </CardBody>
      </Card>
    </section>
  );
};

export default MenuPageTab;
