import React, { useRef, useEffect } from "react";

declare const cloudinary: any;
interface ImageUploaderProps {
  onUploadSuccess: (secureUrl: string) => void;
}
const ImageUploader: React.FC<ImageUploaderProps> = ({ onUploadSuccess }) => {
  const widgetRef = useRef<any>(null);

  useEffect(() => {
    widgetRef.current = cloudinary.createUploadWidget(
      {
        cloudName: "ddkwsxtmn",
        uploadPreset: "teoehra4",
        api_key: 631454258595399,
      },
      (error: any, result: any) => {
        if (!error && result && result.event === "success") {
          onUploadSuccess(result.info.secure_url);
        }
      }
    );
  }, [onUploadSuccess]);

  const handleUploadClick = () => {
    if (widgetRef.current) {
      widgetRef.current.open();
    }
  };

  return (
    <div>
      <button
        className="inline-block rounded bg-slate-600 py-2.5 px-4 text-sm font-bold  text-white hover:bg-slate-500 hover:text-white"
        onClick={handleUploadClick}
      >
        Upload
      </button>
    </div>
  );
};

export default ImageUploader;
