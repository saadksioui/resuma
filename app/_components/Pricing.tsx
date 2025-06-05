"use client"
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Check } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { User } from '@supabase/supabase-js';

const Pricing = ({ user }: { user: User | null }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="pricing" className="section my-20 scroll-mt-16">
      <div className="container">
        <div
          ref={ref}
          className={`text-center max-w-3xl mx-auto mb-16 ${inView ? 'animate-fade-in' : 'opacity-0'
            }`}
        >
          <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-lg text-gray-600">
            Get started for free today. Pro features coming soon.
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          <div
            className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-700 delay-200 ${inView ? 'animate-fade-in' : 'opacity-0 translate-y-8'
              }`}
          >
            <div className="bg-blue-500 p-6 text-white text-center">
              <h3 className="text-2xl font-bold">Free</h3>
              <div className="mt-4 flex justify-center items-end">
                <span className="text-5xl font-bold">$0</span>
                <span className="ml-1 text-blue-100">/month</span>
              </div>
            </div>

            <div className="p-8">
              <ul className="space-y-4">
                {[
                  'One professional resume',
                  'Custom shareable link',
                  /* 'Basic templates', */
                  'Real-time editor',
                  'Mobile-responsive design'
                ].map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex items-center justify-center">
                <Link href={user ? '/dashboard' : '/login'} className="text-xl">
                  <Button>
                    Get Started Now
                  </Button>
                </Link>
              </div>

              <p className="mt-6 text-center text-sm text-gray-500">
                Pro themes and PDF export coming soon
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;