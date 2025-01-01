import React, { act, useEffect, useState } from "react";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import "./UserTable.css";
import { Button, Input, Typography } from "@material-tailwind/react";
import { usePagination } from "@table-library/react-table-library/pagination";

const UserPageList = () => {
  const [userTableData, setUserTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [ids, setIds] = useState([]);

  async function handleUserDetailsFetching() {
    setLoading(true);
    try {
      const url =
        "http://localhost/tharas_takeaway/backend/api/fetch_user_details.php";
      const response = await fetch(url, {
        method: "GET", // Explicitly specifying the method as GET
        headers: {
          "Content-Type": "application/json", // Make sure we're sending and receiving JSON
        },
      });

      if (!response.ok) {
        // Check if the response status is not OK (e.g., 500 or 404 errors)
        throw new Error(`Error fetching user details: ${response.statusText}`);
      }

      const responseData = await response.json();

      if (Array.isArray(responseData)) {
        setUserTableData(responseData); // Set the data if it's an array
      } else {
        setUserTableData([]); // If responseData is not an array, set it as empty
      }
    } catch (err) {
      // console.log("Error fetching details:", err);
      setUserTableData([]); // Optionally clear the table data on error
    } finally {
      setLoading(false); // Stop the loading state
    }
  }

  useEffect(() => {
    handleUserDetailsFetching();
  }, []);

  function handleExpand(item) {
    if (ids.includes(item.id)) {
      setIds(ids.filter((id) => id !== item.id));
    } else {
      setIds(ids.concat(item.id));
    }
  }

  function handleSearch(e) {
    setSearch(e.target.value);
  }

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
    nodes: userTableData,
  };

  //   pagination starts
  const pagination = usePagination(data, {
    state: { size: 10, page: 0 },
    onChange: onPaginationChange,
  });

  function onPaginationChange(action, state) {
    // console.log(action, state);
  }
  //   pagination ends

  //   csv process starts
  const escapeCsvCell = (cell) => {
    if (cell == null) {
      return "";
    }
    const sc = cell.toString().trim();
    if (sc === "" || sc === '""') {
      return sc;
    }
    if (
      sc.includes('"') ||
      sc.includes(",") ||
      sc.includes("\n") ||
      sc.includes("\r")
    ) {
      return '"' + sc.replace(/"/g, '""') + '"';
    }
    return sc;
  };

  const makeCsvData = (columns, data) => {
    return data.reduce((csvString, rowItem) => {
      return (
        csvString +
        columns
          .map(({ accessor }) => escapeCsvCell(accessor(rowItem)))
          .join(",") +
        "\r\n"
      );
    }, columns.map(({ name }) => escapeCsvCell(name)).join(",") + "\r\n");
  };

  const downloadAsCsv = (columns, data, filename) => {
    const csvData = makeCsvData(columns, data);
    const csvFile = new Blob([csvData], { type: "text/csv" });
    const downloadLink = document.createElement("a");

    // downloadLink.display = "none";
    downloadLink.download = filename;
    downloadLink.href = window.URL.createObjectURL(csvFile);
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const handleDownloadCsv = () => {
    const columns = [
      { accessor: (item) => item.username, name: "User Name" },
      { accessor: (item) => item.usermail, name: "User Email" },
      { accessor: (item) => item.usermobile, name: "Mobile Number" },
    ];

    downloadAsCsv(columns, userTableData, "User Details CSV");
  };
  //   csv process ends

  const filteredData = {
    nodes: userTableData.filter((item) =>
      item.username.toLowerCase().includes(search.toLowerCase())
    ),
  };

  //   console.log(filteredData);

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
              <ul className="p-5">
                <li className="flex items-center gap-3">
                  <strong className="font-font-primary text-secondary">
                    Username :
                  </strong>
                  <Typography className="font-font-primary text-primary font-semibold">
                    {item.username}
                  </Typography>
                </li>
                <li className="flex items-center gap-3">
                  <strong className="font-font-primary text-secondary">
                    User Email :
                  </strong>
                  <Typography className="font-font-primary text-primary font-semibold">
                    {item.usermail}
                  </Typography>
                </li>
                <li className="flex items-center gap-3">
                  <strong className="font-font-primary text-secondary">
                    User Mobile Number :
                  </strong>
                  <Typography className="font-font-primary text-primary font-semibold">
                    {item.usermobile}
                  </Typography>
                </li>
              </ul>
            </td>
          </tr>
        )}
      </>
    ),
  };

  const columns = [
    { label: "Username", renderCell: (item) => item.username },
    { label: "User Email", renderCell: (item) => item.usermail },
    { label: "User Mobile", renderCell: (item) => item.usermobile },
  ];

  return (
    <div className="py-8 font-font-primary !text-white h-auto px-4">
      <div className="tableheader py-4 flex items-center justify-between md:flex-row flex-col gap-5">
        <div className="w-72">
          <Input
            label="Search"
            icon={<i className="fas fa-search" />}
            onChange={handleSearch}
          />
        </div>
        <Button
          className="bg-primary text-white font-bold font-font-primary"
          size="sm"
          onClick={handleDownloadCsv}
        >
          Export as Excel
        </Button>
      </div>
      {loading ? (
        <div className="font-font-primary text-primary text-center">
          Loading...
        </div>
      ) : userTableData && userTableData.length > 0 ? (
        <CompactTable
          data={filteredData}
          columns={columns}
          theme={theme}
          layout={{ fixedHeader: true }}
          rowProps={ROW_PROPS}
          rowOptions={ROW_OPTIONS}
          pagination={pagination}
        />
      ) : (
        <div className="text-center text-primary font-font-primary font-bold">
          No data Found
        </div>
      )}

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
                pagination.state.page === index ? "bg-secondary underline" : ""
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
    </div>
  );
};

export default UserPageList;
