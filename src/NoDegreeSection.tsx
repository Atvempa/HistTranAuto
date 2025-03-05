import React, { useState } from 'react';
import { RefreshCw, Copy, Check } from 'lucide-react';
import { TermInput, YearInput } from './input-components';
import { getTermCode } from './utility-functions';

export const NoDegreeSection: React.FC = () => {
  const [startTermDigit, setStartTermDigit] = useState('');
  const [startYear, setStartYear] = useState('19');
  const [endTermDigit, setEndTermDigit] = useState('');
  const [endYear, setEndYear] = useState('19');
  const [noDegreeSuccess, setNoDegreeSuccess] = useState(false);

  const resetNoDegreeForm = () => {
    setStartTermDigit('');
    setStartYear('19');
    setEndTermDigit('');
    setEndYear('19');
  };

  const startTermCode = getTermCode(startTermDigit, startYear);
  const endTermCode = getTermCode(endTermDigit, endYear);
  
  const noDegreeText = startTermCode && endTermCode 
    ? `No Degree Awarded, ${startTermCode} – ${endTermCode}`
    : startTermCode 
      ? `No Degree Awarded, ${startTermCode}${endTermCode ? ' – ' + endTermCode : ''}`
      : 'No Degree Awarded';

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
    <div className="w-full md: p-6">
      <h2 className="text-xl font-semibold mb-4">No Degree</h2>
      <div className="grid grid-cols-3 gap-8 mb-4">
        <label className="text-sm font-medium">Start Term & Year:</label>
        <label className="text-sm font-medium">End Term & Year:</label>
      </div>
      <div className="grid grid-cols-3 gap-8 mb-4">
        <div className="grid grid-cols-2 gap-1">
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
  );
};