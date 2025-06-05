
import { createClient } from "@/utils/supabase/server";
import Footer from "./_components/Footer";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import HowItWorks from "./_components/HowItWorks";
import Pricing from "./_components/Pricing";
import Testimonials from "./_components/Testimonials";
import Features from "./_components/Features";
import TestimonialFAB from "./_components/TestimonialFAB";

const Home = async () => {
  const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen bg-white flex flex-col ">
      <Header user={user}/>
      <main className="flex-grow pt-20 w-3/4 mx-auto">
        <Hero user={user}/>
        <Features />
        <HowItWorks user={user} />
        {/* <Testimonials /> */}
        <Pricing />
      </main>
      <Footer />
      <TestimonialFAB />
    </div>
  )
};

export default Home
