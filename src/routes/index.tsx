import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Clock, Palette, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PhoneLink, useQuote } from "@/components/site-shell";
import { QuoteBanner, SectionHeading } from "@/components/page-elements";
import { pageHead, site } from "@/lib/site";
import heroVideo from "@/assets/hero-video.mp4.asset.json";

export const Route = createFileRoute("/")({ head: () => pageHead("High-End Custom Painting in Toronto", "Luxurious Professional Painting specializes in residential and commercial painting in Toronto and the GTA. Over 15 years of artistry. Request your free quote."), component: Home });

function Showcase() {
 const [active, setActive] = useState(0);
 const [paused, setPaused] = useState(false);
 const move = (direction: number) => setActive(index => (index + direction + site.showcase.length) % site.showcase.length);
 useEffect(() => { if (paused) return; const timer = setInterval(() => setActive(index => (index + 1) % site.showcase.length), 4500); return () => clearInterval(timer); }, [paused]);
 return <section className="section"><div className="container-lux"><SectionHeading eyebrow="Quick Glance" title="A look at our work" /><div className="showcase" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>{site.showcase.map((image, index) => <img key={index} src={image} alt={`Project showcase ${index + 1}`} className={index === active ? "is-active" : ""} loading="lazy" />)}<Button variant="luxIcon" size="icon" className="showcase-arrow previous" aria-label="Previous image" onClick={() => move(-1)}><ChevronLeft /></Button><Button variant="luxIcon" size="icon" className="showcase-arrow next" aria-label="Next image" onClick={() => move(1)}><ChevronRight /></Button><div className="showcase-dots">{site.showcase.map((_, index) => <Button key={index} variant="luxIcon" className={`showcase-dot ${index === active ? "selected" : ""}`} aria-label={`Go to image ${index + 1}`} aria-pressed={index === active} onClick={() => setActive(index)} />)}</div></div></div></section>;
}
function Home() {
 const quote = useQuote();
 return <><section className="hero"><video className="hero-media hero-video" src={heroVideo.url} poster={site.hero} autoPlay muted loop playsInline preload="auto" aria-hidden="true" /><div className="container-lux hero-content"><div className="hero-copy"><p className="eyebrow">High-End Custom Painting</p><h1>Where Painting<br />Transcends into <span className="gold-text">Artistry</span></h1><p>With over 15+ years of unparalleled experience in commercial and residential painting, we transform ordinary spaces into extraordinary works of art across Toronto and the GTA.</p><div className="actions"><Button variant="gold" onClick={() => quote()}>Get Your Free Quote <ArrowRight /></Button><PhoneLink outline /></div></div></div><a href="#about-preview" className="scroll-indicator" aria-label="Discover more"><span /></a></section>
 <section className="trust-strip"><div className="container-lux trust-grid">{[{ Icon: Clock, label: "15+ Years Experience", sub: "Commercial & residential" }, { Icon: Palette, label: "High-End Custom", sub: "Painting & finishing" }, { Icon: ShieldCheck, label: "Premium Materials", sub: "Enduring durability" }, { Icon: Sparkles, label: "Artisan Craftsmanship", sub: "Every stroke matters" }].map(({ Icon, label, sub }) => <div className="trust-item" key={label}><span className="trust-icon"><Icon size={20} /></span><div><strong>{label}</strong><small>{sub}</small></div></div>)}</div></section>
 <section className="section" id="about-preview"><div className="container-lux split"><div className="split-image"><img src={site.aboutImage} alt="Elegant living room painted by Luxurious Professional Painting" loading="lazy" /><div className="experience-badge"><strong>15+</strong><span>Years of artistry</span></div></div><div className="split-copy"><p className="eyebrow">About Us</p><h2>A beacon of excellence in painting</h2><div className="prose">{site.story.slice(0, 2).map(text => <p key={text}>{text}</p>)}</div><Button asChild variant="luxLink"><Link to="/about">Learn more about us <ArrowRight /></Link></Button></div></div></section>
 <Showcase /><section className="partners"><div className="container-lux"><p className="eyebrow">Working with the best</p><div className="partner-logos">{site.business.partnerLogos.map(logo => <div className="partner-logo" key={logo.name}><img src={logo.image} alt={`${logo.name} logo`} loading="lazy" /></div>)}</div></div></section><QuoteBanner /></>;
}
