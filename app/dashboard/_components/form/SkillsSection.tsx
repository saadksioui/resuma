"use client";
import { useResume } from "@/context/ResumeContext";
import { Plus, X } from "lucide-react";
import { useState } from "react";

const SkillsSection = () => {
  const { resumeData, updateSkills } = useResume();
  const { skills } = resumeData;
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = () => {
    if (newSkill.trim() === '') return;

    const updatedSkills = [...skills, newSkill.trim()];
    updateSkills(updatedSkills);
    setNewSkill('');
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    const updatedSkills = skills.filter(skill => skill !== skillToRemove);
    updateSkills(updatedSkills);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Skills</h2>

      <div className="flex items-center mb-4">
        <input
          type="text"
          value={newSkill || ''}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Add a skill (e.g., JavaScript, Project Management)"
        />
        <button
          onClick={handleAddSkill}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-r-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="flex items-center bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
          >
            <span>{skill}</span>
            <button
              onClick={() => handleRemoveSkill(skill)}
              className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
        {skills.length === 0 && (
          <p className="text-sm text-gray-500 italic">No skills added yet.</p>
        )}
      </div>
    </div>
  );
};

export default SkillsSection
