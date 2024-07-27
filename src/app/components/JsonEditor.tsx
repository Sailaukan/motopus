import React, { useState, useEffect } from 'react';
import { Input } from "./ui/input";

interface JsonEditorProps {
  code: string;
  onUpdate: (newCode: string) => void;
}

const JsonEditor: React.FC<JsonEditorProps> = ({ code, onUpdate }) => {
  const [jsonData, setJsonData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const parsed = JSON.parse(code);
      setJsonData(parsed);
      setError(null);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      setError("Invalid JSON format");
    }
  }, [code]);

  const handleTextChange = (index: number, newText: string) => {
    if (jsonData && jsonData.commands) {
      const newCommands = [...jsonData.commands];
      newCommands[index] = { ...newCommands[index], props: { ...newCommands[index].props, text: newText } };
      const newJsonData = { ...jsonData, commands: newCommands };
      setJsonData(newJsonData);
      onUpdate(JSON.stringify(newJsonData));
    }
  };

  if (error) return <div className="bg-red-100 p-4 rounded-md text-red-800">{error}</div>;
  if (!jsonData) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Edit Video Text</h2>
      <div className="space-y-4">
        {jsonData.commands.map((command: any, index: number) => (
          command.type === 'text' && (
            <div key={index} className="flex flex-col space-y-2">
              <Input
                value={command.props.text}
                onChange={(e) => handleTextChange(index, e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
              />
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default JsonEditor;