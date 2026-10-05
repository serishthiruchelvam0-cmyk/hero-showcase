import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUp, CheckCircle2, Facebook, Instagram, Mail, MapPin, Menu, Phone, Send, Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navigation, site } from "@/lib/site";

const QuoteContext = createContext<(service?: string) => void>(() => {});
export const useQuote = () => useContext(QuoteContext);

export function Brand() {
  return <Link to="/" className="brand" aria-label="Luxurious Professional Painting — home"><span className="brand-mark">L</span><span className="brand-name"><span>Luxurious Professional</span><small>Painting</small></span></Link>;
}

export function PhoneLink({ outline = false }: { outline?: boolean }) {
  return <Button asChild variant={outline ? "luxOutline" : "luxLink"}><a href={`tel:${site.business.phoneRaw}`}><Phone size={16} />{site.business.phone}</a></Button>;
}

export function ContactDetails() {
  return <ul className="contact-details"><li><Phone /><a href={`tel:${site.business.phoneRaw}`}>{site.business.phone}</a></li><li><Mail /><a href={`mailto:${site.business.email}`}>{site.business.email}</a></li><li><MapPin /><span>{site.business.address}</span></li></ul>;
}

export function QuoteForm({ presetService = "", contact = false }: { presetService?: string; contact?: boolean }) {
  const [submitted, setSubmitted] = useState(false);
  if (submitted) return <div className="form-success"><CheckCircle2 /><h3>Thank you</h3><p>Your message is ready. For an immediate response, call us at <a href={`tel:${site.business.phoneRaw}`}>{site.business.phone}</a>.</p><Button variant="luxOutline" onClick={() => setSubmitted(false)}>Send another message</Button></div>;
  return <form className="quote-form" onSubmit={event => { event.preventDefault(); setSubmitted(true); }}>
    {contact && <h3>Send us a message</h3>}
    <label>Full name <span>*</span><input name="name" required autoComplete="name" placeholder="Jane Doe" /></label>
    <div className="form-row"><label>Email <span>*</span><input name="email" type="email" required autoComplete="email" placeholder="jane@email.com" /></label><label>Phone<input name="phone" type="tel" autoComplete="tel" placeholder="(437) 000-0000" /></label></div>
    <label>{contact ? "Service of interest" : "Service of interest"}<select name="service" defaultValue={presetService}><option value="">Select a service…</option>{site.services.map(service => <option key={service.id}>{service.title}</option>)}<option>Other / Not sure</option></select></label>
    <label>Project details<textarea name="message" rows={contact ? 5 : 4} placeholder="Tell us about your space, timeline, and what you're looking for…" /></label>
    <Button type="submit" variant="gold" className="w-full"><Send size={16} />{contact ? "Send Message" : "Submit Request"}</Button>
    {!contact && <p className="form-call">Or call us directly at <a href={`tel:${site.business.phoneRaw}`}>{site.business.phone}</a></p>}
  </form>;
}

export function SiteShell({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [service, setService] = useState("");
  const openQuote = (preset = "") => { setService(preset); setQuoteOpen(true); setMenuOpen(false); };
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = previous; window.removeEventListener("keydown", onKey); };
  }, [menuOpen]);
  return <QuoteContext.Provider value={openQuote}>
    <header className={`site-header ${scrolled || menuOpen ? "is-solid" : ""}`}><nav className="container-lux nav-inner" aria-label="Main navigation"><Brand /><div className="desktop-navigation">{navigation.map(item => <Link key={item.to} to={item.to} className={location.pathname === item.to ? "nav-link active" : "nav-link"}>{item.label}</Link>)}</div><div className="header-actions"><a className="header-phone" href={`tel:${site.business.phoneRaw}`}><Phone size={16} />{site.business.phone}</a><Button variant="gold" onClick={() => openQuote()}>Free Quote</Button></div><Button variant="luxIcon" size="icon" className="mobile-menu-toggle" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button></nav></header>
    {menuOpen && <div className="mobile-menu"><nav aria-label="Mobile navigation">{navigation.map(item => <Link key={item.to} to={item.to} className={location.pathname === item.to ? "active" : ""}>{item.label}</Link>)}</nav><div className="mobile-menu-bottom"><PhoneLink /><Button variant="gold" onClick={() => openQuote()}>Request a Free Quote</Button></div></div>}
    <main key={location.pathname} className="page-enter">{children}</main>
    <footer className="site-footer"><div className="container-lux"><div className="footer-grid"><div><Brand /><p className="footer-description">{site.business.tagline}. High-end custom painting for residential and commercial properties across {site.business.serviceAreas.join(", ")}.</p><div className="socials">{[{ label: "Facebook", href: site.business.socials.facebook, Icon: Facebook }, { label: "Instagram", href: site.business.socials.instagram, Icon: Instagram }, { label: "Homestars", href: site.business.socials.homestars, Icon: Star }].map(({ label, href, Icon }) => <Button key={label} asChild variant="luxIcon" size="icon"><a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}><Icon size={16} /></a></Button>)}</div></div><div><h3 className="eyebrow">Explore</h3><div className="footer-navigation">{navigation.map(item => <Link key={item.to} to={item.to}>{item.label}</Link>)}<Button variant="luxLink" onClick={() => openQuote()}>Free Quote</Button></div></div><div><h3 className="eyebrow">Get in touch</h3><ContactDetails /></div></div><div className="footer-bottom"><p>© 2026 {site.business.name}. All rights reserved.</p><Button variant="luxLink" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Back to top <ArrowUp size={14} /></Button></div></div></footer>
    <Dialog.Root open={quoteOpen} onOpenChange={setQuoteOpen}><Dialog.Portal><Dialog.Overlay className="modal-overlay" /><Dialog.Content className="quote-dialog"><Dialog.Close asChild><Button variant="luxIcon" size="icon" className="dialog-close" aria-label="Close quote form"><X /></Button></Dialog.Close><p className="eyebrow">Free Quote</p><Dialog.Title>Request your free quote</Dialog.Title><Dialog.Description>Tell us about your project and we'll be in touch.</Dialog.Description><QuoteForm key={`${quoteOpen}-${service}`} presetService={service} /></Dialog.Content></Dialog.Portal></Dialog.Root>
  </QuoteContext.Provider>;
}