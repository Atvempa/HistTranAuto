import React from 'react';
import { Link } from 'react-router-dom';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        
        {/* Header with Navigation */}
        <div className="p-6 bg-blue-600 text-white flex justify-between items-center">
          <h1 className="text-2xl font-bold">Historic Transcript Automation</h1>
          <div className="space-x-4 flex items-center">
            <Link to="/" className="hover:text-blue-200">Home</Link>
            <Link to="/about" className="hover:text-blue-200">About</Link>
            <button 
              onClick={() => window.open("https://docs.google.com/document/d/1xAvNtGIJcUwN9DQ-QaBJj9cqTof71xhvWAPDaJRySW4/edit?usp=sharing", "_blank")}
              className="px-3 py-1 border border-white rounded-md text-white hover:bg-white hover:text-blue-600 transition" > Instruction for Historic Transcripts </button>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex flex-col md:flex-row">
          {children}
        </div>
      </div>
    </div>
  );
};
