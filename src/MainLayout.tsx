import React from 'react';
import {Link} from 'react-router-dom';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 bg-blue-600 text-white flex justify-between items-center">
          <h1 className="text-2xl font-bold">Historic Transcript Automation</h1>
          <div className="space-x-4">
            <Link to="/" className="hover:text-blue-200">Home</Link>
            <Link to="/about" className="hover:text-blue-200">About</Link>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row">
          {children}
        </div>
      </div>
    </div>
  );
};