import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import ImageViewer from "../../Inputs/ImageViewer";
import AddModel from "../../Model/Model";
import { updateShipmentByID } from "../../../Services/apiQuery";
interface DataGridFormProps {
  setRequests: any;
  requests: any;
}
let statusData = [
  "Pending",
  "In Transit",
  "Out for Delivery",
  "Delivered",
  "Cancelled",
];

const DataGridView: React.FC<DataGridFormProps> = ({
  setRequests,
  requests,
}) => {
  const [modelOpen, setModelOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState<string>("");

  const columns: GridColDef[] = [
    {
      field: "waybill",
      headerName: "Waybill",
      headerClassName: "bg-blue-100",
      headerAlign: "center",
      width: 120,
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
          src={params.value || "No_Image_Available.jpg"}
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
          : "" || params.row.status === "Out for Delivery"
          ? "text-pink-600 font-bold"
          : "",
      type: "singleSelect",
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

      width: 180,
      align: "center",
      renderCell: (params) => (
        <div className="p-2 flex gap-1">
          <button
            onClick={() => {
              handleUpdate(params.row.shipment_id, params.row);
            }}
            rel="noopener noreferrer"
            className="px-4 py-2   rounded-lg bg-green-500 text-white hover:bg-green-600"
          >
            Save
          </button>
          {params.row.status !== "Cancelled" && (
            <button
              onClick={() =>
                handleUpdate(params.row.shipment_id, { status: "Cancelled" })
              }
              className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
            >
              Cancel
            </button>
          )}
        </div>
      ),
    },
  ];

  const handleUpdate = async (id: number, data: any) => {
    try {
      const updateData = await updateShipmentByID(id, data);
      const isCancelAction = data.status === "Cancelled";
      if (updateData.statusText === "OK") {
        toast.success(
          isCancelAction ? "Cancelled Successfully" : "Updated Successfully"
        );

        if (isCancelAction) {
          const updatedRequests = requests.filter(
            (row: { shipment_id: number }) => row.shipment_id !== id
          );
          setRequests(updatedRequests);
        }
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

export default DataGridView;
