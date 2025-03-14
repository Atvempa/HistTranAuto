import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { Dropdown, DateInput } from './input-components';
import { Copy, Check, Plus } from 'lucide-react';

interface DegreeInformationInputProps {
  degreeLevels: string[];
  majors: string[];
  options: string[];
  honorsList: string[];
  selectedDegree: string;
  selectedMajor: string;
  selectedOption: string;
  selectedHonors: string;
  awardedDate: string;
  onDegreeChange: (value: string) => void;
  onMajorChange: (value: string) => void;
  onOptionChange: (value: string) => void;
  onHonorsChange: (value: string) => void;
  onDateChange: (value: string) => void;
  onReset: () => void;
  onAddAnotherDegree: () => void;
}

interface DegreeOutputProps {
    outputText: string;
  }

export const DegreeInformationInput: React.FC<DegreeInformationInputProps> = ({
  degreeLevels,
  majors,
  options,
  honorsList,
  selectedDegree,
  selectedMajor,
  selectedOption,
  selectedHonors,
  awardedDate,
  onDegreeChange,
  onMajorChange,
  onOptionChange,
  onHonorsChange,
  onDateChange,
  onReset,
  onAddAnotherDegree
}) => {
  return (
    <div className="w-full md:w-1/2 p-6 border-r border-gray-200">
      <h2 className="text-xl font-semibold mb-4">Enter Degree Information</h2>
      
      <Dropdown 
        label="Degree Level" 
        options={degreeLevels} 
        value={selectedDegree} 
        onChange={onDegreeChange} 
      />
      
      <Dropdown 
        label="Major" 
        options={majors} 
        value={selectedMajor} 
        onChange={onMajorChange} 
      />
      
      <Dropdown 
        label="Option/Concentration" 
        options={options} 
        value={selectedOption} 
        onChange={onOptionChange} 
      />
      
      <Dropdown 
        label="Honors" 
        options={honorsList} 
        value={selectedHonors} 
        onChange={onHonorsChange} 
      />
      
      <DateInput 
        label="Awarded Date" 
        value={awardedDate} 
        onChange={onDateChange} 
      />
      
      <div className="mt-4 flex space-x-4">
    <button
      onClick={onReset}
      className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
    >
      <RefreshCw className="h-4 w-4 mr-2" />
      Reset Form
    </button>

    <button
      onClick={onAddAnotherDegree}
      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      <Plus className="h-4 w-4 mr-2" />
      Add Another Degree
    </button>
  </div>
    </div>
  );
};

export const DegreeOutput: React.FC<DegreeOutputProps> = ({ outputText }) => {
    const [copySuccess, setCopySuccess] = useState(false);
  
    const handleCopyText = () => {
      if (outputText) {
        navigator.clipboard.writeText(outputText)
          .then(() => {
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
          })
          .catch(err => {
            console.error('Failed to copy text: ', err);
          });
      }
    };
    return (
        <div className="relative w-full h-64 mb-8">
          <div className="absolute top-2 right-2 z-10">
            <button
              onClick={handleCopyText}
              disabled={!outputText}
              className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors duration-200"
              title="Copy to clipboard"
            >
              {copySuccess ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
            </button>
          </div>
          <div className="w-full h-full p-4 bg-gray-50 border border-gray-300 rounded-md whitespace-pre-line">
            {outputText}
          </div>
        </div>
      );
    };