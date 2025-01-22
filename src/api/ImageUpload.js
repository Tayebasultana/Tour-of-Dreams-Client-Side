import { useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { image } from "@cloudinary/url-gen/actions/resize";

const cloudinary = new Cloudinary({
    cloud: {
      cloudName: import.meta.env.VITE_CLOUD_NAME, 
    },
    auth: {
      apiKey: import.meta.env.VITE_CLOUD_API_KEY, 
      apiSecret: import.meta.env.VITE_CLOUD_API_SECRET, 
    }
  });


const ImageUpload = () => {
  const [imageUrl, setImageUrl] = useState("");

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];

    // Form data for uploading image
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", 'tour_of_dreams');

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setImageUrl(data.secure_url);  
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageUpload} />
      {imageUrl && <AdvancedImage cldImg={cloudinary.image(imageUrl).resize(image().width(300))} />}
    </div>
  );
};

export default ImageUpload;
