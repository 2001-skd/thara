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

const EditMenuForm = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [selectFieldData, setSelectFieldData] = useState([]);
  const [formFieldData, setFormFieldData] = useState({
    foodname: "",
    foodprice: "",
    foodcategory: "",
    fooddesc: "",
    foodimg: "",
  });
  const [imagePreview, setImagePreview] = useState(null);

  // Fetching category details
  useEffect(() => {
    async function fetchCategoryNameinSelect() {
      try {
        const response = await fetch(
          "http://localhost/tharas_takeaway/backend/api/get_category_details_table.php"
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

  // Fetching form details
  useEffect(() => {
    async function fetchFormDetails() {
      try {
        // Construct the URL with the ID passed as a query parameter
        const url = `http://localhost/tharas_takeaway/backend/api/fetch_form_menu.php?id=${id}`;
        const response = await fetch(url);

        const contentType = response.headers.get("Content-Type");

        // Check if the response is successful and contains JSON data
        if (
          response.ok &&
          contentType &&
          contentType.includes("application/json")
        ) {
          const responseData = await response.json();

          // Assuming responseData is a single object (not an array)
          if (responseData) {
            setFormFieldData({
              foodname: responseData.foodname,
              foodprice: responseData.foodprice,
              foodcategory: responseData.foodcategory,
              fooddesc: responseData.fooddesc,
              foodimg: responseData.foodimg,
            });

            // Update the image preview URL (assuming the image is relative to your host)
            setImagePreview(`${responseData.foodimg}`);
          }
        } else {
          const errorText = await response.text();
          // console.log("Error while fetching form data:", errorText);
        }
      } catch (err) {
        // console.log("Error fetching form details", err);
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
        foodimg: file,
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
    formData.append("foodname", formFieldData.foodname);
    formData.append("foodprice", formFieldData.foodprice);
    formData.append("foodcategory", formFieldData.foodcategory);
    formData.append("fooddesc", formFieldData.fooddesc);
    formData.append("menumodifieddate", new Date().toLocaleString());

    if (formFieldData.foodimg) {
      formData.append("foodimg", formFieldData.foodimg);
    }

    // console.log(formData);

    try {
      const response = await fetch(
        `http://localhost/tharas_takeaway/backend/api/edit_menu_form.php?id=${id}`, // Pass the menu item ID
        {
          method: "POST", // HTTP PUT request
          body: formData,
        }
      );

      if (response.ok) {
        toast.success("Menu updated successfully!", { position: "top-center" });
      } else {
        const errorText = await response.text();
        // console.log(errorText);
        toast.error(`Error: ${errorText}`, { position: "top-center" });
      }
    } catch (err) {
      toast.error("Error updating menu. Please try again later.");
      // console.log("Error during submission:", err);
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
              Menu Form
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
                  Food Name
                </Typography>
                <Input
                  value={formFieldData.foodname}
                  onChange={(e) =>
                    setFormFieldData({
                      ...formFieldData,
                      foodname: e.target.value,
                    })
                  }
                  name="foodname"
                  size="lg"
                  placeholder="Chicken Briyani, Vegetable Briyani..."
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900 !font-font-primary placeholder:!font-font-primary"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />

                {/* Food Price */}
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="-mb-3 font-font-primary text-primary"
                >
                  Food Price
                </Typography>
                <Input
                  value={formFieldData.foodprice}
                  onChange={(e) =>
                    setFormFieldData({
                      ...formFieldData,
                      foodprice: e.target.value,
                    })
                  }
                  type="text"
                  name="foodprice"
                  size="lg"
                  placeholder="50"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900 !font-font-primary placeholder:!font-font-primary"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />

                {/* Food Category */}
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="-mb-3 font-font-primary text-primary"
                >
                  Food Category
                </Typography>
                <select
                  className="font-font-primary h-10 border-2 rounded-md"
                  name="foodcategory"
                  value={formFieldData.foodcategory}
                  onChange={(e) =>
                    setFormFieldData({
                      ...formFieldData,
                      foodcategory: e.target.value,
                    })
                  }
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

                {/* Food Description */}
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="font-font-primary text-primary"
                >
                  Food Description
                </Typography>
                <Textarea
                  value={formFieldData.fooddesc}
                  onChange={(e) =>
                    setFormFieldData({
                      ...formFieldData,
                      fooddesc: e.target.value,
                    })
                  }
                  name="fooddesc"
                  label="Enter Food Description"
                />

                {/* Image Upload with Preview */}
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="font-font-primary text-primary"
                >
                  Upload Thumb Image for Menu
                </Typography>
                <div className="flex items-center flex-col">
                  {imagePreview && (
                    <img
                      src={`http://localhost/tharas_takeaway/backend/${imagePreview}`}
                      alt="Preview"
                      className="mb-4 h-32 w-32 object-cover rounded"
                    />
                  )}
                  <Input
                    name="foodimg"
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
                  {loading ? "Uploading..." : "Update Menu"}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default EditMenuForm;
