import React, { useState, useEffect } from "react";
import "./GenerateForm.css";
const DynamicForm = ({ originalSchema }) => {
  const [schema, setSchema] = useState(originalSchema?.scheme);
  const [formData, setFormData] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    const submissionData = {
      type: originalSchema.type,
      form: formData,
    };
    console.log("Form Submitted:", submissionData);
  };

  useEffect(() => {
    const initialFormData = {};
    Object.entries(schema).forEach(([key, value]) => {
      initialFormData[key] = value.type === "Boolean" ? false : "";

      if (typeof value === "object" && !Array.isArray(value)) {
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
        <select
          id={name}
          value={formData[name] || ""}
          onChange={(e) => handleChange(e, { name, type: config.type })}
        >
          <option value="">--Please choose an option--</option>
          {config.enumValues.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : config.type === "String" ? (
        <input
          type="text"
          id={name}
          value={formData[name] || ""}
          onChange={(e) => handleChange(e, { name, type: config.type })}
        />
      ) : config.type === "number" ? (
        <input
          type="number"
          id={name}
          value={formData[name] || ""}
          onChange={(e) => handleChange(e, { name, type: config.type })}
        />
      ) : config.type === "Boolean" ? (
        <input
          type="checkbox"
          id={name}
          checked={formData[name] || false}
          onChange={(e) => handleChange(e, { name, type: config.type })}
        />
      ) : config.type === "Date" ? (
        <input
          type="date"
          id={name}
          checked={formData[name] || false}
          onChange={(e) => handleChange(e, { name, type: config.type })}
        />
      ) : null;
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      {Object.entries(schema).flatMap(([name, config]) => {
        const isNestedObject = typeof Object.entries(config)[0][1] === "object";
        return (
          <div key={name}>
            <label htmlFor={name}>{name}</label>
            {isNestedObject
              ? Object.entries(config).map(([innerKey, innerConfig]) => (
                  <div key={innerKey}>
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
