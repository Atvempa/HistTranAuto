import React, { useState, useEffect, useRef } from 'react';
import { Search, RefreshCw, X, Copy, Check } from 'lucide-react';

// Mock data for the dropdown lists
const degreeLevel = ['Associate in Business', 'Associate in Engineering Technology', 'Associate of Science', 'Bachelor of Arts', 'Bachelor of Music', 'Bachelor of Science', 'Master of Business Administration', 'Master of Science'];

const major = ['Applied Math', 'Art', 'Business Administration', 'Chemical Engineering', 'Chemistry', 'Civil Engineering', 'Civil Engineering Technology', 'Computer Engineering', 'Computer Science', 'Education', 'Electrical Engineering', 'Electrical Engineering Technology', 'Elementary Education', 'Engineering Technology', 'English', 'Industrial Management', 'Industrial Technology', 'Management', 'Mathematics', 'Mechanical Engineering', 'Music Performance', 'Nuclear Engineering', 'Nursing', 'Physical Therapy', 'Physics', 'Plastics', 'Plastics Engineering', 'Psychology', 'Systems Engineering', 'Textile Chemistry', 'Textile Engineering'];

const option = ['Accounting', 'Banking', 'Computer', 'Computer Science', 'Data Processing', 'Elementary', 'Man Made Fibers', 'Management', 'Marketing'];

const honors = ['Cum Laude', 'Magna Cum Laude', 'Summa Cum Laude', 'High Honors', 'Honors'];

// Custom dropdown component
const Dropdown = ({ 
  label, 
  options, 
  value, 
  onChange 
}: { 
  label: string; 
  options: string[]; 
  value: string; 
  onChange: (value: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Update filtered options based on current search term
  useEffect(() => {
    const term = isEditing ? searchTerm : (value || searchTerm);
    if (term) {
      setFilteredOptions(
        options.filter(option => 
          option.toLowerCase().includes(term.toLowerCase())
        )
      );
    } else {
      setFilteredOptions(options);
    }
  }, [searchTerm, options, value, isEditing]);

  // Handle clicks outside the dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsEditing(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const resetField = () => {
    onChange('');
    setSearchTerm('');
    setIsEditing(false);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
    if (value) {
      setIsEditing(true);
      setSearchTerm(value);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsEditing(true);
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  const handleOptionSelect = (selectedOption: string) => {
    onChange(selectedOption);
    setSearchTerm('');
    setIsOpen(false);
    setIsEditing(false);
  };

  return (
    <div className="mb-4 relative" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative flex">
        <div className="relative flex-grow">
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={isEditing ? searchTerm : value}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            placeholder={`Select ${label}`}
          />
          <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <button
          onClick={resetField}
          className="ml-2 px-2 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          title="Reset field"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <div
                key={index}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleOptionSelect(option)}
              >
                {option}
              </div>
            ))
          ) : (
            <div className="p-2 text-gray-500">No options found</div>
          )}
        </div>
      )}
    </div>
  );
};

// Term input component (1-7)
const TermInput = ({ 
  value, 
  onChange 
}: { 
  value: string; 
  onChange: (value: string) => void;
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value;
    
    // Only allow digits
    input = input.replace(/\D/g, '');
    
    // Limit to 1 digit
    if (input.length > 1) {
      input = input.slice(0, 1);
    }
    
    // Ensure the digit is between 1-7
    if (input && (parseInt(input) < 1 || parseInt(input) > 7)) {
      input = '';
    }
    
    onChange(input);
  };

  return (
    <div>
      <input
        type="text"
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={value}
        onChange={handleChange}
        placeholder="1-7"
      />
    </div>
  );
};

// Year input component
const YearInput = ({ 
  value, 
  onChange 
}: { 
  value: string; 
  onChange: (value: string) => void;
}) => {
  const [displayValue, setDisplayValue] = useState(value || '');
  
  useEffect(() => {
    // Update display value when the actual value changes
    setDisplayValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value;
    
    // Only allow digits
    input = input.replace(/\D/g, '');
    
    // Limit to 4 digits
    if (input.length > 4) {
      input = input.slice(0, 4);
    }
    
    // Update the display value immediately for responsive UI
    setDisplayValue(input);
    
    // Apply the "19" prefix logic only when sending to parent
    let outputValue = input;

    onChange(outputValue);
  };

  return (
    <div>
      <input
        type="text"
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={displayValue}
        onChange={handleChange}
        placeholder="YYYY"
      />
    </div>
  );
};

// Date input component
const DateInput = ({ 
  label, 
  value, 
  onChange 
}: { 
  label: string; 
  value: string; 
  onChange: (value: string) => void;
}) => {
  // Format date as mm/dd/yyyy
  const formatDate = (input: string) => {
    let value = input.replace(/\D/g, '');
    if (value.length > 8) {
      value = value.slice(0, 8);
    }
    
    // Format as mm/dd/yyyy
    if (value.length > 4) {
      return `${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(4)}`;
    } else if (value.length > 2) {
      return `${value.slice(0, 2)}/${value.slice(2)}`;
    }
    return value;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatDate(e.target.value);
    onChange(formatted);
  };

  const resetField = () => {
    onChange('');
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="flex">
        <input
          type="text"
          className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={value}
          onChange={handleChange}
          placeholder="mm/dd/yyyy"
        />
        <button
          onClick={resetField}
          className="ml-2 px-2 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          title="Reset field"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

// Function to get term code based on input digit
const getTermCode = (digit: string, year: string): string => {
  if (!digit || !year) return '';
  
  const yearNum = parseInt(year);
  const digitNum = parseInt(digit);
  
  if (digitNum === 1) {
    return `FA${year}`;
  } else if (digitNum === 2) {
    return `SP${yearNum + 1}`;
  } else if (digitNum === 3) {
    return `WI${yearNum + 1}`;
  } else {
    return `SU${yearNum + 1}`;
  }
};

function App() {
  const [selectedDegree, setSelectedDegree] = useState('');
  const [selectedMajor, setSelectedMajor] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedHonors, setSelectedHonors] = useState('');
  const [awardedDate, setAwardedDate] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const [noDegreeSuccess, setNoDegreeSuccess] = useState(false);
  
  // No degree section states
  const [startTermDigit, setStartTermDigit] = useState('');
  const [startYear, setStartYear] = useState('19');
  const [endTermDigit, setEndTermDigit] = useState('');
  const [endYear, setEndYear] = useState('19');

  const resetForm = () => {
    setSelectedDegree('');
    setSelectedMajor('');
    setSelectedOption('');
    setSelectedHonors('');
    setAwardedDate('');
  };
  
  const resetNoDegreeForm = () => {
    setStartTermDigit('');
    setStartYear('19');
    setEndTermDigit('');
    setEndYear('19');
  };

  const degreeMap: Record<string, string> = {
    "Bachelor of Science": "BS",
    "Bachelor of Arts": "BA",
    "Master of Science": "MS",
    "Master of Business Administration": "MBA",
    "Associate of Science": "AS",
    "Associate in Business": "AB",
    "Associate in Engineering Technology": "AET",
    "Bachelor of Music": "BM",
  };

  const degreeShort = degreeMap[selectedDegree] || "";
  const awardedYear = awardedDate ? awardedDate.split("/").pop() : "";
  const formattedLine = degreeShort && selectedMajor && awardedYear 
    ? `${degreeShort}, ${selectedMajor}, ${awardedYear};` 
    : "";


  // Generate output text
  const outputText = [
    formattedLine,
    selectedDegree,
    [selectedMajor, selectedOption].filter(Boolean).join(', '),
    selectedHonors,
    awardedDate ? awardedDate : ''
  ].filter(Boolean).join('\n');
  
  // Generate term codes based on digit inputs and years
  const startTermCode = getTermCode(startTermDigit, startYear);
  const endTermCode = getTermCode(endTermDigit, endYear);
  
  // Generate no degree output text
  const noDegreeText = startTermCode && endTermCode 
    ? `No Degree Awarded, ${startTermCode} – ${endTermCode}`
    : startTermCode 
      ? `No Degree Awarded, ${startTermCode}${endTermCode ? ' – ' + endTermCode : ''}`
      : 'No Degree Awarded';

  // Handle copying the output text
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

  // Handle copying the no degree text
  const handleCopyNoDegreeText = () => {
    navigator.clipboard.writeText(noDegreeText)
      .then(() => {
        setNoDegreeSuccess(true);
        setTimeout(() => setNoDegreeSuccess(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy no degree text: ', err);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 bg-blue-600 text-white">
          <h1 className="text-2xl font-bold">Historic Transcript Automation</h1>
        </div>
        
        <div className="flex flex-col md:flex-row">
          {/* Left side - Input fields */}
          <div className="w-full md:w-1/2 p-6 border-r border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Enter Degree Information</h2>
            
            <Dropdown 
              label="Degree Level" 
              options={degreeLevel} 
              value={selectedDegree} 
              onChange={setSelectedDegree} 
            />
            
            <Dropdown 
              label="Major" 
              options={major} 
              value={selectedMajor} 
              onChange={setSelectedMajor} 
            />
            
            <Dropdown 
              label="Option" 
              options={option} 
              value={selectedOption} 
              onChange={setSelectedOption} 
            />
            
            <Dropdown 
              label="Honors" 
              options={honors} 
              value={selectedHonors} 
              onChange={setSelectedHonors} 
            />
            
            <DateInput 
              label="Awarded Date" 
              value={awardedDate} 
              onChange={setAwardedDate} 
            />
            
            <button
              onClick={resetForm}
              className="mt-4 flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset Form
            </button>
          </div>
          
          {/* Right side - Output text and No Degree section */}
          <div className="w-full md:w-1/2 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Generated Output</h2>
            </div>
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
            
            <h2 className="text-xl font-semibold mb-4">No Degree</h2>
            <div className="grid grid-cols-3 gap-8 mb-4">
              <label className="text-sm font-medium">Start Term & Year:</label>
              <label className="text-sm font-medium">End Term & Year:</label>
            </div>
            <div className="grid grid-cols-3 gap-8 mb-4">
              <div className="grid grid-cols-2 gap-1">
                {/* <label className="text-sm font-medium">Start:</label> */}
                <div className="w-16">
                  <TermInput 
                    value={startTermDigit} 
                    onChange={setStartTermDigit}
                  />
                </div>
                <div className="w-20">
                  <YearInput 
                    value={startYear} 
                    onChange={setStartYear} 
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-1">
                {/* <label className="text-sm font-medium">End:</label> */}
                <div className="w-16">
                  <TermInput 
                    value={endTermDigit} 
                    onChange={setEndTermDigit}
                  />
                </div>
                <div className="w-20">
                  <YearInput 
                    value={endYear} 
                    onChange={setEndYear} 
                  />
                </div>
              </div>
            </div>

            <div className="relative w-full mb-4">
              <div className="absolute top-2 right-2 z-10">
                <button
                  onClick={handleCopyNoDegreeText}
                  className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors duration-200"
                  title="Copy to clipboard"
                >
                  {noDegreeSuccess ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                </button>
              </div>
              <div className="w-full p-4 bg-gray-50 border border-gray-300 rounded-md">
                {noDegreeText}
              </div>
            </div>
            
            <button
              onClick={resetNoDegreeForm}
              className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset No Degree
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
