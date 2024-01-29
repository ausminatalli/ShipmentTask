import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
} from "@mui/material";
import { ReactNode } from "react";

interface ModelProps {
  onClose: () => void;
  content: ReactNode;
}

const AddModel: React.FC<ModelProps> = ({ onClose, content }) => {
  return (
    <Dialog open={true} maxWidth="sm" fullWidth>
      <Box position="absolute" top={0} right={0}>
        <IconButton onClick={onClose}>
          <img width={32} height={32} src={"/deleteclose.svg"} alt="delete" />
        </IconButton>
      </Box>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <button
          className="bg-red-500 hover:bg-red-600 p-2 rounded text-white"
          onClick={() => {
            onClose();
          }}
        >
          Close
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default AddModel;
