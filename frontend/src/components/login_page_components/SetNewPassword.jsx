import Layout from "../Layout";
import React, { useState } from "react";
import { Typography, Input, Checkbox, Button } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SetNewPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const host = "http://localhost:5000";
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Toggle Password Visibility
  function togglePassword() {
    setShowPassword((prev) => !prev);
    const name = document.getElementById("setNewPassword");
    name.type = showPassword ? "password" : "text";
  }

  // Handle form submit
  async function onSubmit(data) {
    setLoading(true);
    try {
      const response = await fetch(`${host}/user/set-new-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userMail: data.userMail,
          userPassword: data.userPassword,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        // Success: Password updated
        toast.success(result.message || "Password updated successfully!", {
          position: "top-center",
          autoClose: 3000,
          transition: Slide,
        });
        reset(); // Reset the form on success
        setTimeout(() => {
          window.location.href = "/login";
        }, 4000);
      } else {
        // Failure: Show error message
        toast.error(result.message || "Failed to update password.", {
          position: "top-center",
          autoClose: 3000,
          transition: Slide,
        });
      }
    } catch (error) {
      // Network/Other errors
      toast.error("Something went wrong. Please try again.", {
        position: "top-center",
        autoClose: 3000,
        transition: Slide,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <ToastContainer />
      <section className="px-4 py-8 flex items-center justify-center flex-col bg-diagonalBg">
        <div className="w-96 bg-white p-5 rounded-md">
          <Typography
            variant="h4"
            className="font-font-primary font-bold text-primary text-center underline underline-offset-8"
          >
            Set New Password
          </Typography>
          <form className="mt-8 mb-2 w-full" onSubmit={handleSubmit(onSubmit)}>
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
                id="setNewPassword"
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
              disabled={loading}
            >
              {loading ? "Please Wait..." : "Set Password"}
            </Button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default SetNewPassword;
