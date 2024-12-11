import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import {
  Card,
  Input,
  Button,
  Typography,
  Textarea,
} from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useParams } from "react-router-dom";

const EditCategory = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [selectFieldData, setSelectFieldData] = useState([]);
  const [formFieldData, setFormFieldData] = useState({
    categoryname: "",
    categoryimg: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const host = "http://localhost:5000";

  // Fetching form details
  useEffect(() => {
    async function fetchFormDetails() {
      try {
        const response = await fetch(
          `${host}/category/fetch-form-category/${id}`
        );
        const contentType = response.headers.get("Content-Type");

        if (
          response.ok &&
          contentType &&
          contentType.includes("application/json")
        ) {
          const responseData = await response.json();
          setFormFieldData({
            categoryname: responseData[0].categoryname,
            categoryimg: responseData[0].categoryimg,
          });
          setImagePreview(`${host}/${responseData[0].categoryimg}`);
        } else {
          const errorText = await response.text();
          console.log("Error while fetching form data:", errorText);
        }
      } catch (err) {
        console.log("Error fetching form details", err);
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
        categoryimg: file,
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

    const formData = new FormData();
    formData.append("categoryname", formFieldData.categoryname);
    formData.append("categorymodifieddate", new Date().toLocaleString());

    if (formFieldData.categoryimg) {
      formData.append("categoryimg", formFieldData.categoryimg);
    }

    try {
      const response = await fetch(`${host}/category/edit-category/${id}`, {
        method: "PUT",
        // Do not set 'Content-Type' header for FormData
        body: formData,
      });

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
      <section className="px-4 py-8 flex items-center justify-center h-auto bg-[url('../../assets/images/diagonal_bg.png')]">
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
                {/* Food Name */}
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
                  placeholder="Chicken Briyani, Vegetable Briyani..."
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
