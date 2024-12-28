import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import {
  Card,
  Input,
  Button,
  Typography,
  Checkbox,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, Navigate } from "react-router-dom";

const LoginComponent = () => {
  const token = localStorage.getItem("token");

  // If token exists, redirect to dashboard
  if (token) {
    return <Navigate to="/dashboard" replace />;
  }
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  //   function Toggle password starts
  function togglePassword() {
    setShowPassword((prev) => !prev);
    const name = document.getElementById("adminpassword");
    name.type = showPassword ? "password" : "text";
  }
  //   function Toggle password ends

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  // Form submit function
  async function onSubmit(data) {
    setLoading(true);

    // Sending a POST request to the PHP backend
    const response = await fetch(
      "http://localhost/tharas_takeaway/backend/api/admin-login.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Tell the server it's JSON data
        },
        body: JSON.stringify(data),
      }
    );

    // Parse the JSON response
    const responseData = await response.json();

    if (response.ok) {
      // If the login is successful, store the token in localStorage
      localStorage.setItem("token", responseData.token);
      toast.success("Login Successful", {
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

      setLoading(false);
      // Redirect to the dashboard after 5 seconds
      setTimeout(() => {
        window.location = "/dashboard";
      }, 5000);
    } else {
      // If the login fails, show an error message
      toast.error(responseData.message, {
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

      setLoading(false);
    }
  }

  return (
    <>
      <div className="font-font-primary">
        <ToastContainer />
      </div>
      <section className="px-4 py-8 flex items-center justify-center h-screen bg-diagonalBg">
        <div className="flex items-center justify-center h-full">
          <Card color="white" className="p-5">
            <Typography
              variant="h4"
              className="font-font-primary text-primary text-xl font-extrabold"
            >
              Login
            </Typography>
            <form
              method="post"
              className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="mb-1 flex flex-col gap-6">
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="-mb-3 font-font-primary text-primary"
                >
                  Username
                </Typography>
                <Input
                  {...register("username", {
                    required: true,
                  })}
                  name="username"
                  size="lg"
                  placeholder="admin@gmail.com"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900 !font-font-primary placeholder:!font-font-primary"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                {errors.username && (
                  <span className="font-font-primary text-red-300">
                    Username is required
                  </span>
                )}

                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="-mb-3 font-font-primary text-primary"
                >
                  Enter Password (Min 8 Character)
                </Typography>
                <Input
                  type="password"
                  id="adminpassword"
                  {...register("adminpassword", {
                    required: true,
                    minLength: "8",
                  })}
                  name="adminpassword"
                  size="lg"
                  placeholder="********"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900 !font-font-primary placeholder:!font-font-primary"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                {errors.adminpassword && (
                  <span className="font-font-primary text-red-300">
                    Password is required
                  </span>
                )}
              </div>

              <div className="showHidePassword font-font-primary font-bold text-xl text-primary">
                <Checkbox
                  label="Show Password"
                  style={{ fontWeight: "bold" }}
                  onChange={togglePassword}
                  disabled={loading}
                />
              </div>

              <Button
                type="submit"
                fullWidth
                className="bg-primary text-white mt-6 font-font-primary"
              >
                {loading ? "Wait..." : "Login"}
              </Button>
            </form>
          </Card>
        </div>
      </section>
    </>
  );
};

export default LoginComponent;
