import React, { useState } from "react";
import GenerateForm from "../GenerateForm/GenerateForm";
import "./Upload.css"; // Import the CSS file

const FileUpload = () => {
  const [fileContent, setFileContent] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/json") {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target.result);
          setFileContent(json);
        } catch (error) {
          alert("Invalid JSON file");
        }
      };

      reader.readAsText(file);
    } else {
      alert("Please upload a valid .json file.");
    }
  };

  const handleSubmit = (values) => {
    console.log("Form data", values);
  };

  return (
    <div className="file-upload-container">
      <h3 className="file-upload-title">Upload a JSON File</h3>

      <input
        type="file"
        accept=".json"
        onChange={handleFileChange}
        className="file-input"
      />

      {fileContent && (
        <div className="file-content">
          <h4>:THE FORM</h4>
          <GenerateForm originalSchema={fileContent} onSubmit={handleSubmit} />
        </div>
      )}
    </div>
  );
};

export default FileUpload;
