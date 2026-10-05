import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageCover, SimpleCTA } from "@/components/page-elements";
import { site, pageHead } from "@/lib/site";
export const Route = createFileRoute("/projects")({ head: () => pageHead("Projects & Portfolio", "Browse commercial, custom, interior and exterior painting projects from Luxurious Professional Painting in Toronto and the GTA."), component: Projects });
function Projects() {
 const [category, setCategory] = useState(site.projects[0]?.id ?? "commercial");
 const [image, setImage] = useState<string | null>(null);
 const project = site.projects.find(item => item.id === category);
 return <><PageCover eyebrow="Our Work" title={<>Projects & <span className="gold-text">Portfolio</span></>} subtitle="A showcase of the commercial, custom, and interior & exterior projects we've brought to life." image={site.hero} /><section className="section"><div className="container-lux"><div className="project-tabs" role="tablist" aria-label="Project categories">{site.projects.map(item => <Button key={item.id} variant={category === item.id ? "gold" : "luxOutline"} role="tab" aria-selected={category === item.id} onClick={() => setCategory(item.id)}>{item.title}</Button>)}</div><p className="project-description">{project?.description}</p><div className="project-grid" role="tabpanel" aria-label={project?.title}>{project?.images.map((src, index) => <Button key={src} variant="luxIcon" className="project-tile" aria-label={`View ${project.title} project ${index + 1}`} onClick={() => setImage(src)}><img src={src} alt={`${project.title} project ${index + 1}`} loading="lazy" /><div className="project-label"><small>{project.title}</small><span>Project {index + 1}</span></div></Button>)}</div></div></section><SimpleCTA title="Like what you see?" description="Let's add your project to our portfolio. Request a free quote today." /><Dialog.Root open={image !== null} onOpenChange={open => { if (!open) setImage(null); }}><Dialog.Portal><Dialog.Overlay className="modal-overlay" /><Dialog.Content className="lightbox-dialog" aria-describedby={undefined}><Dialog.Title className="lightbox-title">Project detail</Dialog.Title><Dialog.Close asChild><Button variant="luxIcon" size="icon" className="lightbox-close" aria-label="Close project detail"><X /></Button></Dialog.Close>{image && <img src={image} alt="Project detail" />}</Dialog.Content></Dialog.Portal></Dialog.Root></>;
}
