"use client";
import React from 'react';
import { Briefcase, GraduationCap, Mail, Phone, MapPin, Linkedin, Github, Instagram, Facebook, Globe } from 'lucide-react';
import PreviewControls from './PreviewControls';
import { useResume } from '@/context/ResumeContext';

const ResumePreview: React.FC = () => {
  const { resumeData, theme } = useResume();
  const { skills, experience, education, socialLinks } = resumeData;

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

  const getPlatformIcon = (platform: string) => {
    const normalizedPlatform = platform.toLowerCase();

    if (normalizedPlatform.includes('linkedin')) {
      return <Linkedin className="h-4 w-4 text-blue-600" />;
    } else if (normalizedPlatform.includes('github')) {
      return <Github className="h-4 w-4 text-gray-800" />;
    } else if (normalizedPlatform.includes('instagram')) {
      return <Instagram className="h-4 w-4 text-gray-800" />;
    } else if (normalizedPlatform.includes('facebook')) {
      return <Facebook className="h-4 w-4 text-gray-800" />;
    } else {
      return <Globe className="h-4 w-4 text-green-600" />;
    }
  };

  return (
    <div className="h-full flex flex-col">
      <PreviewControls />

      <div className="flex-grow overflow-y-auto p-6">
        <div className={`max-w-2xl mx-auto shadow-lg rounded-lg overflow-hidden transition-colors duration-300 ${themeClasses.resume}`}>
          {/* Header */}
          <div className={`px-6 py-8 ${themeClasses.header}`}>
            <h1 className={`text-2xl font-bold ${themeClasses.heading}`}>
              {resumeData.full_name || 'Your Name'}
            </h1>
            <p className={`text-lg mt-1 ${themeClasses.text}`}>
              {resumeData.title || 'Professional Title'}
            </p>
            <p className={`mt-2 text-sm ${themeClasses.text}`}>
              {resumeData.bio || 'Your professional bio will appear here.'}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <div className={`inline-flex items-center text-xs ${themeClasses.text}`}>
                <Mail className="h-3 w-3 mr-1" />
                <span>{resumeData.email}</span>
              </div>
              <div className={`inline-flex items-center text-xs ${themeClasses.text}`}>
                <Phone className="h-3 w-3 mr-1" />
                <span>{resumeData.phone}</span>
              </div>
              <div className={`inline-flex items-center text-xs ${themeClasses.text}`}>
                <MapPin className="h-3 w-3 mr-1" />
                <span>{resumeData.city}</span>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className={`px-6 py-4 ${themeClasses.section}`}>
            <h2 className={`text-sm font-bold mb-3 ${themeClasses.heading}`}>SKILLS</h2>
            <div className="flex flex-wrap gap-2">
              {skills.length > 0 ? (
                skills.map((skill, index) => (
                  <span
                    key={index}
                    className={`px-2 py-1 rounded-full text-xs ${themeClasses.skill}`}
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className={`text-xs italic ${themeClasses.text}`}>
                  Add skills to see them here.
                </p>
              )}
            </div>
          </div>

          {/* Experience */}
          <div className={`px-6 py-4 ${themeClasses.section}`}>
            <h2 className={`text-sm font-bold mb-3 ${themeClasses.heading}`}>EXPERIENCE</h2>
            {experience.length > 0 ? (
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id} className="relative pl-6">
                    <Briefcase className={`absolute left-0 top-0.5 h-4 w-4 ${themeClasses.text}`} />
                    <div>
                      <h3 className={`text-sm font-medium ${themeClasses.subheading}`}>
                        {exp.jobTitle || 'Job Title'}
                      </h3>
                      <p className={`text-xs ${themeClasses.text}`}>
                        {exp.company || 'Company'} | {exp.startDate || 'Start Date'} - {exp.endDate || 'Present'}
                      </p>
                      <p className={`mt-1 text-xs ${themeClasses.text}`}>
                        {exp.description || 'Job description will appear here.'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className={`text-xs italic ${themeClasses.text}`}>
                Add work experience to see it here.
              </p>
            )}
          </div>

          {/* Education */}
          <div className={`px-6 py-4 ${themeClasses.section}`}>
            <h2 className={`text-sm font-bold mb-3 ${themeClasses.heading}`}>EDUCATION</h2>
            {education.length > 0 ? (
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="relative pl-6">
                    <GraduationCap className={`absolute left-0 top-0.5 h-4 w-4 ${themeClasses.text}`} />
                    <div>
                      <h3 className={`text-sm font-medium ${themeClasses.subheading}`}>
                        {edu.degree || 'Degree'}
                      </h3>
                      <p className={`text-xs ${themeClasses.text}`}>
                        {edu.institution || 'Institution'} | {edu.startDate || 'Start Date'} - {edu.endDate || 'End Date'}
                      </p>
                      <p className={`mt-1 text-xs ${themeClasses.text}`}>
                        {edu.notes || 'Additional notes will appear here.'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className={`text-xs italic ${themeClasses.text}`}>
                Add education to see it here.
              </p>
            )}
          </div>

          {/* Social Links */}
          <div className="px-6 py-4">
            <h2 className={`text-sm font-bold mb-3 ${themeClasses.heading}`}>LINKS</h2>
            {socialLinks.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-xs underline ${themeClasses.subheading}`}
                  >

                    {(link.type ? link.type.charAt(0).toUpperCase() + link.type.slice(1) : 'Link')}
                  </a>
                ))}
              </div>
            ) : (
              <p className={`text-xs italic ${themeClasses.text}`}>
                Add social links to see them here.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;