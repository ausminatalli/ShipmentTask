import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
// import { useNavigate } from "react-router-dom";
import apiClient from "../../../Services/apiClient";
import { toast } from "react-toastify";
import AddModel from "../../Model/Model";
import ImageViewer from "../../Inputs/ImageViewer";
// import { toast } from "react-toastify";
interface DataGridViewProps {
  setRequests: any;
  requests: any;
}
let statusData = ["Pending", "In Transit", "Delivered", "Cancelled"];

const DataGridAdminView: React.FC<DataGridViewProps> = ({
  setRequests,
  requests,
}) => {
  // const Navigate = useNavigate();
  const [modelOpen, setModelOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState<string>("");
  const columns: GridColDef[] = [
    {
      field: "owner_id",
      headerName: "Owner ID",
      headerClassName: "bg-blue-100",
      headerAlign: "center",
      width: 100,
      align: "center",
    },
    {
      field: "waybill",
      headerName: "Waybill",
      headerClassName: "bg-blue-100",
      headerAlign: "center",
      width: 100,
      align: "center",
    },
    {
      field: "customer_name",
      headerName: "Customer name",
      headerClassName: "bg-blue-100",
      headerAlign: "center",
      editable: true,
      sortable: false,
      width: 160,
      align: "center",
    },
    {
      field: "customer_address",
      headerName: "Customer Address",
      headerClassName: "bg-blue-100",
      headerAlign: "center",
      editable: true,
      width: 220,
      align: "center",
    },

    {
      field: "shipment_image",
      headerName: "Photo",
      headerClassName: "bg-blue-100",
      headerAlign: "center",
      width: 150,
      align: "center",

      renderCell: (params) => (
        <img
          src={params.value || "/No_Image_Available.jpg"}
          alt={``}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          onClick={() => {
            setSelectedImage(params.value);
            setModelOpen(true);
          }}
        />
      ),
    },
    {
      field: "customer_phone",
      headerName: "Phone",
      headerClassName: "bg-blue-100",
      headerAlign: "center",
      editable: true,
      width: 150,
      align: "center",
    },
    {
      field: "status",
      headerName: "Status",
      headerClassName: "bg-blue-100",
      headerAlign: "center",
      align: "center",
      width: 150,

      cellClassName: (params) =>
        params.row.status === "Delivered"
          ? "text-green-600 font-bold"
          : params.row.status === "Cancelled"
          ? "text-red-600 font-bold"
          : "" || params.row.status === "Pending"
          ? "text-blue-600 font-bold"
          : "" || params.row.status === "In Transit"
          ? "text-yellow-600 font-bold"
          : "",
      type: "singleSelect",
      editable: true,
      valueOptions: statusData,
    },

    {
      field: "createdAt",
      headerName: "Created At",
      headerClassName: "bg-blue-100",
      headerAlign: "center",
      width: 200,
      align: "center",
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.createdAt.toString().split("T")[0]}`,
    },
    {
      field: "actions",
      headerName: "Actions",
      headerClassName: "bg-blue-100",
      headerAlign: "center",

      width: 170,
      align: "center",
      renderCell: (params) => (
        <div className="p-2 flex gap-1">
          {/* <button
            onClick={() => handleViewOwner(params.row.owner_id)}
            className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
          >
            View
          </button> */}
          <button
            onClick={() => {
              handleUpdateStatus(params.row.shipment_id, params.row);
            }}
            rel="noopener noreferrer"
            className="px-4 py-2   rounded-lg bg-green-500 text-white hover:bg-green-600"
          >
            Save
          </button>
        </div>
      ),
    },
  ];

  // const handleViewOwner = (ownerId: string) => {
  //   // Redirect to ./ownerid with the owner_id parameter
  //   Navigate(`./${ownerId}`);
  // };

  const handleUpdateStatus = async (id: number, data: any) => {
    try {
      const ChangeStatus = await apiClient.put(`/shipment/${id}`, data);

      if (ChangeStatus.statusText === "OK") {
        toast.success("Updated Successfully");
      }
    } catch (error) {
      toast.error("Update Failed");
    }
  };
  return (
    <>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          getRowId={(r) => r.shipment_id}
          rows={requests}
          columns={columns}
          getRowHeight={() => "auto"}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[5]}
          // checkboxSelection
          disableRowSelectionOnClick
          components={{
            NoRowsOverlay: () => (
              <div className="grid h-[100%] place-items-center">No Data</div>
            ),
          }}
        />
      </Box>
      {modelOpen && (
        <AddModel
          onClose={() => {
            setModelOpen(false);
          }}
          content={
            <ImageViewer Link={selectedImage || "/No_Image_Available.jpg"} />
          }
        />
      )}
    </>
  );
};

export default DataGridAdminView;
