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
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import { ToastContainer } from "react-toastify";

const LoginForm = () => {
  const [tabType, setTabType] = useState("login");
  // console.log(tabType);
  return (
    <section className="bg-diagonalBg w-full flex items-center justify-center h-auto py-8 px-8 overflow-hidden">
      <ToastContainer />
      <Card>
        <CardBody>
          <Tabs value={tabType}>
            <TabsHeader className="px-5">
              <Tab
                className="font-bold text-primary font-font-primary"
                value="login"
                onClick={() => setTabType("login")}
              >
                Sign In
              </Tab>

              <Tab
                className="font-bold text-primary font-font-primary"
                value="signup"
                onClick={() => setTabType("signup")}
              >
                Create An Account
              </Tab>
            </TabsHeader>
            <TabsBody
              className="!overflow-x-hidden"
              animate={{
                initial: {
                  x: tabType === "login" ? 400 : -400,
                },
                mount: {
                  x: 0,
                },
                unmount: {
                  x: tabType === "signup" ? 400 : -400,
                },
              }}
            >
              <TabPanel value="login" className="py-5 w-96">
                <SignInForm />
              </TabPanel>
              <TabPanel value="signup" className="py-5 w-96">
                <SignUpForm />
              </TabPanel>
            </TabsBody>
          </Tabs>
        </CardBody>
      </Card>
    </section>
  );
};

export default LoginForm;
