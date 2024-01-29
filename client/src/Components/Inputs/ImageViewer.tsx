import React from "react";

interface ImageProps {
  Link: string;
}
const ImageViewer: React.FC<ImageProps> = ({ Link }) => {
  return (
    <div className="w-full h-full">
      <img src={Link} alt="Shipment_image" />
    </div>
  );
};

export default ImageViewer;
