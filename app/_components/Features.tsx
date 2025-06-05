"use client"
import React from 'react';
import { useInView } from 'react-intersection-observer';
import {
  PenLine,
  Link,
  LayoutTemplate,
  FileDown
} from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, delay }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={`bg-white rounded-xl p-8 shadow-sm border border-gray-100 transition-all duration-700 delay-${delay} ${
        inView ? 'animate-fade-in' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="flex items-center gap-5 mb-4">
        <div className="bg-blue-100 p-3 rounded-lg">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const Features: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="features" className="section relative mt-20 scroll-mt-16">
      <div className="container">
        <div
          ref={ref}
          className={`text-center max-w-3xl mx-auto mb-16 ${
            inView ? 'animate-fade-in' : 'opacity-0'
          }`}
        >
          <h2 className="text-4xl font-bold mb-4">All the Tools You Need</h2>
          <p className="text-lg text-gray-600">
            One-Link Resume makes it simple to create, share, and manage your professional presence online.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8">
          <FeatureCard
            title="Simple Builder"
            description="Add your info and see it live. Our intuitive interface makes resume creation a breeze."
            icon={<PenLine className="w-6 h-6 text-blue-500" />}
            delay={100}
          />

          <FeatureCard
            title="One-Link Sharing"
            description="Get a unique URL instantly. Share your resume across platforms with a single link."
            icon={<Link className="w-6 h-6 text-blue-500" />}
            delay={200}
          />

          <FeatureCard
            title="Professional Layouts"
            description="Choose from clean, modern resume templates designed to impress employers."
            icon={<LayoutTemplate className="w-6 h-6 text-blue-500" />}
            delay={300}
          />

          {/* <FeatureCard
            title="PDF Export"
            description="Download or print your resume when needed for traditional applications."
            icon={<FileDown className="w-6 h-6 text-blue-500" />}
            delay={400}
          /> */}
        </div>
      </div>
    </section>
  );
};

export default Features;