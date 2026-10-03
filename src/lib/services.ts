import { img } from "@/lib/data";

export const services = [
  {
    to: "/services/construction", name: "Construction", image: img("construction"),
    short: "Modern, durable homes built to your needs.",
    intro: "From foundations to finishing, IREME builds modern, durable and beautiful homes tailored to your plans and budget.",
    points: ["Residential house construction", "Project planning and supervision", "Renovations and extensions", "Quality materials and workmanship"],
  },
  {
    to: "/services/property-management", name: "Property Management", image: img("house"),
    short: "We look after your property on your behalf.",
    intro: "Let IREME monitor and manage your property so you enjoy reliable income without the daily hassle.",
    points: ["Tenant sourcing and screening", "Rent collection follow-up", "Maintenance coordination", "Regular property inspections"],
  },
  {
    to: "/services/interior-design", name: "Interior Design", image: img("interior"),
    short: "Elegant interiors, decoration and consultation.",
    intro: "Modern and elegant interior design that turns houses into homes and offices into inspiring workplaces.",
    points: ["Interior design consultation", "Space planning", "Decoration and furnishing", "Home staging for sale or rent"],
  },
  {
    to: "/services/electrical", name: "Electrical Services", image: img("electrical"),
    short: "Safe, professional installation and maintenance.",
    intro: "Safe and professional electrical installation and maintenance for homes and commercial buildings.",
    points: ["New electrical installations", "Wiring and rewiring", "Lighting design", "Repairs and maintenance"],
  },
  {
    to: "/services/cctv-security", name: "CCTV & Security", image: img("cctv"),
    short: "Cameras, access control and security solutions.",
    intro: "Protect what matters with professionally installed CCTV cameras, access control and security systems.",
    points: ["CCTV camera installation", "Remote viewing on your phone", "Access control systems", "Maintenance and support"],
  },
] as const;

export type Service = (typeof services)[number];
