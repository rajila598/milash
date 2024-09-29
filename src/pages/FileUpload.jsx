import React, { useState } from "react";
import axios from "axios";
const FileUpload = () => {
  const [image, setImage] = useState(null);
  
  const handleChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image) {
        alert("Please select an image first");
        return;
      }
  
      let formData = new FormData();
      formData.append("image", image);
  
      axios.post('https://46a1-2400-1a00-b040-edbf-39ab-91a2-784-eaf0.ngrok-free.app/docs#/default/predict_predict_post', formData)
        .then(res => {
          alert("Uploaded successfully");
        })
        .catch(err => {
          alert("Error in submission");
        });
  
      console.log(image);
    };
  
  
  return (
    <div>
       <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleChange} accept="image/*" />
        <button type="submit">Upload file</button>
      </form>
    </div>
  );
};

export default FileUpload;
