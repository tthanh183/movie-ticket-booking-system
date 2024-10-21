import axios from 'axios';

const CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_URL;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_PRESET;

export const uploadToCloudinary = async (file, type) => {
  const resourceType = type === 'video' ? 'video' : 'image'; 
  const folder = `movie-ticket/${type}`; 

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);
  formData.append('folder', folder);

  try {
    const response = await axios.post(
      `${CLOUDINARY_URL}/${resourceType}/upload`, 
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: false,
      }
    );

    return response.data.secure_url;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
};

