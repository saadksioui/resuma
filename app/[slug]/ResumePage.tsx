"use client"
import { ResumeData, ResumeTheme } from "@/types";
import { createClient } from "@/utils/supabase/client";
import { Briefcase, GraduationCap, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const ResumePage = ({ slug, themeClasses } : { slug: string, themeClasses: any }) => {
  const [resume, setResume] = useState<ResumeData>({
    id: '',
    userId: '',
    slug: '',
    createdAt: '',
    updatedAt: '',
    full_name: '',
    title: '',
    bio: '',
    email: '',
    phone: '',
    city: '',
    skills: [],
    experience: [],
    education: [],
    socialLinks: [],
  });


  const supabase = createClient();

  interface ResumeExperience {
    id: string;
    jobTitle: string;
    company: string;
    startDate: string | null;
    endDate: string | null;
    description: string;
  }





  useEffect(() => {
    const fetchResume = async () => {
    if (!slug) return;

    const { data, error } = await supabase.from("resumes").select("*, experience(*), education(*), social_links(*)").eq("slug", slug);

    if (error) {
      console.error("❌ Supabase fetch error:", error.message || error);
      return;
    }

    if (!data || data.length === 0) {
      console.warn("⚠️ No resume found for this slug.");
      return;
    }

    const resumeData = data[0];

    setResume({
      ...resumeData,
      email: resumeData.email || resumeData.user?.email || "",
      experience: resumeData.experience || [],
      education: resumeData.education || [],
      socialLinks: resumeData.social_links || [],
    });
  };

  fetchResume();
  }, [slug])

  console.log(resume.experience);


  return (
    <div className="flex-grow overflow-y-auto p-6">
      <div className={`max-w-2xl mx-auto shadow-lg rounded-lg overflow-hidden transition-colors duration-300 ${themeClasses.resume}`}>
        {/* Header */}
        <div className={`px-6 py-8 ${themeClasses.header}`}>
          <h1 className={`text-2xl font-bold ${themeClasses.heading}`}>
            {resume.full_name}
          </h1>
          <p className={`text-lg mt-1 ${themeClasses.text}`}>
            {resume.title}
          </p>
          <p className={`mt-2 text-sm ${themeClasses.text}`}>
            {resume.bio}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <div className={`inline-flex items-center text-xs ${themeClasses.text}`}>
              <Mail className="h-3 w-3 mr-1" />
              <Link href={`mailto:${resume.email}`} className="hover:underline"><span>{resume.email}</span></Link>
            </div>
            <div className={`inline-flex items-center text-xs ${themeClasses.text}`}>
              <Phone className="h-3 w-3 mr-1" />
              <span>{resume.phone}</span>
            </div>
            <div className={`inline-flex items-center text-xs ${themeClasses.text}`}>
              <MapPin className="h-3 w-3 mr-1" />
              <span>{resume.city}</span>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className={`px-6 py-4 ${themeClasses.section}`}>
          <h2 className={`text-sm font-bold mb-3 ${themeClasses.heading}`}>SKILLS</h2>
          <div className="flex flex-wrap gap-2">
            {resume.skills && resume.skills.length > 0 ? (
              resume.skills.map((skill: string, index: number) => (
                <span
                  key={index}
                  className={`px-2 py-1 rounded-full text-xs ${themeClasses.skill}`}
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className={`text-xs italic ${themeClasses.text}`}>
                No skills added
              </p>
            )}
          </div>
        </div>

        {/* Experience */}
        <div className={`px-6 py-4 ${themeClasses.section}`}>
          <h2 className={`text-sm font-bold mb-3 ${themeClasses.heading}`}>EXPERIENCE</h2>
          {resume.experience && resume.experience.length > 0 ? (
            <div className="space-y-4">
              {resume.experience.map((exp: ResumeExperience) => (
                <div key={exp.id} className="relative pl-6">
                  <Briefcase className={`absolute left-0 top-0.5 h-4 w-4 ${themeClasses.text}`} />
                  <div>
                    <h3 className={`text-sm font-medium ${themeClasses.subheading}`}>
                      {exp.jobTitle}
                    </h3>
                    <p className={`text-xs ${themeClasses.text}`}>
                      {exp.company} | {exp.startDate} - {exp.endDate || 'Present'}
                    </p>
                    <p className={`mt-1 text-xs ${themeClasses.text}`}>
                      {exp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className={`text-xs italic ${themeClasses.text}`}>
              No experience listed.
            </p>
          )}
        </div>

        {/* Education */}
        <div className={`px-6 py-4 ${themeClasses.section}`}>
          <h2 className={`text-sm font-bold mb-3 ${themeClasses.heading}`}>EDUCATION</h2>
          {resume.education && resume.education.length > 0 ? (
            <div className="space-y-4">
              {resume.education.map((edu) => (
                <div key={edu.id} className="relative pl-6">
                  <GraduationCap className={`absolute left-0 top-0.5 h-4 w-4 ${themeClasses.text}`} />
                  <div>
                    <h3 className={`text-sm font-medium ${themeClasses.subheading}`}>
                      {edu.degree}
                    </h3>
                    <p className={`text-xs ${themeClasses.text}`}>
                      {edu.institution} | {edu.startDate} - {edu.endDate}
                    </p>
                    <p className={`mt-1 text-xs ${themeClasses.text}`}>
                      {edu.notes}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className={`text-xs italic ${themeClasses.text}`}>
              No education listed.
            </p>
          )}
        </div>

        {/* Social Links */}
        <div className="px-6 py-4">
          <h2 className={`text-sm font-bold mb-3 ${themeClasses.heading}`}>LINKS</h2>
          {resume.socialLinks && resume.socialLinks.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {resume.socialLinks.map((link) => (
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
              No social links listed.
            </p>
          )}
        </div>
      </div>
    </div>
  )
};

export default ResumePage
