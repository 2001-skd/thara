import React, { useState } from "react";
import Layout from "../Layout";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useForm } from "react-hook-form";

const CategoryForm = () => {
  const [imageName, setImageName] = useState("");

  // Handle image file name on file selection
  function handleImgName(e) {
    const file = e.target.files[0]; // Get the first selected file
    if (file) {
      setImageName(file.name); // Update state with the file name
    }
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    const formData = new FormData();
    // append category name
    formData.append("categoryname", data.categoryname);

    // append category image
    const fileInput = data.categoryimg[0]; // Get the file directly from the form data
    if (fileInput) {
      formData.append("categoryimg", fileInput); // Append the file
    }

    // append date
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMin = currentDate.getMinutes();
    const hour12 = currentHour > 12 ? currentHour - 12 : currentHour;
    const checkAmPm = currentHour > 12 ? "PM" : "AM";
    const fulltime = `${hour12} : ${currentMin} ${checkAmPm}`;
    console.log(fulltime);
    const formattedDate = `${currentDate.getDate()} / ${
      currentDate.getMonth() + 1
    } / ${currentDate.getFullYear()} - ${fulltime}`;
    formData.append("categorymodifieddate", formattedDate);

    try {
      const response = await fetch(
        "http://localhost:5000/category/category-form",
        {
          method: "POST",
          body: formData,
        }
      );
      const responseData = await response.json();
      console.log("Response Data:", responseData);

      if (response.ok) {
        alert("Data inserted successfully");
        reset();
        setImageName(""); // Reset the image name
      } else {
        alert("Failed to submit");
        reset();
      }
    } catch (err) {
      console.log("Error while fetching category details:", err);
    }
  }

  return (
    <Layout>
      <section className="px-4 py-8 flex items-center justify-center h-screen bg-diagonalBg">
        {/* form starts */}
        <div className="flex items-center justify-center h-full">
          <Card color="white" className="p-5">
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
                  placeholder="Briyani, Kothu Roti,..."
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900 !font-font-primary placeholder:!font-font-primary"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                {errors.categoryname && (
                  <span className="font-font-primary text-red-300">
                    Category Name field is required
                  </span>
                )}

                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="-mb-12 font-font-primary text-primary"
                >
                  Upload Thumb Image For Category
                </Typography>

                <div className="flex items-center flex-col">
                  <Input
                    {...register("categoryimg", {
                      required: true,
                    })}
                    name="categoryimg"
                    type="file"
                    size="lg"
                    id="uploadImg"
                    onChange={handleImgName} // Use the file input change event
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    style={{ display: "none" }}
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />

                  <label
                    htmlFor="uploadImg"
                    style={{ width: "100%" }}
                    className="bg-transparent text-primary py-2 px-4 rounded cursor-pointer border-2 border-primary font-font-primary"
                  >
                    Upload Image
                  </label>

                  {errors.categoryimg && (
                    <span className="font-font-primary text-red-300">
                      Category Image field is required
                    </span>
                  )}

                  <p className="text-black">
                    {imageName || "No image selected"}
                  </p>
                </div>
              </div>

              <Button
                type="submit"
                fullWidth
                className="bg-primary text-white mt-6 font-font-primary"
              >
                Add Category
              </Button>
            </form>
          </Card>
        </div>
        {/* form ends */}
      </section>
    </Layout>
  );
};

export default CategoryForm;
