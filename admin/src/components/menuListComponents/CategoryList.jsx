import { Typography, Button, Input } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import { IoMdSearch } from "react-icons/io";
import { Link } from "react-router-dom";
import "./MennuTable.css";
import { usePagination } from "@table-library/react-table-library/pagination";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CategoryList = () => {
  // all states starts
  const [search, setSearch] = useState("");
  const [ids, setIds] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  // all states ends
  const host = "http://localhost:5000";

  // handleexpand Function starts
  function handleExpand(item) {
    if (ids.includes(item.id)) {
      setIds(ids.filter((id) => id !== item.id));
    } else {
      setIds(ids.concat(item.id));
    }
  }
  // handleexpand Function ends

  // function for fetching details starts
  async function handleCategoryListFetching() {
    setLoading(true);
    try {
      const response = await fetch(`${host}/category/get-category-details`);
      const responseData = await response.json(); // Add 'await' here
      if (Array.isArray(responseData)) {
        setCategoryData(responseData);
      } else {
        setCategoryData([]);
      }
      // console.log(responseData);
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  }

  // handleCategoryListFetching();

  useEffect(() => {
    handleCategoryListFetching();
  }, []);
  // function for fetching details ends

  const theme = useTheme([
    getTheme(),
    {
      HeaderRow: `
        background-color: #5e885a;
      `,
      Row: `
        &:nth-of-type(odd) {
          background-color: #33562e;
        }

        &:nth-of-type(even) {
          background-color: #5e885a;
        }
      `,
    },
  ]);

  const data = {
    nodes: categoryData,
  };

  const COLUMNS = [
    {
      label: "Category Name",
      renderCell: (item) => item.categoryname,
    },
    {
      label: "Category Thumb Image",
      renderCell: (item) => (
        <img
          src={`${host}/${item.categoryimg}`}
          alt={item.categoryname}
          width={"100px"}
          height={"100px"}
          style={{ objectFit: "cover" }}
        />
      ),
    },
  ];

  //   pagination starts
  const pagination = usePagination(data, {
    state: { size: 10, page: 0 },
    onChange: onPaginationChange,
  });

  function onPaginationChange(action, state) {
    console.log(action, state);
  }
  //   pagination ends
  // handle table expand starts
  const ROW_PROPS = {
    onClick: handleExpand,
  };

  const ROW_OPTIONS = {
    renderAfterRow: (item) => (
      <>
        {ids.includes(item.id) && (
          <tr
            style={{ display: "flex", gridColumn: "1 / -1" }}
            className="bg-[whitesmoke]"
          >
            <td style={{ flex: "1" }}>
              <ul className="p-5 flex flex-col gap-5">
                <li className="flex items-center gap-3">
                  <strong className="font-font-primary text-secondary">
                    Category Name :
                  </strong>
                  <Typography className="font-font-primary text-primary font-semibold">
                    {item.categoryname}
                  </Typography>
                </li>
                <li className="flex items-center gap-3">
                  <strong className="font-font-primary text-secondary">
                    Category Thumb Image :
                  </strong>
                  <img
                    src={`${host}/${item.categoryimg}`}
                    alt={item.categoryname}
                    width={"50px"}
                    height={"50px"}
                    style={{ objectFit: "cover" }}
                  />
                </li>
                <li className="flex items-center gap-3">
                  <strong className="font-font-primary text-secondary">
                    Modified Date
                  </strong>
                  <Typography className="font-font-primary text-primary font-semibold">
                    {item.datemodified}
                  </Typography>
                </li>
                <div className="editUpdataBtn flex gap-5 mt-5">
                  <form className="flex gap-5">
                    <Link to={`/dashboard/edit_category_form/${item.id}`}>
                      <Button className="bg-primary text-white font-bold font-font-primary">
                        Edit
                      </Button>
                    </Link>
                    <Button
                      onClick={(e) => handleDeleteBtn(e, item.id)}
                      type="button"
                      className="bg-transparent border-2 text-primary border-primary font-font-primary"
                    >
                      Delete
                    </Button>
                  </form>
                </div>
              </ul>
            </td>
          </tr>
        )}
      </>
    ),
  };
  // handle table expand ends

  // handle search function starts
  function handleSearch(e) {
    setSearch(e.target.value);
  }

  const filteredData = {
    nodes: categoryData.filter(
      (item) => item.categoryname.toLowerCase().includes(search.toLowerCase()) // Ensure correct key is used
    ),
  };
  // handle search function ends

  // delete function starts
  async function handleDeleteBtn(e, id) {
    e.preventDefault();
    // console.log("Attempting to delete category with ID:", id); // Log the ID
    try {
      const response = await fetch(`${host}/category/delete-category/${id}`, {
        method: "DELETE",
      });
      const responseData = await response.json();

      if (response.ok) {
        // alert("Deleted successfully");
        setCategoryData((prevData) =>
          prevData.filter((item) => item.id !== id)
        );
        toast.success("Deleted Successfully", {
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
      } else {
        // alert(responseData.message || "Failed to delete the category");
        const errorMsg =
          responseData.message || "Failed to delete the category";
        toast.error(errorMsg, {
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
      }
    } catch (error) {
      console.error("Error while deleting category:", error);
      alert("An error occurred while deleting the category");
    }
  }
  // delete function ends

  // edit function starts
  // async function handlecategoryEdit(e, id) {
  //   e.preventDefault();

  //   try {
  //     const url = await fetch(`${host}/category/edit-category/${id}`, {
  //       method: "PUT",
  //     });
  //   } catch (err) {}
  // }
  // edit function ends
  return (
    <section className="py-8">
      {/* <ToastContainer /> */}
      <div className="Headerpart flex items-center justify-between my-5">
        <Typography className="text-primary font-font-primary font-bold">
          Category Details
        </Typography>
        <Link to="/dashboard/category_form">
          <Button className="bg-primary text-white font-bold font-font-primary">
            Add New Category
          </Button>
        </Link>
      </div>
      {/* table header starts / search starts */}
      <div className="tableheader py-4 flex items-center justify-between md:flex-row flex-col gap-5">
        <div className="w-72">
          <Input
            label="Search Category"
            icon={<IoMdSearch />}
            onChange={handleSearch}
            className="!font-font-primary placeholder:!font-font-primary"
          />
        </div>
      </div>
      {/* table header ends / search ends */}
      {/* table starts */}
      {loading ? (
        <div className="font-font-primary text-primary text-center">
          Loading...
        </div>
      ) : categoryData && categoryData.length > 0 ? (
        <>
          <div className="font-font-primary">
            <CompactTable
              data={filteredData}
              columns={COLUMNS}
              theme={theme}
              layout={{ fixedHeader: true }}
              rowProps={ROW_PROPS}
              rowOptions={ROW_OPTIONS}
              pagination={pagination}
            />
          </div>

          <div className="flex justify-between items-center py-4 md:flex-row flex-col gap-5">
            <span className="text-primary font-font-primary font-bold">
              Total Pages: {pagination.state.getTotalPages(filteredData.nodes)}
            </span>

            <span className="text-primary font-font-primary font-bold">
              {pagination.state.getPages(filteredData.nodes).map((_, index) => (
                <Button
                  size="sm"
                  key={index}
                  className={`text-white mr-2 bg-primary font-font-primary ${
                    pagination.state.page === index
                      ? "bg-secondary underline"
                      : ""
                  } `}
                  onClick={() => pagination.fns.onSetPage(index)}
                >
                  {index + 1}
                </Button>
                // <button
                //   key={index}
                //   type="button"
                //   style={{
                //     fontWeight: pagination.state.page === index ? "bold" : "normal",
                //   }}
                //   onClick={() => pagination.fns.onSetPage(index)}
                // >
                //   {index + 1}
                // </button>
              ))}
            </span>

            <span className="text-primary font-font-primary font-bold">
              Current Page No : {pagination.state.page + 1}
            </span>
          </div>
        </>
      ) : (
        <div className="text-center text-primary font-font-primary font-bold">
          No data Found
        </div>
      )}
      {/* table ends */}
    </section>
  );
};

export default CategoryList;
