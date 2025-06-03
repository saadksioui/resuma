"use client"
import { ResumeData } from "@/types";
import { createClient } from "@/utils/supabase/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ResumePage = () => {
  const params = useSearchParams();
  const slug = params.get('slug');
  const [resume, setResume] = useState<ResumeData | null>(null)

  const supabase = createClient();

  useEffect(() => {
    if (slug) {
      fetch(`/api/resume/${slug}`)
        .then(res => res.json())
        .then(data => setResume(data))
    }
  }, [slug])

  return (
    <div>
      ResumePage
    </div>
  )
};

export default ResumePage
