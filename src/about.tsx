import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { RefreshCw, Copy, Check } from 'lucide-react';
import { Dropdown, TermInput, YearInput, DateInput } from './input-components';
import { useDropdownData } from './use-dropdown-data';
import { getTermCode } from './utility-functions';

function About() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">About This Application</h1>
        <p className="text-gray-700 mb-4">
          This application is designed to automate the generation of historic transcript entries.
          Users can enter degree details and generate formatted output that can be copied for use
          in official transcripts.
        </p>
        <p className="text-gray-700">
          The application allows users to input degree levels, majors, options, honors, and awarded dates.
          Additionally, it provides a feature for recording when no degree was awarded by specifying the
          relevant term codes.
        </p>
        <div className="mt-6">
          <Link to="/" className="text-blue-500 hover:underline">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}

export default About;