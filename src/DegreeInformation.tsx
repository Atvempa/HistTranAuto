import React, { useEffect, useState, useRef } from 'react';
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
  // Function to format the date in "Month DD, YYYY" or "Month YYYY" format
  const formatReadableDate = (dateString: string): string => {
    if (!dateString) return "";
    
    let month: number, day: number, year: number;
    
    // Check if the dateString is in a valid format
    // Handle both YYYY-MM-DD and MM/DD/YYYY formats
    if (dateString.includes('-')) {
      // YYYY-MM-DD format
      const [yearStr, monthStr, dayStr] = dateString.split('-');
      month = parseInt(monthStr, 10);
      day = parseInt(dayStr, 10);
      year = parseInt(yearStr, 10);
    } else if (dateString.includes('/')) {
      // MM/DD/YYYY format
      const [monthStr, dayStr, yearStr] = dateString.split('/');
      month = parseInt(monthStr, 10);
      day = parseInt(dayStr, 10);
      year = parseInt(yearStr, 10);
    } else {
      return "";
    }
    
    // Array of month names
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    
    // If day is 0 or "00", format the date as "Month YYYY"
    if (day === 0 || day === null) {
      return `${monthNames[month - 1]} ${year}`;
    }
    
    // Format the date as "Month DD, YYYY"
    return `${monthNames[month - 1]} ${day.toString().padStart(2, '0')}, ${year}`;
  };

  const readableDate = formatReadableDate(awardedDate);

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
      
      <div className="mb-4">
  <div className="flex items-center justify-between mb-2">
    <label className="block text-sm font-medium text-gray-700">Awarded Date</label>
    {awardedDate && (
      <span className="text-sm font-bold text-gray-800">
        {readableDate}
      </span>
    )}
  </div>
  <DateInput 
    label="" 
    value={awardedDate} 
    onChange={onDateChange} 
  />
</div>
      
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
    const outputRef = useRef<HTMLDivElement>(null);
  
    // Function to format dates in the output text
    const formatOutputText = (text: string) => {
      // Regular expression to find dates in MM/DD/YYYY format
      const dateRegex = /(\d{2})\/(\d{2})\/(\d{4})/g;
      
      // Replace dates where day is "00" with just month/year
      return text.replace(dateRegex, (match, month, day, year) => {
        if (day === "00") {
          return `${month}/${year}`;
        }
        return match;
      });
    };

    const handleCopyText = () => {
      if (outputText) {
        // Format the text before copying
        const formattedText = formatOutputText(outputText);
        
        navigator.clipboard.writeText(formattedText)
          .then(() => {
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
          })
          .catch(err => {
            console.error('Failed to copy text: ', err);
          });
      }
    };

    useEffect(() => {
      if (outputRef.current) {
        outputRef.current.scrollTop = outputRef.current.scrollHeight;
      }
    }, [outputText]);
    
    // Format the output text for display
    const displayText = formatOutputText(outputText);

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
        <div ref={outputRef} 
          className="w-full h-full p-4 bg-gray-50 border border-gray-300 rounded-md whitespace-pre-line overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
          {displayText}
        </div>
      </div>
    );
};