'use client';

// DESIGN DECISIONS:
// Layout Energy: editorial
// Depth Treatment: textured
// Divider Style: D-GRID
// Typography Personality: oversized

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Zap, 
  Shield, 
  Clock, 
  Users, 
  Layers, 
  Award, 
  Menu, 
  X, 
  Phone, 
  Mail, 
  MapPin, 
  Instagram, 
  ArrowRight, 
  CheckCheck, 
  Loader2, 
  ImageOff 
} from 'lucide-react';

// --- Types ---
interface Stat {
  number: string;
  label: string;
  icon?: React.ReactNode;
}

interface Feature {
  title: string;
  description: string;
  icon: string;
}

interface Product {
  name: string;
  description: string;
  price: string;
  image_url: string;
}

interface Testimonial {
  name: string;
  text: string;
  role: string;
}

interface Step {
  number: string;
  title: string;
  description: string;
}

// --- Hooks ---
const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
};

// --- Components ---
function SafeImage({ src, alt, fill, width, height, className, priority, fallbackClassName }: {
  src: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; priority?: boolean; fallbackClassName?: string;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-zinc-900 ${fallbackClassName ?? className ?? ''}`}>
        <ImageOff size={28} className="text-white/20" />
      </div>
    );
  }
  return (
    <Image 
      src={src} 
      alt={alt} 
      fill={fill}
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 600) : undefined}
      className={className} 
      priority={priority}
      onError={() => setError(true)} 
    />
  );
}

const IconMapper = ({ name, className }: { name: string, className?: string }) => {
  switch (name) {
    case 'Zap': return <Zap className={className} />;
    case 'Shield': return <Shield className={className} />;
    case 'Clock': return <Clock className={className} />;
    case 'Users': return <Users className={className} />;
    case 'Layers': return <Layers className={className} />;
    case 'Award': return <Award className={className} />;
    default: return <Zap className={className} />;
  }
};

const SectionDivider = () => (
  <div className="py-10 border-y border-white/10 bg-black/20">
    <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-x-12 gap-y-6 px-6">
      {['Industrial Grade', 'CNC Precision', 'Lagos Based', 'Ibadan Built', 'Corporate Ready'].map((word, i) => (
        <div key={i} className="flex items-center gap-3 text-white/40 text-[10px] font-mono tracking-[0.3em] uppercase">
          <div className="w-1 h-1 rounded-full bg-[var(--accent)]" />
          {word}
        </div>
      ))}
    </div>
  </div>
);

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  const brand = {
    name: "Signage By Timmysigns",
    tagline: "Precision in Every Pixel. Impact in Every Inch.",
    description: "Ibadan and Lagos's premier destination for bespoke industrial signage, blending clean corporate aesthetics with bold, high-impact visibility.",
    industry: "Industrial Services",
  };

  const images = [
    "https://images.unsplash.com/photo-1655732329737-6e5596a5421c",
    "https://images.unsplash.com/photo-1582012054133-1fc2552bfbc5",
    "https://images.unsplash.com/photo-1569846167660-c5ddf90b6d10",
    "https://images.unsplash.com/photo-1660117850277-1471930455f9",
    "https://images.unsplash.com/photo-1658490505550-60191ee61ec6",
    "https://images.unsplash.com/photo-1620024255646-7a08fad74f27",
  ];

  const features: Feature[] = [
    { title: "Industrial Precision", description: "State-of-the-art CNC and laser cutting for flawless finishes on every project.", icon: "Zap" },
    { title: "Clean Corporate Design", description: "Aesthetic layouts that align perfectly with your professional brand identity.", icon: "Shield" },
    { title: "Lagos-Ibadan Delivery", description: "Swift logistics and professional installation teams across two major hubs.", icon: "Clock" }
  ];

  const products: Product[] = [
    { name: "3D Backlit Lettering", description: "Premium acrylic signage with high-intensity LED illumination for 24/7 brand visibility.", price: "₦150,000", image_url: "https://images.unsplash.com/photo-1569846167660-c5ddf90b6d10" },
    { name: "Architectural Wayfinding", description: "Clean, corporate directional systems designed for modern office complexes.", price: "₦85,000", image_url: "https://images.unsplash.com/photo-1660117850277-1471930455f9" },
    { name: "Totem Pylon Displays", description: "Large-scale outdoor signage solutions for malls and corporate headquarters.", price: "₦450,000", image_url: "https://images.unsplash.com/photo-1658490505550-60191ee61ec6" },
    { name: "Industrial Safety Boards", description: "Bold, durable aluminum composite panels with UV-resistant graphics.", price: "₦45,000", image_url: "https://images.unsplash.com/photo-1620024255646-7a08fad74f27" }
  ];

  const testimonials: Testimonial[] = [
    { name: "Olumide Adeyemi", role: "Operations Manager", text: "The cleanest 3D lettering we've ever commissioned. A total game changer for our Lagos office." },
    { name: "Sarah Ifeanyi", role: "Site Director", text: "Fast, bold, and professional. Timmysigns is the only name we trust for industrial safety signage." }
  ];

  const steps: Step[] = [
    { number: "01", title: "Design Consultation", description: "We translate your brand vision into a technical signage blueprint." },
    { number: "02", title: "Precision Build", description: "Industrial grade materials meet artisanal fabrication techniques." },
    { number: "03", title: "Pro Install", description: "Our team ensures your sign is mounted with structural integrity." }
  ];

  const stats: Stat[] = [
    { number: "5.9k", label: "Followers", icon: <Users size={20} /> },
    { number: "2.7k", label: "Items Built", icon: <Layers size={20} /> },
    { number: "100%", label: "Industrial Grade", icon: <Award size={20} /> }
  ];

  // Reveal Hooks
  const heroReveal = useScrollReveal();
  const featuresReveal = useScrollReveal();
  const galleryReveal = useScrollReveal();
  const productsReveal = useScrollReveal();
  const aboutReveal = useScrollReveal();
  const processReveal = useScrollReveal();
  const testimonialsReveal = useScrollReveal();
  const contactReveal = useScrollReveal();

  return (
    <main className="min-h-screen selection:bg-[var(--accent)] selection:text-white">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[var(--primary)]/95 backdrop-blur-md shadow-2xl py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#home" className="text-2xl font-heading font-black tracking-tighter text-white">
            timmysigns<span className="text-[var(--accent)]">.</span>
          </a>
          
          <div className="hidden md:flex items-center gap-10">
            {['Showcase', 'Solutions', 'Process', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-xs uppercase tracking-[0.2em] font-bold text-white/70 hover:text-white transition-colors">
                {item}
              </a>
            ))}
            <a href="#contact" className="bg-[var(--accent)] text-white px-6 py-2.5 text-xs uppercase tracking-widest font-black rounded-sm hover:brightness-110 transition-all">
              get a quote
            </a>
          </div>

          <button onClick={() => setMobileMenu(true)} className="md:hidden text-white">
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-[60] bg-[var(--primary)] transition-transform duration-500 ${mobileMenu ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-8 flex flex-col h-full">
          <div className="flex justify-between items-center mb-20">
            <span className="text-2xl font-heading font-black tracking-tighter">timmysigns.</span>
            <button onClick={() => setMobileMenu(false)} className="text-white"><X size={32} /></button>
          </div>
          <div className="flex flex-col gap-8">
            {['Showcase', 'Solutions', 'Process', 'Contact'].map((item) => (
              <a key={item} onClick={() => setMobileMenu(false)} href={`#${item.toLowerCase()}`} className="text-4xl font-heading font-black tracking-tight lowercase">
                {item}
              </a>
            ))}
          </div>
          <div className="mt-auto pt-10 border-t border-white/10">
            <p className="text-white/40 text-sm font-mono">Based in Lagos & Ibadan</p>
          </div>
        </div>
      </div>

      {/* Section: Hero (HR-A) */}
      <section id="home" className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-[var(--primary)] via-[var(--primary)] to-emerald-950 px-6 overflow-hidden noise-bg">
        <div className="absolute top-1/4 left-1/4 w-[32rem] h-[32rem] bg-white/5 rounded-full blur-[120px] pointer-events-none animate-float" />
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-[var(--accent)]/10 rounded-full blur-[80px] pointer-events-none" />
        
        <div ref={heroReveal.ref} className={`relative z-10 text-center max-w-5xl transition-all duration-1000 ${heroReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h1 className="font-heading text-6xl md:text-[9rem] font-black text-white leading-[0.85] tracking-tighter lowercase">
            bold signs for industrial giants<span className="text-[var(--accent)]">.</span>
          </h1>
          <p className="text-white/60 mt-8 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            {brand.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12">
            <a href="#contact" className="bg-[var(--accent)] text-white px-10 py-5 font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-2xl">
              Get a Quote
            </a>
            <a href="#showcase" className="border border-white/20 text-white px-10 py-5 font-bold text-sm uppercase tracking-widest hover:bg-white/5 transition-all">
              Our Craft
            </a>
          </div>
        </div>
      </section>

      {/* Divider */}
      <SectionDivider />

      {/* Section: Features (F-ICON-GRID) */}
      <section id="features" ref={featuresReveal.ref} className="py-28 px-6 bg-[var(--primary)] noise-bg">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
            <div>
              <h2 className="font-heading text-5xl md:text-7xl font-black text-white leading-none tracking-tighter lowercase">
                why timmysigns?
              </h2>
              <p className="text-white/40 mt-4 text-lg font-mono uppercase tracking-widest">engineering meets design</p>
            </div>
            <div className="text-white/30 text-sm max-w-xs md:text-right">
              Sharp delivery across the nation, ensuring your brand stands taller than the rest.
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div 
                key={i} 
                style={{ transitionDelay: `${i * 150}ms` }}
                className={`p-10 bg-white/5 border border-white/10 group hover:border-[var(--accent)]/50 transition-all duration-500 ${featuresReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              >
                <div className="w-14 h-14 bg-[var(--accent)]/20 flex items-center justify-center text-[var(--accent)] mb-8 group-hover:bg-[var(--accent)] group-hover:text-white transition-colors duration-500">
                  <IconMapper name={f.icon} />
                </div>
                <h3 className="font-heading text-2xl font-black text-white mb-4 lowercase tracking-tight">{f.title}</h3>
                <p className="text-white/50 leading-relaxed text-sm">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section: Showcase/Gallery (Masonry) */}
      <section id="showcase" ref={galleryReveal.ref} className="py-28 px-6 bg-[var(--secondary)] noise-bg">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading text-5xl md:text-8xl font-black text-zinc-900 mb-16 leading-none tracking-tighter lowercase">
            our craft<span className="text-[var(--accent)]">.</span>
          </h2>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {images.map((src, i) => (
              <div 
                key={i} 
                className={`break-inside-avoid relative group overflow-hidden transition-all duration-700 ${galleryReveal.isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
              >
                <SafeImage 
                  src={src} 
                  alt={`Installation ${i}`} 
                  className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700" 
                />
                <div className="absolute inset-0 bg-[var(--primary)]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <span className="text-white font-mono text-[10px] uppercase tracking-widest">Installation #{i + 1042}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section: Products (P-STAGGER) */}
      <section id="solutions" ref={productsReveal.ref} className="py-28 px-6 bg-[var(--primary)] noise-bg">
        <div className="max-w-7xl mx-auto space-y-32">
          <div className="mb-20">
            <h2 className="font-heading text-5xl md:text-8xl font-black text-white leading-none tracking-tighter lowercase">
              signage solutions
            </h2>
            <p className="text-white/40 mt-6 font-mono uppercase tracking-widest">precision fabricated excellence</p>
          </div>
          
          {products.map((p, i) => (
            <div 
              key={i} 
              className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24 transition-all duration-1000 ${productsReveal.isVisible ? 'opacity-100 skew-y-0 translate-y-0' : 'opacity-0 skew-y-2 translate-y-12'}`}
            >
              <div className="w-full md:w-1/2 relative">
                <div className="aspect-[4/3] relative overflow-hidden group border border-white/10">
                  <SafeImage 
                    src={p.image_url} 
                    alt={p.name} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-1000" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className={`absolute -bottom-6 ${i % 2 === 0 ? '-right-6' : '-left-6'} bg-[var(--accent)] p-6 text-white font-black text-2xl shadow-2xl`}>
                  {p.price}
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <span className="text-[var(--accent)] font-mono text-xs font-bold tracking-[0.4em] uppercase mb-4 block">0{i+1} / Product</span>
                <h3 className="font-heading text-4xl md:text-6xl font-black text-white lowercase leading-none tracking-tight mb-6">{p.name}</h3>
                <p className="text-white/50 text-lg leading-relaxed mb-10">{p.description}</p>
                <a href="#contact" className="inline-flex items-center gap-4 text-white font-black uppercase text-sm tracking-widest group">
                  Enquire Now <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform text-[var(--accent)]" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section: About/Stats (V9) */}
      <section className="py-24 px-6 bg-[var(--secondary)] noise-bg border-y border-zinc-200">
        <div ref={aboutReveal.ref} className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="font-heading text-5xl md:text-7xl font-black text-zinc-900 leading-[0.9] tracking-tighter lowercase mb-8">
                5,974 reasons to trust us<span className="text-[var(--accent)]">.</span>
              </h2>
              <p className="text-zinc-600 text-lg leading-relaxed mb-8">
                From humble beginnings in Ibadan to servicing the corporate pulse of Lagos, Timmysigns has delivered over 2,700 custom items. We believe that clean design is the loudest way to speak.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {stats.map((s, i) => (
                <div 
                  key={i} 
                  style={{ transitionDelay: `${i * 150}ms` }}
                  className={`p-8 bg-zinc-900 text-white flex flex-col justify-between h-48 transition-all duration-1000 ${aboutReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                  <div className="text-[var(--accent)]">{s.icon}</div>
                  <div>
                    <div className="text-4xl font-heading font-black tracking-tighter">{s.number}</div>
                    <div className="text-white/40 text-[10px] uppercase font-mono tracking-widest mt-2">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section: Process (V3) */}
      <section id="process" ref={processReveal.ref} className="py-28 px-6 bg-[var(--primary)] noise-bg">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading text-5xl md:text-8xl font-black text-white text-center mb-24 tracking-tighter lowercase">
            how we work
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {steps.map((step, i) => (
              <div 
                key={i} 
                className={`relative transition-all duration-1000 delay-${i * 300} ${processReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}
              >
                <div className="text-[var(--accent)] font-black text-8xl font-heading opacity-20 absolute -top-12 -left-4">{step.number}</div>
                <div className="relative z-10 pt-10 border-t border-white/10">
                  <h3 className="font-heading text-2xl font-black text-white mb-4 lowercase tracking-tight">{step.title}</h3>
                  <p className="text-white/50 leading-relaxed text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section: Testimonials (V7) */}
      <section ref={testimonialsReveal.ref} className="py-28 bg-[var(--secondary)] noise-bg overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-20">
          <h2 className="font-heading text-5xl md:text-7xl font-black text-zinc-900 tracking-tighter lowercase leading-none">
            client impact
          </h2>
        </div>
        <div className="flex gap-6 overflow-x-auto px-6 scrollbar-hide">
          {testimonials.map((t, i) => (
            <div 
              key={i} 
              style={{ transitionDelay: `${i * 120}ms` }}
              className={`min-w-[320px] md:min-w-[450px] p-12 bg-zinc-900 text-white transition-all duration-700 ${testimonialsReveal.isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-6 blur-sm'}`}
            >
              <div className="text-[var(--accent)] text-6xl font-serif leading-none mb-6">&ldquo;</div>
              <p className="text-xl md:text-2xl font-medium leading-relaxed italic mb-10 text-zinc-200">
                {t.text}
              </p>
              <div className="flex items-center gap-4 pt-10 border-t border-white/10">
                <div className="w-12 h-12 bg-[var(--accent)]/20 border border-[var(--accent)] flex items-center justify-center font-black text-xl text-[var(--accent)]">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="font-black text-white lowercase tracking-tight text-lg">{t.name}</div>
                  <div className="text-white/40 text-xs font-mono uppercase tracking-widest mt-1">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section: Contact (C4) */}
      <section id="contact" ref={contactReveal.ref} className="py-32 px-6 bg-[var(--accent)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[linear-gradient(to_right,#00000010_1px,transparent_1px),linear-gradient(to_bottom,#00000010_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center relative z-10">
          <div className={`${contactReveal.isVisible ? 'animate-slideUp' : 'opacity-0'}`}>
            <h2 className="font-heading text-6xl md:text-9xl font-black text-black leading-[0.8] tracking-tighter lowercase mb-12">
              let&apos;s build your sign
            </h2>
            <div className="space-y-8 border-l-8 border-black/20 pl-8">
              <div className="flex items-center gap-4 text-black font-black text-xl hover:translate-x-2 transition-transform">
                <Phone size={24} /> <span>{brand.name} @ Lagos & Ibadan</span>
              </div>
              {brand.tagline && <p className="text-black/60 text-lg max-w-sm">{brand.tagline}</p>}
              <div className="flex gap-4">
                <a href="https://instagram.com/signage_by_timmysigns" className="w-12 h-12 bg-black text-white flex items-center justify-center hover:bg-white hover:text-black transition-all">
                  <Instagram size={20} />
                </a>
              </div>
            </div>
          </div>

          <div className={`transition-all duration-1000 delay-300 ${contactReveal.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            {sent ? (
              <div className="bg-white p-12 text-center shadow-2xl">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCheck size={40} />
                </div>
                <h3 className="text-3xl font-heading font-black text-zinc-900 lowercase mb-4">Request Sent</h3>
                <p className="text-zinc-500">Our fabrication team will reach out shortly to finalize your quote.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-zinc-900 p-8 md:p-12 shadow-2xl">
                <h3 className="font-heading text-2xl font-black text-white mb-8 lowercase tracking-tight">Request Fabrications</h3>
                <div className="space-y-4">
                  <input 
                    type="text" placeholder="Full Name" 
                    className="w-full bg-white/5 border border-white/10 p-4 text-white outline-none focus:border-[var(--accent)] transition-colors"
                    required onChange={e => setForm({...form, name: e.target.value})}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      type="email" placeholder="Email Address" 
                      className="w-full bg-white/5 border border-white/10 p-4 text-white outline-none focus:border-[var(--accent)] transition-colors"
                      required onChange={e => setForm({...form, email: e.target.value})}
                    />
                    <input 
                      type="tel" placeholder="Phone Number" 
                      className="w-full bg-white/5 border border-white/10 p-4 text-white outline-none focus:border-[var(--accent)] transition-colors"
                      required onChange={e => setForm({...form, phone: e.target.value})}
                    />
                  </div>
                  <textarea 
                    rows={4} placeholder="What project are you envisioning?" 
                    className="w-full bg-white/5 border border-white/10 p-4 text-white outline-none focus:border-[var(--accent)] resize-none transition-colors"
                    required onChange={e => setForm({...form, message: e.target.value})}
                  ></textarea>
                </div>
                <button 
                  disabled={loading}
                  className="w-full mt-8 bg-white text-black font-black uppercase tracking-widest py-5 hover:bg-[var(--accent)] hover:text-white transition-all disabled:opacity-50"
                >
                  {loading ? <Loader2 className="animate-spin mx-auto" /> : "Initiate Build"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-zinc-950 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="max-w-md">
            <div className="text-3xl font-heading font-black tracking-tighter mb-6 lowercase">
              timmysigns<span className="text-[var(--accent)]">.</span>
            </div>
            <p className="text-white/40 leading-relaxed mb-8">
              Lagos & Ibadan&apos;s premier signage fabricators. Engineering corporate impact through industrial precision and bespoke aesthetics.
            </p>
            <p className="text-white/20 text-xs font-mono tracking-widest uppercase">Sharp delivery, nationwide.</p>
          </div>
          
          <div className="grid grid-cols-2 gap-12">
            <div>
              <h4 className="text-white font-black uppercase text-[10px] tracking-widest mb-6">Navigation</h4>
              <ul className="space-y-4">
                {['Showcase', 'Solutions', 'Process', 'Contact'].map(link => (
                  <li key={link}>
                    <a href={`#${link.toLowerCase()}`} className="text-white/40 hover:text-[var(--accent)] transition-colors text-sm uppercase font-bold tracking-tighter">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-black uppercase text-[10px] tracking-widest mb-6">Contact</h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-white/40 text-sm">
                  <Instagram size={16} /> @signage_by_timmysigns
                </li>
                <li className="flex items-center gap-3 text-white/40 text-sm">
                  <Phone size={16} /> +234 906 954 7177
                </li>
                <li className="flex items-center gap-3 text-white/40 text-sm">
                  <MapPin size={16} /> Lagos & Ibadan, Nigeria
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-[10px] uppercase font-mono tracking-widest">
            &copy; {new Date().getFullYear()} Signage By Timmysigns. All rights reserved.
          </p>
          <div className="flex gap-8">
            <span className="text-white/20 text-[10px] uppercase font-mono tracking-widest">Privacy Policy</span>
            <span className="text-white/20 text-[10px] uppercase font-mono tracking-widest">Terms of Service</span>
          </div>
        </div>
      </footer>

    </main>
  );
}