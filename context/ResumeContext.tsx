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
        console.warn("No resume data found for this user.");
        return;
      }

      setResumeData({
        ...data,
        email: user?.email,
        phone: data.phone || "",
        city: data.city || "",
        experience: data.experience || [],
        education: data.education || [],
        socialLinks: data.social_links || [],
      });

      setPublicLink(`https://onelinkresu.me/${data.slug}`);
    };

    fetchResume();
  }, [supabase]);

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