import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuote, PhoneLink } from "@/components/site-shell";
import { site } from "@/lib/site";

export function PageCover({ eyebrow, title, subtitle, image }: { eyebrow: string; title: ReactNode; subtitle?: string; image: string }) {
 return <section className="page-cover"><img className="page-cover-image" src={image} alt="" /><div className="container-lux page-cover-content"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1>{subtitle && <p>{subtitle}</p>}</div></section>;
}
export function SectionHeading({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
 return <div className="section-heading"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div>;
}
export function QuoteBanner() {
 const quote = useQuote();
 return <section className="quote-banner"><img src={site.quoteImage} alt="" loading="lazy" /><div className="container-lux quote-banner-content"><p className="eyebrow">Ready for a quote?</p><h2>Let's transform your space together</h2><p>Call us today for your free quote, or send us a message and we'll get back to you shortly.</p><div className="actions center-actions"><Button variant="gold" onClick={() => quote()}>Request a Free Quote <ArrowRight /></Button><PhoneLink outline /></div></div></section>;
}
export function SimpleCTA({ title, description }: { title: string; description: string }) {
 const quote = useQuote();
 return <section className="section section-alternate simple-cta"><div className="container-lux"><h2>{title}</h2><p>{description}</p><div className="actions center-actions"><Button variant="gold" onClick={() => quote()}>Request a Free Quote <ArrowRight /></Button><PhoneLink outline /></div></div></section>;
}
