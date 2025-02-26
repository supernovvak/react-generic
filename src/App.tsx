import React, { useState } from 'react';
import {MultiSelect} from "./components/Multiselect.tsx";
import {SelectBox} from "./components/SelectBox.tsx";

const App: React.FC = () => {
  // MultiSelect state and options
  const multiOptions = ["Option 1", "Option 2", "Option 3", "Option 4"];
  const [multiSelected, setMultiSelected] = useState<string[]>([]);

  // SelectBox state and options
  const selectOptions = ["Red", "Green", "Blue", "Yellow"];
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  return (
      <div className="max-w-md mx-auto mt-10 space-y-6">
        <h1 className="text-xl font-bold mb-4">Streamlit Components Demo</h1>

        {/* MultiSelect Example */}
        <div>
          <h2 className="text-lg font-medium mb-2">MultiSelect</h2>
          <MultiSelect
              options={multiOptions}
              selected={multiSelected}
              onChange={setMultiSelected}
              placeholder="Select options..."
          />
          <div className="mt-2">
            <h3 className="text-sm font-medium">Selected Options:</h3>
            <pre className="bg-gray-100 p-2 rounded">
            {JSON.stringify(multiSelected, null, 2)}
          </pre>
          </div>
        </div>

        {/* SelectBox Example */}
        <div>
          <h2 className="text-lg font-medium mb-2">SelectBox</h2>
          <SelectBox
              options={selectOptions}
              selected={selectedColor}
              onChange={setSelectedColor}
              placeholder="Select a color..."
          />
          <div className="mt-2">
            <h3 className="text-sm font-medium">Selected Color:</h3>
            <pre className="bg-gray-100 p-2 rounded">{selectedColor || "None"}</pre>
          </div>
        </div>
      </div>
  );
};

export default App;
