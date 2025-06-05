"use client"
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { UserPlus, Edit3, Share2 } from 'lucide-react';
import Link from 'next/link';
import { User } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';

interface StepProps {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  isLast?: boolean;
}

interface HowItWorksProps {
  user: User | null;
}

const Step: React.FC<StepProps> = ({ number, title, description, icon, isLast = false }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={`flex transition-all duration-700 ${
        inView ? 'animate-fade-in' : 'opacity-0'
      }`}
    >
      <div className="flex flex-col items-center mr-8">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-bold">
          {number}
        </div>
        {!isLast && <div className="h-full w-0.5 bg-blue-200 mt-2"></div>}
      </div>
      <div className="pb-12">
        <div className="bg-blue-100 p-3 rounded-lg inline-block mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

const HowItWorks = ({ user }: HowItWorksProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="how-it-works" className="section mt-20 scroll-mt-16">
      <div className="container">
        <div
          ref={ref}
          className={`text-center max-w-3xl mx-auto mb-16 ${
            inView ? 'animate-fade-in' : 'opacity-0'
          }`}
        >
          <h2 className="text-4xl font-bold mb-4">Three Simple Steps</h2>
          <p className="text-lg text-gray-600">
            Creating your professional online resume has never been easier
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Step
            number={1}
            title="Sign Up with your email"
            description="Create your account in seconds with just your email address. No credit card required."
            icon={<UserPlus className="w-6 h-6 text-blue-500" />}
          />

          <Step
            number={2}
            title="Fill out your resume info"
            description="Add your experience, skills, and education using our intuitive builder. See your changes in real-time."
            icon={<Edit3 className="w-6 h-6 text-blue-500" />}
          />

          <Step
            number={3}
            title="Share your custom link"
            description="Get your unique resume link and share it on job applications, social media, or with recruiters."
            icon={<Share2 className="w-6 h-6 text-blue-500" />}
            isLast
          />
        </div>

        <div className="mt-9 text-center">
          <Link href={user ? '/dashboard' : '/login'} className="text-xl">
            <Button>
              Get Started Now
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;