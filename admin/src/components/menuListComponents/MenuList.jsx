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

const MenuList = () => {
  // all states starts
  const [search, setSearch] = useState("");
  const [ids, setIds] = useState([]);
  const [foodListData, setFoodListData] = useState([]);
  const [loading, setLoading] = useState(true);
  // all states ends

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
  async function handleFoodMenuListFetching() {
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost/tharas_takeaway/backend/api/get_menu_details_table.php"
      );
      const responseData = await response.json(); // Add 'await' here
      // console.log(responseData);
      if (Array.isArray(responseData)) {
        setFoodListData(responseData);
        // console.log(responseData);
      } else {
        setFoodListData([]);
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
    handleFoodMenuListFetching();
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
    nodes: foodListData,
  };

  const COLUMNS = [
    {
      label: "Food Image",
      renderCell: (item) => (
        <img
          src={`http://localhost/tharas_takeaway/backend/${item.foodimg}`}
          alt={item.foodname}
          width={"100px"}
          height={"100px"}
          style={{ objectFit: "cover" }}
        />
      ),
    },

    {
      label: "Food Name",
      renderCell: (item) => item.foodname,
    },
    {
      label: "Food Category",
      renderCell: (item) => item.foodcategory,
    },
    {
      label: "Food Description",
      renderCell: (item) => item.fooddesc,
    },
    {
      label: "Food Price",
      renderCell: (item) => `£ ${item.foodprice}`,
    },
  ];

  //   pagination starts
  const pagination = usePagination(data, {
    state: { size: 10, page: 0 },
    onChange: onPaginationChange,
  });

  function onPaginationChange(action, state) {
    // console.log(action, state);
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
                    Food Image :
                  </strong>
                  <img
                    src={`http://localhost/tharas_takeaway/backend/${item.foodimg}`}
                    alt={item.foodname}
                    width={"50px"}
                    height={"50px"}
                    style={{ objectFit: "cover" }}
                  />
                </li>
                <li className="flex items-center gap-3">
                  <strong className="font-font-primary text-secondary">
                    Food Name :
                  </strong>
                  <Typography className="font-font-primary text-primary font-semibold">
                    {item.foodname}
                  </Typography>
                </li>

                <li className="flex items-center gap-3">
                  <strong className="font-font-primary text-secondary">
                    Food Price :
                  </strong>
                  <Typography className="font-font-primary text-primary font-semibold">
                    £ {item.foodprice}
                  </Typography>
                </li>

                <li className="flex items-center gap-3">
                  <strong className="font-font-primary text-secondary">
                    Food Category :
                  </strong>
                  <Typography className="font-font-primary text-primary font-semibold">
                    {item.foodcategory}
                  </Typography>
                </li>

                <li className="flex items-center gap-3">
                  <strong className="font-font-primary text-secondary">
                    Food Description :
                  </strong>
                  <Typography className="font-font-primary text-primary font-semibold">
                    {item.fooddesc}
                  </Typography>
                </li>

                <li className="flex items-center gap-3">
                  <strong className="font-font-primary text-secondary">
                    Modified Date
                  </strong>
                  <Typography className="font-font-primary text-primary font-semibold">
                    {item.modifieddate}
                  </Typography>
                </li>
                <div className="editUpdataBtn flex gap-5 mt-5">
                  <form className="flex gap-5">
                    <Link to={`/dashboard/edit_menu_form/${item.id}`}>
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
    nodes: foodListData.filter(
      (item) => item.foodname.toLowerCase().includes(search.toLowerCase()) // Ensure correct key is used
    ),
  };
  // handle search function ends

  // delete function starts
  async function handleDeleteBtn(e, id) {
    e.preventDefault();
    // Log the ID to check if it's correct
    // console.log("Attempting to delete food menu item with ID:", id);

    try {
      const response = await fetch(
        `http://localhost/tharas_takeaway/backend/api/delete_food_menu.php?id=${id}`, // Include the ID in the query string
        {
          method: "DELETE", // Ensure the method is DELETE
          headers: {
            "Content-Type": "application/json", // Set the content type for JSON
          },
        }
      );

      const responseData = await response.json(); // Parse the JSON response

      if (response.ok) {
        // Update the state to remove the deleted item from the list
        setFoodListData((prevData) =>
          prevData.filter((item) => item.id !== id)
        );

        // Display a success message using toast
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

        // Scroll to the top after deletion
        window.scrollTo(0, 0);
      } else {
        // If the deletion fails, display the error message from the API
        const errorMsg =
          responseData.message || "Failed to delete the food menu item";
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

        // Scroll to the top after an error
        window.scrollTo(0, 0);
      }
    } catch (error) {
      console.error("Error while deleting food menu item:", error);

      // In case of an error with the fetch request
      toast.error("An error occurred while deleting the food menu item", {
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
  }

  // delete function ends
  return (
    <section className="py-8">
      {/* <ToastContainer /> */}
      <div className="Headerpart flex items-center justify-between my-5">
        <Typography className="text-primary font-font-primary font-bold">
          Menu Details
        </Typography>
        <Link to="/dashboard/menu_form">
          <Button className="bg-primary text-white font-bold font-font-primary">
            Add New Food to Menu List
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
      ) : foodListData && foodListData.length > 0 ? (
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

export default MenuList;
