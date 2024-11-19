import React, { useState } from 'react';
import './App.css';

interface FormField {
  id: string;
  type: string;
  label: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  placeholder?: string;
}

const formData: FormField[] = [
  {
    id: "name",
    type: "text",
    label: "Full Name",
    required: true,
    placeholder: "Enter your full name",
  },
  {
    id: "email",
    type: "email",
    label: "Email Address",
    required: true,
    placeholder: "you@example.com",
  },
  {
    id: "gender",
    type: "radio",
    label: "Gender",
    required: true,
    options: [
      { value: "male", label: "Male" },
      { value: "female", label: "Female" },
      { value: "other", label: "Other" },
    ],
  },
  {
    id: "age",
    type: "select",
    label: "Age Group",
    required: true,
    options: [
      { value: "child", label: "Child" },
      { value: "teen", label: "Teen" },
      { value: "adult", label: "Adult" },
    ],
  },
  {
    id: "comments",
    type: "textarea",
    label: "Comments",
    required: false,
    placeholder: "Enter your feedback",
  },
];

const App: React.FC = () => {
  const [formStatus, setFormStatus] = useState<string | null>(null);

  // Handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setFormStatus("Form successfully submitted! 🎉");
  };

  const renderFormField = (field: FormField) => {
    switch (field.type) {
      case 'text':
      case 'email':
        return (
          <input
            type={field.type}
            id={field.id}
            required={field.required}
            placeholder={field.placeholder}
            className="form-input"
          />
        );
      case 'radio':
        return (
          <>
            {field.options?.map(option => (
              <label key={option.value}>
                <input
                  type="radio"
                  name={field.id}
                  value={option.value}
                  required={field.required}
                />
                {option.label}
              </label>
            ))}
          </>
        );
      case 'select':
        return (
          <select id={field.id} required={field.required}>
            <option value="">Select an option</option>
            {field.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case 'textarea':
        return (
          <textarea
            id={field.id}
            required={field.required}
            placeholder={field.placeholder}
            className="form-textarea"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        {formData.map(field => (
          <div key={field.id} className="form-group">
            <label htmlFor={field.id}>{field.label}</label>
            {renderFormField(field)}
          </div>
        ))}
        <button type="submit" className="submit-btn">Submit</button>
      </form>

      {/* Display success message */}
      {formStatus && <p className="success-message">{formStatus}</p>}
    </div>
  );
};

export default App;
