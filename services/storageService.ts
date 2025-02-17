// import { supabase } from "../lib/supabaseClient";
import { supabase } from "../src/supabase";

// Bucket name (set to "logo" for consistency)
const BUCKET_NAME = "logo";

/**
 * Upload an image to Supabase Storage
 * @param file - The image file to upload
 * @param filePath - The desired storage path (e.g., "user123/profile.jpg")
 * @returns - Public URL of the uploaded image or an error
 */
export const uploadImage = async (file: File, filePath: string) => {
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file, {
      upsert: true, // Overwrite existing file if needed
    });

  if (error) {
    console.error("Error uploading image:", error.message);
    return null;
  }

  return getPublicUrl(filePath); // Return public URL after upload
};

/**
 * Get the public URL of an image
 * @param filePath - The path of the file in storage
 * @returns - Public URL of the image
 */
export const getPublicUrl = (filePath: string) => {
  return supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath).data
    .publicUrl;
};

/**
 * Delete an image from Supabase Storage
 * @param filePath - The path of the file to delete
 * @returns - Boolean indicating success or failure
 */
export const deleteImage = async (filePath: string) => {
  const { error } = await supabase.storage.from(BUCKET_NAME).remove([filePath]);

  if (error) {
    console.error("Error deleting image:", error.message);
    return false;
  }

  return true;
};
