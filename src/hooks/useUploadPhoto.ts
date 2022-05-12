import { useState } from "react";

const url = process.env.REACT_APP_CLOUDINARY_URL || "";

const useUploadPhoto = () => {
  const [photoFile, setPhotoFile] = useState<File | undefined>();

  const fetchPhoto = async () => {
    if (!photoFile) return "";

    const formData = new FormData();
    formData.append("file", photoFile);
    formData.append("upload_preset", "softservepreset");

    const data = await fetch(url, {
      method: "POST",
      body: formData,
    });

    const jsonData = await data.json();

    return `${jsonData.public_id}.${jsonData.format}`;
  };

  return {
    photoFile,
    setPhotoFile,
    fetchPhoto,
  };
};

export { useUploadPhoto };
