import React, { useState } from 'react';
import { RefreshCw, Copy, Check } from 'lucide-react';
import { TermInput, YearInput } from './input-components';
import { getTermCode } from './utility-functions';

export const NoDegreeSection: React.FC = () => {
  const [startTermDigit, setStartTermDigit] = useState('');
  const [startTermType, setStartTermType] = useState<'digit' | 'month' | 'season'>('digit');
  const [startYear, setStartYear] = useState('19');
  
  const [endTermDigit, setEndTermDigit] = useState('');
  const [endTermType, setEndTermType] = useState<'digit' | 'month' | 'season'>('digit');
  const [endYear, setEndYear] = useState('19');
  
  const [noDegreeSuccess, setNoDegreeSuccess] = useState(false);

  const resetNoDegreeForm = () => {
    setStartTermDigit('');
    setStartTermType('digit');
    setStartYear('19');
    setEndTermDigit('');
    setEndTermType('digit');
    setEndYear('19');
  };

  const handleStartTermChange = (value: string, type: 'digit' | 'month' | 'season') => {
    setStartTermDigit(value);
    setStartTermType(type);
  };

  const handleEndTermChange = (value: string, type: 'digit' | 'month' | 'season') => {
    setEndTermDigit(value);
    setEndTermType(type);
  };

  const startTermCode = getTermCode(startTermDigit, startYear, startTermType);
  const endTermCode = getTermCode(endTermDigit, endYear, endTermType);
  
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
    <div className="w-full md:p-6">
      <h2 className="text-xl font-semibold mb-4">No Degree</h2>
      <div className="grid grid-cols-5 gap-8 mb-4">
        <label className="col-span-2 text-sm font-medium">Start Term & Year:</label>
        <label className="col-span-2 text-sm font-medium">End Term & Year:</label>
      </div>
      <div className="grid grid-cols-5 gap-8 mb-4">
        <div className="col-span-2 grid grid-cols-2 gap-1">
          <div className="col-span-1.4 w-27">
            <TermInput 
              value={startTermDigit} 
              onChange={handleStartTermChange}
            />
          </div>
          <div className="w-16">
            <YearInput 
              value={startYear} 
              onChange={setStartYear} 
            />
          </div>
        </div>
        <div className="col-span-2 grid grid-cols-2 gap-1">
          <div className="col-span-1.4 w-27">
            <TermInput 
              value={endTermDigit} 
              onChange={handleEndTermChange}
            />
          </div>
          <div className="w-16">
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