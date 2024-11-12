import React, { useState, useRef } from 'react';
import GenerateForm from "../GenerateForm/GenerateForm";

import './Upload.css';

const Upload = () => {
  const [fileName, setFileName] = useState('');
  const [fileContent, setFileContent] = useState(null);

  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/json") {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target.result);
          setFileContent(json);
          setFileName(file.name);
          setError('');
        } catch (error) {
          alert("Invalid JSON file");
          setFileName('');
      setError('Please upload a valid .json file.');
        }
      };

      reader.readAsText(file);
    }
  };
  const handleSubmit = (values) => {
    console.log("Form data", values);
  };
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="upload-container">
 {  !fileName&&   <div className="upload-box" onClick={handleButtonClick}>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".json"
          style={{ display: 'none' }}
        />
        <p className="upload-text">
          {fileName? `Selected File: ${fileName}` : "Drag & Drop or Click to Upload JSON"}
        </p>
      </div>}
      {error && <div className="error-message">{error}</div>}
      {fileName && (
        <div className="file-content">
          <h4>:THE FORM</h4>
          <GenerateForm originalSchema={fileContent} onSubmit={handleSubmit} />
        </div>
      )}
    </div>
  );
};

export default Upload;
