import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import {
  Card,
  Input,
  Button,
  Typography,
  Select,
  Option,
  Textarea,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const MenuForm = () => {
  const [loading, setLoading] = useState(false);
  const [selectFieldData, setSelectFieldData] = useState([]);

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
  const watchCategoryImage = watch("foodimg");

  useEffect(() => {
    async function fetchCategoryNameinSelect() {
      try {
        const response = await fetch(
          "https://tharastakeaway.com/backend/api/get_category_details_table.php"
        );
        const responseData = await response.json();

        if (response.ok) {
          // Assuming the responseData is an array or an object
          setSelectFieldData(responseData);
        } else {
          console.error("Error: ", responseData.message || "Unknown error");
        }
      } catch (error) {
        console.error("Error while category field fetching:", error);
      }
    }

    fetchCategoryNameinSelect();
  }, []);

  // Form submit function
  async function onSubmit(data) {
    // console.log(data); // Log the form data for debugging
    setLoading(true);

    const formData = new FormData();

    // Append food details
    formData.append("foodname", data.foodname);
    formData.append("foodcategory", data.foodcategory);
    formData.append("foodprice", data.foodprice);
    formData.append("fooddesc", data.fooddesc);

    // Append the selected image
    const fileInput = watchCategoryImage && watchCategoryImage[0]; // Get the first selected image
    if (fileInput) {
      formData.append("foodimg", fileInput);
    } else {
      console.error("No image selected");
      toast.error("Please select an image for the food item.", {
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
      return;
    }

    // Append the modified date
    formData.append("menumodifieddate", formattedDate);

    try {
      const response = await fetch(
        "https://tharastakeaway.com/backend/api/food_menu_form.php",
        {
          method: "POST",
          body: formData, // Send formData with the POST request
        }
      );

      const responseData = await response.json(); // Parse JSON response

      // console.log("Response Data:", responseData); // Log the response data for debugging

      if (response.ok) {
        // Success toast notification
        toast.success("Food Added to the Menu List Successfully", {
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

        reset(); // Reset form values after submission
        window.scrollTo(0, 0); // Scroll to top of the page
        setLoading(false); // Turn off loading spinner
      } else {
        // Error toast notification if the response is not OK
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

        setLoading(false); // Turn off loading spinner
        window.scrollTo(0, 0); // Scroll to top of the page
      }
    } catch (err) {
      // console.log("Error while submitting the form:", err);
      setLoading(false); // Turn off loading spinner in case of error
    }
  }

  return (
    <Layout>
      <ToastContainer />
      <section className="px-4 py-8 flex items-center justify-center h-auto bg-diagonalBg">
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
              Menu Form
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
                  Food Name
                </Typography>
                <Input
                  {...register("foodname", {
                    required: true,
                  })}
                  name="foodname"
                  size="lg"
                  placeholder="Chicken Briyani, Vegetable Briyani..."
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900 !font-font-primary placeholder:!font-font-primary"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                {errors.foodname && (
                  <span className="font-font-primary text-red-300">
                    Food Name is required
                  </span>
                )}

                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="-mb-3 font-font-primary text-primary"
                >
                  Food Price
                </Typography>
                <Input
                  type="text"
                  {...register("foodprice", {
                    required: true,
                  })}
                  name="foodprice"
                  size="lg"
                  placeholder="50"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900 !font-font-primary placeholder:!font-font-primary"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                {errors.foodprice && (
                  <span className="font-font-primary text-red-300">
                    Food Price is required
                  </span>
                )}

                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="-mb-3 font-font-primary text-primary"
                >
                  Food Category
                </Typography>
                <select
                  label="Select Category"
                  className="font-font-primary h-10 border-2 rounded-md"
                  name="foodcategory"
                  {...register("foodcategory", {
                    required: true,
                  })}
                >
                  {selectFieldData.map((value, index) => (
                    <option
                      className="font-font-primary"
                      key={index}
                      value={value.categoryname}
                    >
                      {value.categoryname}
                    </option>
                  ))}
                </select>
                {errors.foodcategory && (
                  <span className="font-font-primary text-red-300">
                    Food Category is required
                  </span>
                )}

                {/* food desctiption starts */}
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="font-font-primary text-primary"
                >
                  Food Description
                </Typography>
                <Textarea
                  {...register("fooddesc", {
                    required: true,
                  })}
                  name="fooddesc"
                  label="Enter Food Description"
                />
                {errors.fooddesc && (
                  <span className="font-font-primary text-red-300">
                    Food Description is required
                  </span>
                )}
                {/* food desctiption ends */}

                {/* Image Upload */}
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="font-font-primary text-primary"
                >
                  Upload Thumb Image for Menu
                </Typography>
                <div className="flex items-center flex-col">
                  <Input
                    {...register("foodimg", {
                      required: true,
                    })}
                    name="foodimg"
                    type="file"
                    id="uploadImg"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                  {errors.foodimg && (
                    <span className="font-font-primary text-red-300">
                      Food Image is required
                    </span>
                  )}
                </div>

                {/* Hidden Input for Date */}
                <Input
                  value={formattedDate}
                  disabled
                  hidden
                  name="menumodifieddate"
                />
              </div>

              <Button
                disabled={loading}
                type="submit"
                fullWidth
                className="bg-primary text-white mt-6 font-font-primary"
              >
                {loading ? "Uploading..." : "Add To Menu"}
              </Button>
            </form>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default MenuForm;
