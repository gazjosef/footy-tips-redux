import React, { useState } from "react";
import styled from "styled-components";
import { uploadImage, deleteImage } from "../services/storageService";

// Styled Components
const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  border: 1px dashed #ccc;
  padding: 1.5rem;
  border-radius: 10px;
`;

const ImagePreview = styled.img`
  max-width: 200px;
  border-radius: 10px;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #0056b3;
  }
`;

const ImageUploader: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImage(file);
    }
  };

  const handleUpload = async () => {
    if (!image) return;

    const filePath = `uploads/${image.name}`;
    const url = await uploadImage(image, filePath);

    if (url) {
      setImageUrl(url);
    }
  };

  const handleDelete = async () => {
    if (!imageUrl) return;

    const filePath = imageUrl.split(
      `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/logo/`
    )[1];

    const success = await deleteImage(filePath);
    if (success) {
      setImageUrl(null);
      setImage(null);
    }
  };

  return (
    <UploadContainer>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <Button onClick={handleUpload}>Upload</Button>
      {imageUrl && (
        <>
          <ImagePreview src={imageUrl} alt="Uploaded" />
          <Button onClick={handleDelete}>Delete</Button>
        </>
      )}
    </UploadContainer>
  );
};

export default ImageUploader;
