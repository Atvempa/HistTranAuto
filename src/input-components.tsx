import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';

// Custom dropdown component
export const Dropdown = ({ 
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
export const TermInput = ({ 
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
export const YearInput = ({ 
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
    
    onChange(input);
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
export const DateInput = ({ 
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