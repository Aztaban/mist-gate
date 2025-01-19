import { useUploadImageMutation } from "../features/shop/productApiSlice";

export const uploadImageAndGetPath = async (
  file: File,
  uploadImage: ReturnType<typeof useUploadImageMutation>[0]
): Promise<string> => {
  try {
    const { image: uploadedImagePath } = await uploadImage(file).unwrap();
    console.log('Image uploaded: ', uploadedImagePath);
    return uploadedImagePath;
  } catch (error) {
    throw new Error('Image upload failed');
  }
};