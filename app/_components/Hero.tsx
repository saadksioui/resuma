"use client"
import { Button } from '@/components/ui/button';
import { User } from '@supabase/supabase-js';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useInView } from 'react-intersection-observer';

interface HeroProps {
  user: User | null;
}

const Hero = ({ user }: HeroProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="relative overflow-hidden">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Content */}
          <div
            ref={ref}
            className={`${inView ? 'animate-fade-in' : 'opacity-0'} transition-all duration-700`}
          >
            <h1 className="text-6xl font-bold text-gray-900 mb-6">
              Your Resume,{" "}
              <span className="text-blue-500">One Link Away</span>
            </h1>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Create a beautiful, shareable resume in minutes. No design skills required.
              Get noticed by recruiters with a professional, modern resume that stands out.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={user ? '/dashboard' : '/login'} className="text-xl">
                <Button>Build My Resume</Button>
              </Link>
            </div>
          </div>

          {/* Right column - Image */}
          <div
            className={`${inView ? 'animate-slide-up' : 'opacity-0 translate-y-8'} transition-all duration-700 delay-300`}
          >
            <div className="relative rounded-lg overflow-hidden">
              <Image
                src="/hero-img.png"
                alt="Resume preview"
                width={1260}
                height={750}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Background elements */}
      <div className="absolute top-0 right-0 -z-10 w-3/4 h-3/4 bg-blue-50 rounded-bl-[100px]" />
    </section>
  );
};

export default Hero;