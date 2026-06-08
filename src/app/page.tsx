import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Features from '@/components/sections/Features';
import Testimonials from '@/components/sections/Testimonials';
import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact';

const Hero = dynamic(() => import('@/components/sections/Hero'), {
  ssr: false,
  loading: () => (
    <div className="h-screen bg-zinc-950 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-brand border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

const Configurator = dynamic(() => import('@/components/sections/Configurator'), {
  ssr: false,
  loading: () => (
    <div className="py-24 flex justify-center">
      <div className="w-8 h-8 border-2 border-brand border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

export default function Home() {
  return (
    <main>
      <Navbar />
      <Suspense fallback={null}>
        <Hero />
      </Suspense>
      <Suspense fallback={null}>
        <Configurator />
      </Suspense>
      <Features />
      <Testimonials />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
