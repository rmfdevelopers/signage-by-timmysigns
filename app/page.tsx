'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Zap, 
  Sun, 
  Shield, 
  CheckCheck, 
  ArrowRight, 
  Phone, 
  Mail, 
  MapPin, 
  Loader2, 
  ImageOff, 
  Menu, 
  X,
  Instagram,
  Users,
  Package,
  Award
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: editorial
// Depth Treatment: layered
// Divider Style: D-STAT
// Typography Personality: oversized

const brand = {
  name: "Signage By Timmysigns",
  tagline: "Engineering Impact. Building Brands.",
  description: "The premier choice for high-impact industrial signage in Ibadan and Lagos. We transform corporate identities into physical landmarks through precision engineering and bold design.",
  industry: "services",
  region: "nigeria",
  currency: "₦"
};

const contact = {
  whatsapp: "2349069547177",
  instagram: "@signage_by_timmysigns",
  email: "",
  address: "Ibadan & Lagos, Nigeria"
};

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1604638823265-1cabe872a94a?q=80&w=1080",
  products: [
    "https://images.unsplash.com/photo-1663493257142-f73a6122422e?q=80&w=1080",
    "https://images.unsplash.com/photo-1702302530773-060186617af4?q=80&w=1080",
    "https://images.unsplash.com/photo-1651916726748-ab2f3dd4408f?q=80&w=1080",
    "https://images.unsplash.com/photo-1770816306327-0c6441e2149c?q=80&w=1080",
    "https://images.unsplash.com/photo-1487706753755-b88e9d9c08af?q=80&w=1080",
    "https://images.unsplash.com/photo-1760820708737-d204f21bc602?q=80&w=1080"
  ]
};

const products = [
  { name: "3D LED Channel Letters", description: "High-visibility illuminated signage for storefronts and corporate facades.", price: "₦250,000" },
  { name: "Acrylic Reception Signage", description: "Laser-cut premium acrylic signs with brushed aluminum stand-offs.", price: "₦85,500" },
  { name: "Monolith Pylon Signs", description: "Freestanding industrial landmarks for shopping malls and gas stations.", price: "₦1,200,000" }
];

const features = [
  { title: "Precision Cutting", description: "CNC and Laser technology ensuring every edge is sharp and every curve is perfect.", icon: Zap },
  { title: "Day-Night Visibility", description: "Energy-efficient LED modules that ensure your brand shines 24/7.", icon: Sun },
  { title: "Industrial Durability", description: "Weather-resistant materials built to withstand the Nigerian climate.", icon: Shield }
];

const testimonials = [
  { name: "Oluwaseun Adeyemi", text: "The 3D signage in our Lagos HQ completely changed how clients perceive us. Absolute precision.", role: "Operations Director" },
  { name: "Ibrahim Musa", text: "Best in Ibadan. Their turnaround time on industrial pylons is unmatched in the industry.", role: "Real Estate Developer" }
];

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
  }, []);
  return { ref, isVisible };
};

function SafeImage({ src, alt, fill, width, height, className, priority, fallbackClassName }: {
  src: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; priority?: boolean; fallbackClassName?: string;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br
        from-[var(--primary)]/60 to-[var(--accent)]/10 ${fallbackClassName ?? className ?? ''}`}>
        <ImageOff size={28} className="text-white/20" />
      </div>
    );
  }
  return (
    <Image src={src} alt={alt} fill={fill}
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 600) : undefined}
      className={className} priority={priority}
      onError={() => setError(true)} />
  );
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const heroReveal = useScrollReveal();
  const galleryReveal = useScrollReveal(0.05);
  const featuresReveal = useScrollReveal();
  const aboutReveal = useScrollReveal();
  const productsReveal = useScrollReveal();
  const testReveal = useScrollReveal();
  const contactReveal = useScrollReveal();

  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  return (
    <main className="relative overflow-hidden">
      {/* HEADER */}
      <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 px-6 py-4 ${scrolled ? 'bg-[var(--primary)]/95 backdrop-blur-xl shadow-2xl py-3' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="#home" className="group flex items-center gap-2">
            <div className="w-10 h-10 bg-[var(--accent)] flex items-center justify-center rounded-lg font-black text-white text-xl">T</div>
            <span className="font-heading font-black text-xl tracking-tighter uppercase hidden sm:block">Signage By Timmysigns</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {['Home', 'Gallery', 'About', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-semibold tracking-widest uppercase text-white/70 hover:text-[var(--accent)] transition-colors">
                {item}
              </a>
            ))}
            <a href="#contact" className="bg-[var(--accent)] text-white px-6 py-2.5 rounded-full font-bold text-sm hover:scale-105 transition-transform">
              Work With Us
            </a>
          </div>

          <button onClick={() => setMenuOpen(true)} className="md:hidden text-white">
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div className={`fixed inset-0 z-[200] bg-[var(--primary)] transition-transform duration-500 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-12">
            <div className="w-10 h-10 bg-[var(--accent)] flex items-center justify-center rounded-lg font-black text-white text-xl">T</div>
            <button onClick={() => setMenuOpen(false)} className="text-white">
              <X size={32} />
            </button>
          </div>
          <div className="flex flex-col gap-8">
            {['Home', 'Gallery', 'About', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="text-4xl font-heading font-black tracking-tighter text-white">
                {item}
              </a>
            ))}
          </div>
          <div className="mt-auto border-t border-white/10 pt-8 pb-12">
            <p className="text-white/40 text-sm mb-4">Nigeria's industrial choice.</p>
            <div className="flex gap-4">
              {contact.whatsapp && <Phone size={20} className="text-[var(--accent)]" />}
              {contact.instagram && <Instagram size={20} className="text-[var(--accent)]" />}
            </div>
          </div>
        </div>
      </div>

      {/* HERO SECTION - HR-A Variant (Modified to vibe with brief) */}
      <section id="home" ref={heroReveal.ref} className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-[var(--primary)] via-[var(--primary)]/90 to-[var(--accent)]/10 px-6 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[32rem] h-[32rem] bg-[var(--accent)]/5 rounded-full blur-[120px] pointer-events-none animate-float" />
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-[var(--accent)]/5 rounded-full blur-[80px] pointer-events-none" />
        
        <div className={`relative z-10 text-center max-w-5xl transition-all duration-1000 ${heroReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h1 className="font-heading text-6xl md:text-[9vw] font-black text-white leading-[0.85] tracking-tighter uppercase">
            BOLD SIGNS.<br />BIGGER IMPACT.
          </h1>
          <p className="text-white/60 mt-10 text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed font-medium">
            Custom industrial signage solutions for corporate leaders in Ibadan and Lagos. Oshey, Timmysigns—sharp delivery nationwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center mt-12">
            <a href="#contact" className="bg-[var(--accent)] text-white px-10 py-5 font-black text-lg hover:brightness-110 hover:scale-105 transition-all duration-300 rounded-full shadow-[0_0_30px_rgba(192,57,43,0.3)]">
              Start Your Project
            </a>
            <a href="#gallery" className="border border-white/20 text-white px-10 py-5 font-bold text-lg hover:bg-white/10 transition-all duration-300 rounded-full backdrop-blur-md">
              View Our Work
            </a>
          </div>
        </div>
      </section>

      {/* GALLERY SECTION - Masonry (V7 Reveal) */}
      <section id="gallery" ref={galleryReveal.ref} className="py-28 px-6 bg-[var(--secondary)]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <h2 className="font-heading text-5xl md:text-7xl font-black text-[var(--primary)] leading-none tracking-tighter uppercase">
                The Editorial Series
              </h2>
              <p className="text-[var(--primary)]/60 mt-4 text-xl max-w-lg">A showcase of our most ambitious installations across Nigeria.</p>
            </div>
            <div className="h-px bg-[var(--primary)]/20 flex-1 mx-8 hidden lg:block" />
          </div>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {IMAGES.products.map((src, i) => (
              <div 
                key={i} 
                className={`break-inside-avoid group relative rounded-2xl overflow-hidden shadow-xl transition-all duration-700 ${galleryReveal.isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-12 blur-sm'}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <SafeImage src={src} alt={`Project ${i + 1}`} width={600} height={800} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <p className="text-white font-heading font-black text-lg tracking-widest uppercase">Nigerian Standard 0{i + 1}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION - F-ICON-GRID (V4 Reveal) */}
      <section id="features" ref={featuresReveal.ref} className="py-28 px-6 bg-[var(--primary)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-heading text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">
              Engineered Excellence
            </h2>
            <p className="text-white/40 mt-4 text-xl">Why top-tier Nigerian brands trust Timmysigns.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div 
                key={i} 
                className={`p-10 rounded-3xl border border-white/10 bg-white/5 hover:bg-white/[0.08] hover:border-[var(--accent)]/30 transition-all duration-500 group relative overflow-hidden ${featuresReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent)]/10 blur-3xl rounded-full -mr-10 -mt-10" />
                <div className="mb-8 text-[var(--accent)] group-hover:scale-110 transition-transform duration-500 inline-block p-4 bg-[var(--accent)]/10 rounded-2xl">
                  {i === 0 && <Zap size={36} />}
                  {i === 1 && <Sun size={36} />}
                  {i === 2 && <Shield size={36} />}
                </div>
                <h3 className="font-heading font-black text-3xl text-white tracking-tight mb-4 uppercase">{f.title}</h3>
                <p className="text-white/50 text-lg leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION - EDITORIAL SPLIT (V3 Reveal) */}
      <section id="about" ref={aboutReveal.ref} className="py-28 px-6 bg-[var(--secondary)] overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className={`transition-all duration-1000 ${aboutReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-[30px_30px_0px_var(--primary)] mb-10 md:mb-0">
              <SafeImage src={IMAGES.hero} alt="About" fill className="object-cover" />
              <div className="absolute inset-0 bg-[var(--primary)]/20" />
            </div>
          </div>
          <div className={`transition-all duration-1000 delay-300 ${aboutReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
            <h2 className="font-heading text-5xl md:text-7xl font-black text-[var(--primary)] leading-none tracking-tighter uppercase mb-8">
              2.7k Items Crafted to Perfection
            </h2>
            <p className="text-[var(--primary)]/70 text-xl leading-relaxed mb-10">
              With a massive community of 5.9 million followers and thousands of successful projects, we've defined the visual landscape of corporate Nigeria. Our process combines industrial grit with clean corporate aesthetics.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-[var(--primary)]/10">
              <div>
                <p className="font-heading text-4xl font-black text-[var(--accent)] leading-none">5.9M+</p>
                <p className="text-[var(--primary)]/50 uppercase tracking-widest text-xs font-bold mt-2">Global Followers</p>
              </div>
              <div>
                <p className="font-heading text-4xl font-black text-[var(--accent)] leading-none">12+</p>
                <p className="text-[var(--primary)]/50 uppercase tracking-widest text-xs font-bold mt-2">Years Experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* D-STAT DIVIDER */}
      <div className="bg-[var(--accent)] py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/20 text-center">
          {[
            { number: '5.9M+', label: 'Global Followers', icon: Users },
            { number: '2,700+', label: 'Items Delivered', icon: Package },
            { number: '100%', label: 'Precision Built', icon: Award }
          ].map((s, i) => (
            <div key={i} className="px-8 py-6 group">
              <div className="flex justify-center mb-4 text-white/50 group-hover:text-white transition-colors">
                <s.icon size={24} />
              </div>
              <p className="text-5xl font-heading font-black text-white tracking-tighter">{s.number}</p>
              <p className="text-white/60 text-sm mt-2 font-bold uppercase tracking-[0.2em]">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* PRODUCTS SECTION - P-STAGGER (V2 Reveal) */}
      <section id="products" ref={productsReveal.ref} className="py-28 px-6 bg-[var(--primary)] overflow-hidden">
        <div className="max-w-6xl mx-auto space-y-24">
          <div className="text-center max-w-3xl mx-auto mb-20">
             <h2 className="font-heading text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">Signature Series</h2>
             <p className="text-white/40 mt-6 text-xl">Explore our flagship industrial-grade signage solutions.</p>
          </div>
          {products.map((p, i) => (
            <div 
              key={i} 
              className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-20 transition-all duration-700 ease-out ${productsReveal.isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="w-full md:w-1/2 relative group">
                <div className="aspect-video relative rounded-[2rem] overflow-hidden shadow-2xl">
                  <SafeImage src={IMAGES.products[i] || IMAGES.hero} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                <div className={`absolute -bottom-6 ${i % 2 === 0 ? '-right-6' : '-left-6'} w-3/4 h-3/4 bg-[var(--accent)]/10 rounded-3xl -z-10 blur-3xl`} />
              </div>
              <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'text-left' : 'md:text-right'}`}>
                <span className="font-heading text-[var(--accent)] text-lg font-black tracking-widest uppercase mb-4 block">Series 0{i + 1}</span>
                <h3 className="font-heading text-4xl md:text-6xl font-black text-white leading-none tracking-tighter uppercase">{p.name}</h3>
                <p className="text-white/50 mt-6 text-xl leading-relaxed">{p.description}</p>
                <div className="mt-8 flex flex-col gap-6">
                  <span className="text-4xl font-heading font-black text-white">{p.price}</span>
                  <a href="#contact" className="bg-white text-[var(--primary)] px-8 py-4 rounded-full font-black text-lg w-fit hover:bg-[var(--accent)] hover:text-white transition-all duration-300">
                    Order Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS SECTION - T-SPOTLIGHT (V4 Reveal) */}
      <section ref={testReveal.ref} className="py-28 px-6 bg-[var(--secondary)]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading text-5xl md:text-7xl font-black text-[var(--primary)] leading-none tracking-tighter uppercase mb-20">Voice of the Client</h2>
          <div className="space-y-12">
            {testimonials.map((t, i) => (
              <div 
                key={i} 
                className={`relative py-12 px-10 rounded-[3rem] border border-[var(--primary)]/10 bg-white shadow-xl transition-all duration-700 ${testReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${i * 200}ms` }}
              >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-[var(--accent)] flex items-center justify-center text-white shadow-lg">
                  <span className="text-4xl font-black leading-none mt-2">“</span>
                </div>
                <p className="text-[var(--primary)]/80 text-2xl md:text-3xl font-medium italic leading-relaxed">{t.text}</p>
                <div className="mt-10 flex items-center justify-center gap-5">
                  <div className="w-16 h-16 rounded-full bg-[var(--primary)]/5 flex items-center justify-center text-[var(--primary)] font-black text-2xl border-2 border-[var(--primary)]/10">
                    {t.name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <p className="font-heading font-black text-xl text-[var(--primary)] uppercase tracking-tight">{t.name}</p>
                    <p className="text-[var(--primary)]/50 font-bold text-sm uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION - C3 Variant (V5 Reveal) */}
      <section id="contact" ref={contactReveal.ref} className="py-28 px-6 bg-[var(--primary)]">
        <div className={`max-w-4xl mx-auto text-center transition-all duration-700 ${contactReveal.isVisible ? 'opacity-100 skew-y-0 translate-y-0' : 'opacity-0 skew-y-2 translate-y-8'}`}>
          <h2 className="font-heading text-6xl md:text-[8vw] font-black text-white leading-none tracking-tighter uppercase mb-6">Let's Build Your Landmark</h2>
          <p className="text-white/40 mb-16 text-xl max-w-2xl mx-auto">From concept drawing to illuminated reality—we engineer the impact your brand deserves.</p>
          
          <div className="text-left">
            {sent ? (
              <div className="flex flex-col items-center justify-center p-16 text-center animate-scaleIn bg-white/5 rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/20 to-transparent opacity-50" />
                <div className="w-24 h-24 rounded-full bg-[var(--accent)]/20 flex items-center justify-center mb-8 border border-[var(--accent)]/40 relative z-10 shadow-[0_0_50px_rgba(192,57,43,0.3)]">
                  <CheckCheck size={40} className="text-[var(--accent)]" />
                </div>
                <h3 className="font-heading text-4xl font-black text-white mb-4 relative z-10">Message Sent</h3>
                <p className="text-white/60 max-w-sm text-xl relative z-10">Thank you. Our engineering team will review your project specs and respond within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 md:p-14 rounded-[3rem] shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--accent)]/5 blur-[100px] rounded-full pointer-events-none" />
                <div className="relative z-10">
                  <h3 className="font-heading text-3xl font-black text-[var(--primary)] mb-10 uppercase tracking-tight">Project Inquiry</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {(['name', 'email', 'phone'] as const).map(field => (
                      <div key={field} className={field === 'phone' ? 'md:col-span-2' : ''}>
                        <label className="block text-[var(--primary)]/40 text-xs font-black uppercase tracking-[0.2em] mb-2 ml-1">{field}</label>
                        <input
                          type={field === 'email' ? 'email' : 'text'}
                          placeholder={field === 'name' ? 'Full Name' : field === 'email' ? 'Email Address' : 'Phone Number'}
                          value={form[field]}
                          onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))}
                          required={field !== 'phone'}
                          className="w-full bg-[var(--primary)]/5 border-2 border-transparent rounded-2xl px-6 py-5 text-[var(--primary)] placeholder-[var(--primary)]/30 text-base outline-none transition-all duration-300 focus:bg-transparent focus:border-[var(--primary)]"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mb-8">
                    <label className="block text-[var(--primary)]/40 text-xs font-black uppercase tracking-[0.2em] mb-2 ml-1">Project Message</label>
                    <textarea rows={4} placeholder="Tell us about your signage needs..."
                      value={form.message}
                      onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                      required
                      className="w-full bg-[var(--primary)]/5 border-2 border-transparent rounded-2xl px-6 py-5 text-[var(--primary)] placeholder-[var(--primary)]/30 text-base outline-none resize-none transition-all duration-300 focus:bg-transparent focus:border-[var(--primary)]"
                    />
                  </div>
                  <button type="submit" disabled={loading}
                    className="w-full bg-[var(--accent)] text-white py-6 rounded-2xl font-black text-xl hover:scale-[1.02] shadow-xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex justify-center items-center gap-4 group uppercase tracking-widest">
                    {loading ? (
                      <span className="flex items-center gap-3">
                        <Loader2 className="animate-spin" size={24} /> Processing...
                      </span>
                    ) : (
                      <>
                        Initiate Build <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER - F2 Variant */}
      <footer className="bg-[#1a3a16] pt-24 pb-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-[var(--accent)] flex items-center justify-center rounded-xl font-black text-white text-2xl">T</div>
                <span className="font-heading font-black text-3xl tracking-tighter uppercase text-white">Timmysigns</span>
              </div>
              <p className="text-white/40 text-xl leading-relaxed max-w-sm">
                Transforming the physical identity of corporate Nigeria through precision engineering.
              </p>
              <div className="flex gap-6 mt-10">
                <a href={`https://instagram.com/${contact.instagram.replace('@','')}`} className="text-white/40 hover:text-[var(--accent)] transition-colors">
                  <Instagram size={28} />
                </a>
                <a href={`https://wa.me/${contact.whatsapp}`} className="text-white/40 hover:text-[var(--accent)] transition-colors">
                  <Phone size={28} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-heading font-black text-white uppercase tracking-widest text-sm mb-8">Navigation</h4>
              <ul className="space-y-4">
                {['Home', 'Gallery', 'About', 'Contact'].map(link => (
                  <li key={link}>
                    <a href={`#${link.toLowerCase()}`} className="text-white/40 hover:text-white transition-colors font-medium">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-heading font-black text-white uppercase tracking-widest text-sm mb-8">Contact</h4>
              <ul className="space-y-6">
                <li className="flex items-start gap-3">
                  <MapPin size={20} className="text-[var(--accent)] shrink-0 mt-1" />
                  <span className="text-white/40">{contact.address}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={20} className="text-[var(--accent)] shrink-0" />
                  <span className="text-white/40">+{contact.whatsapp}</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-white/20 text-sm font-medium uppercase tracking-[0.2em]">
              &copy; {new Date().getFullYear()} Signage By Timmysigns. Engineering Impact Since 2012.
            </p>
            <div className="flex gap-10">
              <span className="text-white/20 text-xs font-bold uppercase tracking-widest">Built in Nigeria</span>
              <span className="text-white/20 text-xs font-bold uppercase tracking-widest">Privacy Policy</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}