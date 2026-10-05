import data from "@/assets/site-data.json";

export const site = data;
export const navigation = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Projects", to: "/projects" },
  { label: "Contact", to: "/contact" },
] as const;

export function pageHead(title: string, description: string) {
  return { meta: [
    { title: `${title} | Luxurious Professional Painting` },
    { name: "description", content: description },
    { property: "og:title", content: `${title} | Luxurious Professional Painting` },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] };
}