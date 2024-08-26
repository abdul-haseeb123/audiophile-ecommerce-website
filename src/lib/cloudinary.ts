import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);
  const response: any = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "auto",
          folder: "audiophile",
        },
        function (error, result) {
          if (error) {
            reject(error);
            return;
          }
          resolve(result);
        },
      )
      .end(buffer);
  });
  const {
    asset_id,
    public_id,
    width,
    height,
    resource_type,
    tags,
    url,
    secure_url,
  } = response;
  const image = {
    asset_id,
    public_id,
    width,
    height,
    resource_type,
    tags,
    url,
    secure_url,
  };
  return image;
};

const removeFromCloudinary = async (publicId: string) => {
  return await cloudinary.uploader.destroy(publicId, {
    resource_type: "image",
  });
};

export { uploadOnCloudinary, removeFromCloudinary };
