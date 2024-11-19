import React from 'react';

interface JSONEditorProps {
  jsonSchema: string;
  setJsonSchema: (value: string) => void;
}

const JSONEditor: React.FC<JSONEditorProps> = ({ jsonSchema, setJsonSchema }) => {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonSchema(event.target.value);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">JSON Editor</h2>
      <textarea
        className="w-full h-64 border border-gray-300 rounded p-2"
        value={jsonSchema}
        onChange={handleChange}
      />
    </div>
  );
};

export default JSONEditor;
