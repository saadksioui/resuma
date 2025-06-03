"use client"
import { useParams } from "next/navigation";
import ResumePage from "./ResumePage";
import { ResumeTheme } from "@/types";
import { useState } from "react";
import { Moon, Sun } from "lucide-react";

const Page = () => {
  const [theme, setTheme] = useState<ResumeTheme>('light');
  const params = useParams();
  // Ensure slug is always a string
  const slugParam = params.slug;
  const slug = Array.isArray(slugParam)
    ? slugParam[0] ?? ""
    : slugParam ?? "";
  console.log(slug);

  const getThemeClasses = () => {
    if (theme === 'light') {
      return {
        resume: 'bg-white text-gray-800',
        header: 'bg-gray-100 text-gray-900',
        section: 'border-b border-gray-200',
        heading: 'text-gray-900',
        subheading: 'text-gray-700',
        text: 'text-gray-600',
        skill: 'bg-gray-200 text-gray-800',
      };
    } else {
      return {
        resume: 'bg-gray-900 text-gray-100',
        header: 'bg-gray-800 text-white',
        section: 'border-b border-gray-700',
        heading: 'text-white',
        subheading: 'text-gray-300',
        text: 'text-gray-400',
        skill: 'bg-gray-700 text-gray-100',
      };
    }
  };

  const themeClasses = getThemeClasses();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <>
      <div className="absolute top-4 right-4">
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
      <div className="flex min-h-svh w-full items-center justify-center">

        <ResumePage slug={slug} themeClasses={themeClasses} />
      </div>
    </>
  )
};

export default Page
