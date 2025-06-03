"use client";
import React from 'react';
import { Download, Sun, Moon, Eye, Lock } from 'lucide-react';
import { useResume } from '@/context/ResumeContext';

const PreviewControls: React.FC = () => {
  const { theme, toggleTheme, publicLink } = useResume();

  const handleDownload = () => {
    // In a real app, this would generate and download a PDF
    alert('PDF download functionality would be implemented here.');
  };

  const handleViewPublic = () => {
    window.open(`${publicLink}`, '_blank');
  };

  return (
    <div className="bg-gray-100 border-b border-gray-200 p-3 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-gray-700">Theme:</span>
        <button
          onClick={toggleTheme}
          className="inline-flex items-center p-1.5 border border-gray-300 rounded-md bg-white shadow-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {theme === 'light' ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </button>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={handleViewPublic}
          className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Eye className="h-3 w-3 mr-1" />
          View Public
        </button>
        <button
          onClick={handleDownload}
          disabled
          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Download className="h-3 w-3 mr-1" />
          Download PDF
          <Lock className="h-3 w-3 ml-1" />
        </button>
      </div>
    </div>
  );
};

export default PreviewControls;