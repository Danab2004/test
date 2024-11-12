import React, { useState, useEffect } from "react";
import "./GenerateForm.css";
import DropDown from "../Components/DropDown/DropDown";

const DynamicForm = ({ originalSchema }) => {
  const [schema, setSchema] = useState(originalSchema?.scheme);
  const [formData, setFormData] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    const submissionData = {
      type: originalSchema.type,
      form: formData,
    };
  };

  useEffect(() => {
    const initialFormData = {};
    Object.entries(schema).forEach(([key, value]) => {
      initialFormData[key] = value.type === "Boolean" ? false : "";

      if (Object.entries(value)[0][1] === "object") {
        Object.entries(value).forEach(([subKey, subValue]) => {
          initialFormData[subKey] = subValue.type === "Boolean" ? false : "";
        });
      }
    });

    setFormData(initialFormData);
  }, [schema]);


  const handleChange = (e, field) => {
    const value = field.type === "Boolean" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [field.name]: value });
  };

  const filterSchema = (config, name) => {
    {
      return config.type === "Enum" ? (
<DropDown id={name} formDataName={formData[name] || ""} onChange={(e) => handleChange(e, { name, type: config.type })}options={config.enumValues} />
   
      ) : config.type === "String" ? (
        <div className="field">
          <input
            type="text"
            id={name}
            value={formData[name] || ""}
            onChange={(e) => handleChange(e, { name, type: config.type })}
          />
        </div>
     
          
      ) : config.type === "number" ? (
        <div className="field">
          <input
            type="number"
            id={name}
            value={formData[name] || ""}
            onChange={(e) => handleChange(e, { name, type: config.type })}
          />
        </div>
        
      ) : config.type === "Boolean" ? (
        <div className="field">
        <input
          type="checkbox"
          id={name}
          checked={formData[name] || false}
          onChange={(e) => handleChange(e, { name, type: config.type })}
        />
        </div>
      ) : config.type === "Date" ? (
        <div className="field">
        <input
          type="date"
          id={name}
          checked={formData[name] || false}
          onChange={(e) => handleChange(e, { name, type: config.type })}
        />
        </div>
      ) : null;
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      {Object.entries(schema).flatMap(([name, config]) => {
        const isNestedObject = typeof Object.entries(config)[0][1] === "object";
        return (
          <div  className="field" key={name}>
            <label htmlFor={name}>{name}</label>
            {isNestedObject
              ? Object.entries(config).map(([innerKey, innerConfig]) => (
                  <div className="fieldInner" key={innerKey}>
                    <label htmlFor={innerKey}>
                      {innerConfig.title || innerKey}
                    </label>
                    {filterSchema(innerConfig, innerKey)}{" "}
                  </div>
                ))
              : filterSchema(config, name)}
          </div>
        );
      })}
      <button type="submit">Submit</button>
    </form>
  );
};

export default DynamicForm;
