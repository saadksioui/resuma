"use client"
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
  fullName: "",
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

      if (userError || !user) {
        console.error("User not found or auth error:", userError);
        return;
      }


      const { data, error } = await supabase
        .from("resumes")
        .select("*, experience(*), education(*), social_links(*)")
        .eq("user_id", user.id)
        .single();

      if (error) {
        console.error("Error fetching resume:", error);
        return;
      }

      if (!data) {
        const newId = uuidv4();
        const slug = user.user_metadata.full_name?.toLowerCase().replace(/\s+/g, "-") || "my-resume";

        const newResume = {
          ...defaultResumeData,
          id: newId,
          userId: user.id,
          slug,
          fullName: user.user_metadata.full_name || "",
          email: user.email || "",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        setResumeData(newResume);
        setPublicLink(`https://resuma.me/${slug}`);
        return;
      }

      setResumeData({
        ...data,
        email: data.email || user?.email || "",
        experience: data.experience || [],
        education: data.education || [],
        socialLinks: data.social_links || [],
      });

      setPublicLink(`https://resuma.me/${data.slug}`);
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

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const saveResume = async () => {
    const {
      id, userId, fullName, title, bio, email, phone, city, skills, experience, education, socialLinks
    } = resumeData

    try {
      const { error: resumeError } = await supabase
        .from("resumes")
        .upsert({
          id,
          user_id: userId,
          slug: fullName?.trim().toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-") || uuidv4(),
          full_name: fullName,
          title,
          bio,
          email,
          phone,
          city,
          skills: JSON.stringify(skills),
          updated_at: new Date().toISOString(),
        })

      if (resumeError) throw resumeError

      await supabase.from("experience").delete().eq("resume_id", id)
      await supabase.from("education").delete().eq("resume_id", id)
      await supabase.from("social_links").delete().eq("resume_id", id)

      if (experience.length > 0) {
        const { error: expError } = await supabase.from("experience").insert(experience.map((exp) => ({
          ...exp,
          resume_id: id
        })))

        if (expError) throw expError;
      }

      if (education.length > 0) {
        const { error: eduError } = await supabase.from("education").insert(education.map((edu) => ({
          ...edu,
          resume_id: id
        })))

        if (eduError) throw eduError;
      }

      if (socialLinks.length > 0) {
        const { error: socErr } = await supabase
          .from("social_links")
          .insert(socialLinks.map((s) => ({ ...s, resume_id: id })));
        if (socErr) throw socErr;
      }

      alert("✅ Resume saved successfully!");
    } catch (error) {

      console.error("❌ Error saving resume:", error);
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