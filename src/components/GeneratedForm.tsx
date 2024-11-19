import React from "react";
import { useForm } from "react-hook-form";

interface Field {
  id: string;
  type: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  validation?: {
    message?: string;
    pattern?: string;
  };
}

interface Schema {
  fields: Field[];
}

interface GeneratedFormProps {
  schema: Schema;
  onSubmit: (data: any) => void;
}

const GeneratedForm: React.FC<GeneratedFormProps> = ({ schema, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {schema.fields.map((field) => {
        const validationOptions: any = {
          required: field.required,
          pattern: field.validation?.pattern
            ? new RegExp(field.validation.pattern)
            : undefined,
        };

        return (
          <div key={field.id} className="flex flex-col">
            <label htmlFor={field.id} className="font-medium">
              {field.label}
            </label>
            {field.type === "text" || field.type === "email" ? (
              <input
                id={field.id}
                {...register(field.id, validationOptions)}
                type={field.type}
                placeholder={field.placeholder}
                className="border p-2 rounded"
              />
            ) : field.type === "select" ? (
              <select
                id={field.id}
                {...register(field.id, validationOptions)}
                className="border p-2 rounded"
              >
                {field.options?.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : field.type === "radio" ? (
              field.options?.map((opt) => (
                <div key={opt.value} className="flex items-center space-x-2">
                  <input
                    {...register(field.id, validationOptions)}
                    type="radio"
                    id={`${field.id}-${opt.value}`}
                    value={opt.value}
                    className="h-4 w-4"
                  />
                  <label htmlFor={`${field.id}-${opt.value}`}>
                    {opt.label}
                  </label>
                </div>
              ))
            ) : field.type === "textarea" ? (
              <textarea
                id={field.id}
                {...register(field.id, validationOptions)}
                placeholder={field.placeholder}
                className="border p-2 rounded"
              />
            ) : null}

            {errors[field.id] && (
              <p className="text-red-500 text-sm mt-1">
                {field.validation?.message || "This field is required"}
              </p>
            )}
          </div>
        );
      })}
      <button
        type="submit"
        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
      >
        Submit
      </button>
    </form>
  );
};

export default GeneratedForm;
