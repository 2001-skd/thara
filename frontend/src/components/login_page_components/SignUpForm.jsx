import React, { useState } from "react";
import { Typography, Input, Checkbox, Button } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const host = "http://localhost:5000";

  //   function Toggle password starts
  function togglePassword() {
    setShowPassword((prev) => !prev);
    const name = document.getElementById("usersignUppassword");
    name.type = showPassword ? "password" : "text";
  }
  //   function Toggle password ends

  async function onSubmit(data) {
    setLoading(true);
    // console.log(data);
    const response = await fetch(`${host}/user/create-account`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    if (response.ok) {
      // alert("user Registerd Successfully");
      toast.success(
        "User Registered Successfully, Go To Login Tab and Login With Your Email and Password",
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Slide,
        }
      );
      window.scrollTo(0, 0);
      reset();
      setLoading(false);
    } else if (response.status === 400) {
      // alert("User Already Registered");
      toast.warn("User Already Registered, Please Login", {
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
      // alert("Something Went Wrong");
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
    // console.log("response data", response);
  }
  return (
    <>
      <Typography
        variant="h4"
        className="font-font-primary font-bold text-primary text-center underline underline-offset-8"
      >
        Create an Account
      </Typography>
      <form className="mt-8 mb-2 w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-1 flex flex-col gap-6">
          <Typography
            variant="h6"
            color="blue-gray"
            className="-mb-3 font-font-primary text-primary"
          >
            Your Name
          </Typography>
          <Input
            {...register("userName", { required: true, maxLength: 20 })}
            size="lg"
            placeholder="yourname"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900 !font-font-primary placeholder:font-font-primary text-xl"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          {errors.userName && (
            <span className="font-font-primary text-red-300">
              Name field is required
            </span>
          )}
          <Typography
            variant="h6"
            color="blue-gray"
            className="-mb-3 font-font-primary text-primary"
          >
            Your Email
          </Typography>
          <Input
            {...register("userMail", { required: true })}
            size="lg"
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
            Your Mobile Number
          </Typography>
          <Input
            {...register("userPhoneNumber", { required: true })}
            size="lg"
            placeholder="123456789"
            className="!font-font-primary placeholder:font-font-primary !border-t-blue-gray-200 focus:!border-t-gray-900 text-xl"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          {errors.userPhoneNumber && (
            <span className="font-font-primary text-red-300">
              Phone Number Field is Required
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
              validate: (value) => {
                // Regular expression to validate password strength
                const hasUpperCase = /[A-Z]/.test(value);
                const hasLowerCase = /[a-z]/.test(value);
                const hasNumber = /[0-9]/.test(value);
                const hasSpecialChar = /[!@#$%^&*]/.test(value);

                if (!hasUpperCase) {
                  return "Password must contain at least one uppercase letter";
                }
                if (!hasLowerCase) {
                  return "Password must contain at least one lowercase letter";
                }
                if (!hasNumber) {
                  return "Password must contain at least one number";
                }
                if (!hasSpecialChar) {
                  return "Password must contain at least one special character";
                }
                return true;
              },
            })}
            id="usersignUppassword"
            type="password"
            size="lg"
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
          {loading ? "Please Wait..." : "Create an Account"}
        </Button>
        <Typography
          color="gray"
          className="mt-4 text-center font-normal font-font-primary"
        >
          Already have an account?{" "}
          <a href="#" className="font-medium text-gray-900">
            Click On{" "}
            <span className="underline underline-offset-8">Sign In</span> Tab
            Above.
          </a>
        </Typography>
      </form>
    </>
  );
};

export default SignUpForm;
