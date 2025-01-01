import React, { useState } from "react";
import Layout from "../Layout";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const CategoryForm = () => {
  const [loading, setLoading] = useState(false);

  // Append date
  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  const currentMin = currentDate.getMinutes().toString().padStart(2, "0");
  const hour12 = currentHour > 12 ? currentHour - 12 : currentHour;
  const checkAmPm = currentHour >= 12 ? "PM" : "AM";
  const formattedTime = `${hour12} : ${currentMin} ${checkAmPm}`;
  const formattedDate = `${currentDate.getDate()} / ${
    currentDate.getMonth() + 1
  } / ${currentDate.getFullYear()} - ${formattedTime}`;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  // Watch for image input
  const watchCategoryImage = watch("categoryimg");

  // Form submit function
  async function onSubmit(data) {
    setLoading(true);
    const formData = new FormData();
    formData.append("categoryname", data.categoryname);

    // Append the selected image
    const fileInput = watchCategoryImage && watchCategoryImage[0]; // Get the first file
    if (fileInput) {
      formData.append("categoryimg", fileInput);
    } else {
      console.error("No image selected");
      return;
    }

    // Append the modified date
    formData.append("categorymodifieddate", formattedDate);

    // console.log(formData);

    try {
      const response = await fetch(
        "http://localhost/tharas_takeaway/backend/api/category_form.php",
        {
          method: "POST",
          body: formData,
        }
      );
      const responseData = await response.json();
      //   console.log("Response Data:", responseData);

      if (response.ok) {
        // alert("Data inserted successfully");
        toast.success("Category Updated Successfully", {
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
        reset();
        setLoading(false);
      } else {
        // alert("Failed to submit");
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
        setLoading(true);
      }
    } catch (err) {
      // console.log("Error while submitting the form:", err);
      setLoading(false);
    }
  }

  return (
    <Layout>
      <ToastContainer />
      <section className="px-4 py-8 flex items-center justify-center h-screen bg-diagonalBg">
        <div className="flex items-center justify-center h-full">
          <Card color="white" className="p-5">
            <Link to="/dashboard/menu_list">
              <Button
                className="bg-primary text-white font-font-primary mb-5"
                size="sm"
              >
                Go Back
              </Button>
            </Link>
            <Typography
              variant="h4"
              className="font-font-primary text-primary text-xl font-extrabold"
            >
              Category Form
            </Typography>
            <form
              encType="multipart/form-data"
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
                  Category Name
                </Typography>
                <Input
                  {...register("categoryname", {
                    required: true,
                  })}
                  name="categoryname"
                  size="lg"
                  placeholder="Biryani, Kothu Roti,..."
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900 !font-font-primary placeholder:!font-font-primary"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                {errors.categoryname && (
                  <span className="font-font-primary text-red-300">
                    Category Name is required
                  </span>
                )}

                {/* Image Upload */}
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="font-font-primary text-primary"
                >
                  Upload Thumb Image for Category
                </Typography>
                <div className="flex items-center flex-col">
                  <Input
                    {...register("categoryimg", {
                      required: true,
                    })}
                    name="categoryimg"
                    type="file"
                    id="uploadImg"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                  {errors.categoryimg && (
                    <span className="font-font-primary text-red-300">
                      Category Image is required
                    </span>
                  )}
                </div>

                {/* Hidden Input for Date */}
                <Input
                  value={formattedDate}
                  disabled
                  hidden
                  name="categorymodifieddate"
                />
              </div>

              <Button
                disabled={loading}
                type="submit"
                fullWidth
                className="bg-primary text-white mt-6 font-font-primary"
              >
                {loading ? "Uploading..." : "Add Category"}
              </Button>
            </form>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default CategoryForm;
