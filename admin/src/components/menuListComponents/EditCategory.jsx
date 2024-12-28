import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useParams } from "react-router-dom";

const EditCategory = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [formFieldData, setFormFieldData] = useState({
    categoryname: "",
    categoryimg: "",
  });
  const [imagePreview, setImagePreview] = useState(null);

  // Fetching form details
  useEffect(() => {
    async function fetchFormDetails() {
      try {
        const response = await fetch(
          `http://localhost/tharas_takeaway/backend/api/fetch_form_category_for_edit.php?id=${id}`
        );

        const contentType = response.headers.get("Content-Type");

        if (
          response.ok &&
          contentType &&
          contentType.includes("application/json")
        ) {
          const responseData = await response.json();

          if (responseData) {
            setFormFieldData({
              categoryname: responseData.categoryname,
              categoryimg: responseData.categoryimg,
            });

            setImagePreview(
              `http://localhost/tharas_takeaway/backend/${responseData.categoryimg}`
            );
          } else {
            console.log("No data found for the provided category ID");
          }
        } else {
          const errorText = await response.text();
          console.log("Error while fetching form data:", errorText);
        }
      } catch (err) {
        console.log("Error fetching form details:", err);
      }
    }

    fetchFormDetails();
  }, [id]);

  // Handle image upload and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormFieldData({
        ...formFieldData,
        categoryimg: file, // Set file directly
      });

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Ensure that categoryname is not empty before appending to formData
    if (!formFieldData.categoryname) {
      toast.error("Category name cannot be empty.", {
        position: "top-center",
      });
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("categoryname", formFieldData.categoryname || ""); // Ensure categoryname is appended
    formData.append("categorymodifieddate", new Date().toLocaleString()); // Ensure date is added

    // Only append image if it's a valid File object
    if (formFieldData.categoryimg instanceof File) {
      formData.append("categoryimg", formFieldData.categoryimg);
    }

    // Debugging: Log formData content
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]); // Check what is being appended to FormData
    }

    try {
      const response = await fetch(
        `http://localhost/tharas_takeaway/backend/api/edit_category_form.php?id=${id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (response.ok) {
        toast.success("Category updated successfully!", {
          position: "top-center",
        });
      } else {
        const errorText = await response.text();
        console.log(errorText);
        toast.error(`Error: ${errorText}`, { position: "top-center" });
      }
    } catch (err) {
      toast.error("Error updating Category. Please try again later.");
      console.log("Error during Category submission:", err);
    } finally {
      setLoading(false);
    }
  };

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
              Category Form
            </Typography>
            <form
              encType="multipart/form-data"
              onSubmit={handleSubmit}
              className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
            >
              <div className="mb-1 flex flex-col gap-6">
                {/* Category Name */}
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="-mb-3 font-font-primary text-primary"
                >
                  Category Name
                </Typography>
                <Input
                  value={formFieldData.categoryname}
                  onChange={(e) =>
                    setFormFieldData({
                      ...formFieldData,
                      categoryname: e.target.value,
                    })
                  }
                  name="categoryname"
                  size="lg"
                  placeholder="Enter category name"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900 !font-font-primary placeholder:!font-font-primary"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />

                {/* Image Upload with Preview */}
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="font-font-primary text-primary"
                >
                  Upload Thumb Image for Category
                </Typography>
                <div className="flex items-center flex-col">
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="mb-4 h-32 w-32 object-cover rounded"
                    />
                  )}
                  <Input
                    name="categoryimg"
                    type="file"
                    onChange={handleImageChange}
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </div>

                <Button
                  disabled={loading}
                  type="submit"
                  fullWidth
                  className="bg-primary text-white mt-6 font-font-primary"
                >
                  {loading ? "Uploading..." : "Update Category"}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default EditCategory;
