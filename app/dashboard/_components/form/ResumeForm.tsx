"use client"
import { Save, Share2 } from "lucide-react";
import EducationSection from "./EducationSection";
import ExperienceSection from "./ExperienceSection";
import PersonalInfoSection from "./PersonalInfoSection";
import SkillsSection from "./SkillsSection";
import SocialLinksSection from "./SocialLinksSection";
import { useContext } from "react";
import { ResumeContext } from "@/context/ResumeContext";

const ResumeForm = () => {
  const { saveResume } = useContext(ResumeContext)!;

  const handleShare = () => {
    // In a real app, this would copy the link or open sharing options
    navigator.clipboard.writeText("https://resuma.io/multiversal");
  };

  return (
    <div className="h-full overflow-y-auto pb-20 md:pb-0">
      <div className="p-4 md:p-6">
        <div className="mb-6 flex flex-col gap-5 lg:gap-0 lg:flex-row justify-between items-center">
          <h1 className="text-xl font-medium text-gray-900">Resume Builder</h1>
          <div className="flex space-x-3">
            <button
              onClick={handleShare}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </button>
            <button
              onClick={saveResume}
              className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Save className="h-4 w-4 mr-2" />
              Save
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <PersonalInfoSection />
          <SkillsSection />
          <ExperienceSection />
          <EducationSection />
          <SocialLinksSection />
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:hidden">
          <button
            onClick={saveResume}
            className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
};

export default ResumeForm
