import React, { useState } from "react";
import { Typography, Input, Checkbox, Button } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { Navigate, Link } from "react-router-dom";

import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignInForm = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to="/user_dashboard" replace />;
  }
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  // function for handle login starts
  async function onSubmit(data) {
    setLoading(true);

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}user_login.php`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const responseData = await response.json();

    if (response.ok) {
      // Store the token in localStorage
      localStorage.setItem("token", responseData.token); // Save token
      localStorage.setItem("userDetails", JSON.stringify(responseData.user)); // Store user details

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

      window.scrollTo(0, 0);
      reset();

      // Redirect to the dashboard or another page after a delay
      setTimeout(() => {
        window.location.href = "/menu";
      }, 5000);

      setLoading(false);
    } else if (response.status === 400) {
      toast.warn(responseData.message, {
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
      window.scrollTo(0, 0);
      reset();
      setLoading(false);
    } else {
      toast.error("Something Went Wrong", {
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
      window.scrollTo(0, 0);
      reset();
      setLoading(false);
    }
  }

  // function for handle login ends

  //   function Toggle password starts
  function togglePassword() {
    setShowPassword((prev) => !prev);
    const name = document.getElementById("userpassword");
    name.type = showPassword ? "password" : "text";
  }
  //   function Toggle password ends
  return (
    <>
      <Typography
        variant="h4"
        className="font-font-primary font-bold text-primary text-center underline underline-offset-8"
      >
        Sign In
      </Typography>
      <form className="mt-8 mb-2 w-full p-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-1 flex flex-col gap-6">
          <Typography
            variant="h6"
            color="blue-gray"
            className="-mb-3 font-font-primary text-primary"
          >
            Your Email
          </Typography>
          <Input
            {...register("userMail", { required: true })}
            aria-invalid={errors.mail ? "true" : "false"}
            size="lg"
            name="userMail"
            placeholder="name@mail.com"
            className="!font-font-primary placeholder:font-font-primary !border-t-blue-gray-200 focus:!border-t-gray-900 text-xl"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          {errors.userMail && (
            <span className="font-font-primary text-red-300">
              Email Field is Required
            </span>
          )}
          <Typography
            variant="h6"
            color="blue-gray"
            className="-mb-3 font-font-primary text-primary"
          >
            Password (Password must have at least 8 characters)
          </Typography>
          <Input
            {...register("userPassword", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must have at least 8 characters",
              },
            })}
            type="password"
            size="lg"
            name="userPassword"
            id="userpassword"
            placeholder="********"
            className="!font-font-primary placeholder:font-font-primary !border-t-blue-gray-200 focus:!border-t-gray-900 text-xl"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          {errors.userPassword && (
            <span className="font-font-primary text-red-300">
              {errors.userPassword.message}
            </span>
          )}
        </div>

        <div className="showHidePassword font-font-primary font-bold text-xl text-primary">
          <Checkbox
            label="Show Password"
            style={{ fontWeight: "bold" }}
            onChange={togglePassword}
          />
        </div>

        <Button
          type="submit"
          className="mt-6 font-font-primary bg-primary tracking-widest"
          fullWidth
        >
          {loading ? "Please Wait..." : "Sign In"}
        </Button>
        <Typography
          color="gray"
          className="mt-4 text-center font-normal font-font-primary"
        >
          Don't have an account?{" "}
          <a href="#" className="font-medium text-gray-900">
            Click On{" "}
            <span className="underline underline-offset-8">
              Create an Account
            </span>{" "}
            Tab Above.
          </a>
        </Typography>
        <Link to="/set_new_password">
          <Typography className="text-center font-medium text-gray-900 mt-5 font-font-primary">
            Forgot Password ?
          </Typography>
        </Link>
      </form>
    </>
  );
};

export default SignInForm;
