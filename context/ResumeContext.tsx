"use client"
import { formatMonthToDate } from "@/lib/functions";
import { ResumeData, ResumeTheme } from "@/types";
import { createClient } from "@/utils/supabase/client";
import { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";



interface ResumeContextType {
  resumeData: ResumeData;
  theme: ResumeTheme;
  publicLink: string;
  updatePersonalInfo: (field: string, value: string) => void;
  updateSkills: (skills: string[]) => void;
  addExperience: () => void;
  updateExperience: (id: string, field: string, value: string) => void;
  removeExperience: (id: string) => void;
  addEducation: () => void;
  updateEducation: (id: string, field: string, value: string) => void;
  removeEducation: (id: string) => void;
  addSocialLink: () => void;
  updateSocialLink: (id: string, field: string, value: string) => void;
  removeSocialLink: (id: string) => void;
  toggleTheme: () => void;
  saveResume: () => Promise<void>;
}

const defaultResumeData: ResumeData = {
  id: "",
  userId: "",
  slug: "",
  full_name: "",
  title: "",
  bio: "",
  email: "",
  phone: "",
  city: "",
  skills: [],
  createdAt: "",
  updatedAt: "",
  experience: [],
  education: [],
  socialLinks: [],
};



export const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [theme, setTheme] = useState<ResumeTheme>('light');
  const [publicLink, setPublicLink] = useState<string>("");

  const supabase = createClient();

  useEffect(() => {

    const fetchResume = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (!user || userError) {
        console.error("❌ User not found or auth error:", userError?.message || userError);
        return;
      }


      const { data, error } = await supabase
        .from("resumes")
        .select("*, experience(*), education(*), social_links(*)")
        .eq("user_id", user.id)
        .single();

      if (error) {
        console.error("❌ Error fetching resume:", error.message || error);
        return;
      }

      if (!data || data.length === 0) {
        const baseSlug = user.user_metadata.name?.toLowerCase().replace(/\s+/g, "-") || "my-resume";

        // Check if the slug already exists for another user
        const { data: existingSlugs, error: slugError } = await supabase
          .from("resumes")
          .select("slug")
          .ilike("slug", `${baseSlug}%`);

        if (slugError) {
          console.error("❌ Error checking slug:", slugError.message);
          return;
        }

        // Create a unique slug if necessary
        let finalSlug = baseSlug;
        if (existingSlugs && existingSlugs.length > 0) {
          let counter = 1;
          const slugSet = new Set(existingSlugs.map((item) => item.slug));
          while (slugSet.has(`${baseSlug}-${counter}`)) {
            counter++;
          }
          finalSlug = `${baseSlug}-${counter}`;
        }

        // Generate new resume object
        const newId = uuidv4();
        const newResume = {
          ...defaultResumeData,
          id: newId,
          userId: user.id,
          slug: finalSlug,
          email: user.email || "",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        setResumeData(newResume);
        setPublicLink(`${process.env.NEXT_PUBLIC_LINK}/${finalSlug}`);
        return;
      }

      setResumeData({
        ...data,
        email: data.email || user?.email || "",
        experience: data.experience || [],
        education: data.education || [],
        socialLinks: data.social_links || [],
      });

      setPublicLink(`${process.env.NEXT_PUBLIC_LINK}${data.slug}`);
    };

    fetchResume();
  }, []);

  const updatePersonalInfo = (field: string, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      [field]: value,
    }));

  };

  const updateSkills = (skills: string[]) => {
    setResumeData((prev) => ({
      ...prev,
      skills,
    }));
  };

  const addExperience = () => {
    setResumeData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: uuidv4(),
          resumeId: prev.id,
          jobTitle: "",
          company: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    }));
  };

  const updateExperience = (id: string, field: string, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  const removeExperience = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }));
  };

  const addEducation = () => {
    setResumeData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: uuidv4(),
          resumeId: prev.id,
          institution: "",
          degree: "",
          startDate: "",
          endDate: "",
          notes: "",
        },
      ],
    }));
  };

  const updateEducation = (id: string, field: string, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    }));
  };

  const removeEducation = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  };

  const addSocialLink = () => {
    setResumeData((prev) => ({
      ...prev,
      socialLinks: [
        ...prev.socialLinks,
        {
          id: uuidv4(),
          resumeId: prev.id,
          type: "",
          url: "",
        },
      ],
    }));
  };

  const updateSocialLink = (id: string, field: string, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.map((link) =>
        link.id === id ? { ...link, [field]: value } : link
      ),
    }));
  };

  const removeSocialLink = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((link) => link.id !== id),
    }));
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("resume-theme");
    if (savedTheme === "dark" || savedTheme === "light") {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === "light" ? "dark" : "light";
      localStorage.setItem("resume-theme", newTheme);
      return newTheme;
    });
  };

  const saveResume = async () => {
    let {
      id, userId, full_name, title, bio, email, phone, city, skills, experience, education, socialLinks
    } = resumeData

    if (!id) id = uuidv4();
    if (!userId) {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error("❌ User not found while saving:", userError?.message || userError);
        alert("❌ Failed to save resume. User not authenticated.");
        return;
      }

      userId = user.id;
    }


    try {
      const { error: resumeError } = await supabase
        .from("resumes")
        .upsert({
          id: resumeData.id || uuidv4(),
          user_id: userId,
          slug: full_name?.trim().toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-") || uuidv4(),
          full_name: full_name,
          title,
          bio,
          email,
          phone,
          city,
          skills: skills,
          updated_at: new Date().toISOString(),
        })

      if (resumeError) throw resumeError

      await supabase.from("experience").delete().eq("resume_id", id)
      await supabase.from("education").delete().eq("resume_id", id)
      await supabase.from("social_links").delete().eq("resume_id", id)

      if (experience.length > 0) {
        const { error: expError } = await supabase
          .from("experience")
          .insert(
            experience.map((exp) => ({
              resume_id: id,
              job_title: exp.jobTitle,
              company: exp.company,
              start_date: formatMonthToDate(exp.startDate),
              end_date: formatMonthToDate(exp.endDate),
              description: exp.description,
            }))
          );

        if (expError) {
          console.error("❌ Supabase resume upsert error:", expError);
          throw expError;
        }
      }


      if (education.length > 0) {
        const { error: eduError } = await supabase.from("education").insert(education.map((edu) => ({
          resume_id: id,
          degree: edu.degree,
          institution: edu.institution,
          notes: edu.notes,
          start_date: formatMonthToDate(edu.startDate),
          end_date: formatMonthToDate(edu.endDate),
        })))

        if (eduError) {
          console.error("❌ Supabase resume upsert error:", eduError);
          throw eduError;
        }
      }

      if (socialLinks.length > 0) {
        const { error: socErr } = await supabase
          .from("social_links")
          .insert(socialLinks.map((s) => ({
            resume_id: id,
            type: s.type,
            url: s.url
          })));
        if (socErr) {
          console.error("❌ Supabase resume upsert error:", socErr);
          throw socErr;
        }
      }

      alert("✅ Resume saved successfully!");
    } catch (error: any) {
      console.error("❌ Error saving resume:", error?.message || error || "Unknown error");
      alert("❌ Failed to save resume. Check console for errors.");
    }

  }

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        theme,
        publicLink,
        updatePersonalInfo,
        updateSkills,
        addExperience,
        updateExperience,
        removeExperience,
        addEducation,
        updateEducation,
        removeEducation,
        addSocialLink,
        updateSocialLink,
        removeSocialLink,
        toggleTheme,
        saveResume: saveResume
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};