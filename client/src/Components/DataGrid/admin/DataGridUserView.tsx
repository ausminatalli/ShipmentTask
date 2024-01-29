import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import ImageViewer from "../../Inputs/ImageViewer";
import AddModel from "../../Model/Model";
interface DataGridFormProps {
  setRequests: any;
  requests: any;
}

const DataGridUserView: React.FC<DataGridFormProps> = ({
  setRequests,
  requests,
}) => {
  const [modelOpen, setModelOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState<string>("");

  const columns: GridColDef[] = [
    {
      field: "user_id",
      headerName: "ID",
      headerClassName: "bg-blue-100",
      headerAlign: "center",
      width: 140,
      align: "center",
    },
    {
      field: "email",
      headerName: "Email",
      headerClassName: "bg-blue-100",
      headerAlign: "center",
      sortable: false,
      width: 300,
      align: "center",
    },
    {
      field: "profile_image",
      headerName: "Photo",
      headerClassName: "bg-blue-100",
      headerAlign: "center",
      width: 220,
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
      field: "mobilenumber",
      headerName: "Mobile Number",
      headerClassName: "bg-blue-100",
      headerAlign: "center",
      width: 180,
      align: "center",
    },

    {
      field: "dateofbirth",
      headerName: "BirthDate",
      headerClassName: "bg-blue-100",
      headerAlign: "center",
      width: 200,
      align: "center",
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.createdAt.toString().split("T")[0]}`,
    },
  ];

  return (
    <>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          getRowId={(r) => r.user_id}
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

export default DataGridUserView;
