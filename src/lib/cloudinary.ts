import axios from 'axios';

export const uploadImage = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
  formData.append('folder', process.env.NEXT_PUBLIC_CLOUDINARY_IMAGE_FOLDER);
  return axios.post(process.env.NEXT_PUBLIC_CLOUDINARY_API_URL, formData)
    .then(response => {
      return response.data.url;
    })
    .catch(error => {
      console.error('Error uploading file:', error);
      throw error;
    });
};

export const uploadPdfFile = (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
    formData.append('folder', process.env.NEXT_PUBLIC_CLOUDINARY_PDF_FOLDER);    
    return axios.post(process.env.NEXT_PUBLIC_CLOUDINARY_API_URL, formData)
        .then(response => {
        return response.data.url;
        })
        .catch(error => {
        console.error('Error uploading file:', error);
        throw error;
        });
}

