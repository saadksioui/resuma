"use client"
import ResumeForm from "./_components/form/ResumeForm";
import ResumePreview from "./_components/preview/ResumePreview";
import { useState } from "react";

const Dashboard = () => {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="h-[calc(100vh-8rem)]">
      {/* Desktop View: Two-column layout */}
      <div className="hidden md:flex h-full">
        <div className="w-1/2 border-r border-gray-200">
          <ResumeForm />
        </div>
        <div className="w-1/2">
          <ResumePreview />
        </div>
      </div>

      {/* Mobile View: Single column with toggle */}
      <div className="md:hidden h-full flex flex-col">
        <div className="px-4 py-2 bg-white border-b border-gray-200 flex justify-center">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              onClick={() => setShowPreview(false)}
              className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                !showPreview
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => setShowPreview(true)}
              className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                showPreview
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Preview
            </button>
          </div>
        </div>

        <div className="flex-grow overflow-hidden">
          {showPreview ? <ResumePreview /> : <ResumeForm />}
        </div>
      </div>
    </div>
  )
};

export default Dashboard
