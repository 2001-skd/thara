import React from "react";
import { Typography, Card, Button } from "@material-tailwind/react";

const TotalRevenue = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="grid md:grid-cols-3 gap-5">
      <Card className="max-w-sm h-36">
        <div className="header">
          <Typography className="text-center rounded-t-md  bg-primary text-white font-extrabold font-font-primary">
            Monthly Revenue Details
          </Typography>
        </div>
        <div className="p-5 flex items-center justify-between">
          <Typography className="font-font-primary font-extrabold text-primary">
            Total Monthly Revenue
          </Typography>
          <Typography className="font-font-primary font-extrabold text-primary">
            100
          </Typography>
        </div>

        <div className="pr-5 flex items-center justify-end">
          <Button
            className="bg-primary text-white font-bold font-font-primary"
            size="sm"
          >
            Export as Excel
          </Button>
        </div>
      </Card>

      <Card className="max-w-sm h-36">
        <div className="header">
          <Typography className="text-center rounded-t-md  bg-primary text-white font-extrabold font-font-primary">
            Yearly Revenue Details ({currentYear})
          </Typography>
        </div>
        <div className="p-5 flex items-center justify-between">
          <Typography className="font-font-primary font-extrabold text-primary">
            Total Yearly Revenue
          </Typography>
          <Typography className="font-font-primary font-extrabold text-primary">
            100
          </Typography>
        </div>
        <div className="pr-5 flex items-center justify-end">
          <Button
            className="bg-primary text-white font-bold font-font-primary"
            size="sm"
          >
            Export as Excel
          </Button>
        </div>
      </Card>

      <Card className="max-w-sm h-36">
        <div className="header">
          <Typography className="text-center rounded-t-md  bg-primary text-white font-extrabold font-font-primary">
            Overall Revenue Details
          </Typography>
        </div>
        <div className="p-5 flex items-center justify-between">
          <Typography className="font-font-primary font-extrabold text-primary">
            Total Overall Revenue
          </Typography>
          <Typography className="font-font-primary font-extrabold text-primary">
            100
          </Typography>
        </div>
        <div className="pr-5 flex items-center justify-end">
          <Button
            className="bg-primary text-white font-bold font-font-primary"
            size="sm"
          >
            Export as Excel
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default TotalRevenue;
