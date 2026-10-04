import { img } from "@/lib/data";

export const services = [
  {
    to: "/services/construction",
    name: "Construction",
    image: img("construction"),
    short: "Modern, durable homes built to your needs.",
    intro:
      "From foundations to finishing, IREME builds modern, durable and beautiful homes tailored to your plans and budget.",
    heroTagline: "Built right, from the ground up",
    description: [
      "Building a home in Rwanda is a major investment — and one where shortcuts cost dearly later. IREME manages every stage of your build with qualified masons, carpenters and site supervisors, so walls stay plumb, schedules hold and your budget is respected.",
      "Whether you already have architectural plans or need help developing one, we take the project from land survey and foundation to roofing, plumbing and final finishing — with quality materials sourced from trusted suppliers.",
    ],
    offerings: [
      {
        title: "Residential house construction",
        desc: "Complete builds for family homes, villas and multi-unit properties — from foundation to handover.",
      },
      {
        title: "Project planning and supervision",
        desc: "Realistic schedules, material budgeting and a site supervisor who reports progress to you directly.",
      },
      {
        title: "Renovations and extensions",
        desc: "Upgrading an existing structure — new rooms, modernised kitchens and bathrooms, structural repairs.",
      },
      {
        title: "Finishing and detailing",
        desc: "Tiling, painting, ceilings, joinery and fittings done to a standard you'll be proud to show off.",
      },
    ],
    process: [
      { t: "Consultation & site visit", d: "We discuss your vision, assess the plot and advise on what's realistic for your budget." },
      { t: "Design & costing", d: "We help finalise plans and produce a transparent, itemised cost estimate." },
      { t: "Construction", d: "Our team builds under daily supervision, with agreed checkpoints and progress updates." },
      { t: "Handover", d: "We walk the finished building with you, rectify snag items and hand over the keys." },
    ],
    idealFor: [
      "Families building their first or second home on their own land",
      "Investors developing rental units or guest houses",
      "Owners renovating or extending an existing property",
      "Diaspora building back home who need a trusted team on the ground",
    ],
    faqs: [
      { q: "Do you work with my own architect's plans?", a: "Yes. If you already have plans, we build to them. If not, we can connect you with architects we trust and manage the process from design onwards." },
      { q: "How do you keep costs under control?", a: "You receive an itemised estimate before work starts, materials are sourced with supplier invoices, and any change that affects cost is agreed with you in writing first." },
      { q: "Can you build while I'm outside Rwanda?", a: "Yes — many of our clients are in the diaspora. You receive photo and video progress reports at every stage, and decisions that matter are put to you directly." },
      { q: "How long does a typical house take?", a: "A standard 3–4 bedroom house usually takes 6–10 months depending on design complexity, weather and material availability. We give you a realistic timeline before we start." },
    ],
  },
  {
    to: "/services/property-management",
    name: "Property Management",
    image: img("house"),
    short: "We look after your property on your behalf.",
    intro:
      "Let IREME monitor and manage your property so you enjoy reliable income without the daily hassle.",
    heroTagline: "Your investment, professionally looked after",
    description: [
      "Owning rental property in Kigali should be a source of income, not a second job. IREME takes care of the tenants, the rent and the maintenance so your property stays occupied, cared for and profitable.",
      "You receive regular reports and prompt communication — you always know how your property is performing, even if you're abroad.",
    ],
    offerings: [
      {
        title: "Tenant sourcing and screening",
        desc: "We advertise, show the property, verify tenants and place reliable occupants — with references checked.",
      },
      {
        title: "Rent collection and follow-up",
        desc: "Rent is collected on schedule and discrepancies are pursued immediately. You receive clear monthly statements.",
      },
      {
        title: "Maintenance coordination",
        desc: "Plumbing, electrical, painting or repairs — we get quotes, supervise the work and protect the property's value.",
      },
      {
        title: "Inspections and reporting",
        desc: "Periodic inspections with photo reports, so small problems are caught before they become expensive ones.",
      },
    ],
    process: [
      { t: "Property assessment", d: "We visit the property, agree the target rent and identify what needs fixing before tenants move in." },
      { t: "Tenant placement", d: "We market the property, screen applicants and sign a clear tenancy agreement." },
      { t: "Ongoing management", d: "We handle rent, requests and inspections while you receive regular statements." },
      { t: "Reporting & review", d: "You get monthly income reports and periodic condition reviews of your property." },
    ],
    idealFor: [
      "Diaspora owners who can't manage tenants day-to-day",
      "Investors with one or several rental units in Kigali",
      "Owners tired of chasing rent or coordinating repairs",
      "Families who want their property kept in top condition",
    ],
    faqs: [
      { q: "What types of property do you manage?", a: "Apartments, family homes, townhouses and small commercial units. We'll assess any property and tell you honestly whether we're the right fit." },
      { q: "How do I receive my rental income?", a: "Rent is collected on your behalf and transferred to your account on an agreed schedule, with a simple monthly statement showing income and any maintenance costs." },
      { q: "What happens if a tenant damages the property?", a: "Inspections before and after tenancy, plus deposits held in the tenancy agreement, cover this. We document everything with photos and handle the resolution for you." },
      { q: "Can I use you for tenant-finding only?", a: "Yes. If you prefer managing the property yourself, we can simply advertise, screen and place a quality tenant for a one-off fee." },
    ],
  },
  {
    to: "/services/interior-design",
    name: "Interior Design",
    image: img("interior"),
    short: "Elegant interiors, decoration and consultation.",
    intro:
      "Modern and elegant interior design that turns houses into homes and offices into inspiring workplaces.",
    heroTagline: "Spaces that feel as good as they look",
    description: [
      "A well-designed interior changes how a property feels — and how fast it sells or rents. Our design service works with your space, your budget and Rwandan suppliers to create rooms that are beautiful, practical and durable.",
      "From a single room refresh to a full home or office fit-out, we plan the layout, select materials and finishes, and manage the delivery so the result looks intentional, not improvised.",
    ],
    offerings: [
      {
        title: "Design consultation",
        desc: "A structured session where we understand how you live or work and translate it into a design direction.",
      },
      {
        title: "Space planning",
        desc: "Furniture layouts, lighting plans and colour schemes that make the most of every square metre.",
      },
      {
        title: "Decoration and furnishing",
        desc: "Sourcing furniture, fabrics, curtains and accessories — delivered, assembled and styled in place.",
      },
      {
        title: "Home staging for sale or rent",
        desc: "Presenting your property at its best before photos and viewings, so it lets or sells faster.",
      },
    ],
    process: [
      { t: "Discovery", d: "We visit the space, discuss your taste, budget and how you use each room." },
      { t: "Concept & moodboard", d: "You receive a clear direction — colours, materials and furniture style — before anything is bought." },
      { t: "Sourcing & delivery", d: "We order items from vetted suppliers and coordinate delivery and installation." },
      { t: "Styling & reveal", d: "Final styling of the space, with a walkthrough to make sure you love the result." },
    ],
    idealFor: [
      "New homeowners starting from an empty shell",
      "Landlords preparing units to attract better tenants",
      "Offices and businesses wanting a professional environment",
      "Sellers who want their property photographed and shown at its best",
    ],
    faqs: [
      { q: "Can we work with my existing furniture?", a: "Absolutely. Many projects start with what you own — we refresh layouts, colours and accessories around the pieces you want to keep." },
      { q: "What budget do I need?", a: "It depends on scope. A consultation is affordable for any budget; a full room makeover and a whole-home fit-out differ widely. We tell you honestly what your budget can achieve." },
      { q: "Do you only do modern styles?", a: "No — we design to your taste, whether that's contemporary, warm and traditional, or a blend. The space should feel like you." },
      { q: "How long does a typical project take?", a: "A single room usually takes 2–4 weeks from concept to styling; larger projects are scheduled phase by phase so you can keep living or working in the space." },
    ],
  },
  {
    to: "/services/electrical",
    name: "Electrical Services",
    image: img("electrical"),
    short: "Safe, professional installation and maintenance.",
    intro:
      "Safe and professional electrical installation and maintenance for homes and commercial buildings.",
    heroTagline: "Safe power, done properly the first time",
    description: [
      "Electrical work is one area where 'good enough' is dangerous. Our qualified electricians install, upgrade and repair wiring to proper standards — protecting your family, your tenants and your property.",
      "We work on new builds, older homes needing rewiring, and commercial premises, and every job is tested before we leave.",
    ],
    offerings: [
      {
        title: "New electrical installations",
        desc: "Complete wiring for new builds and extensions — consumer units, sockets, lighting and earthing done to standard.",
      },
      {
        title: "Wiring and rewiring",
        desc: "Upgrading old or unsafe circuits, fixing tripping breakers and eliminating overloaded connections.",
      },
      {
        title: "Lighting design",
        desc: "Practical and atmospheric lighting plans — indoor, outdoor, security and garden lighting installed cleanly.",
      },
      {
        title: "Repairs and maintenance",
        desc: "Fault finding, socket and switch replacement, and standby generator or inverter installations.",
      },
    ],
    process: [
      { t: "Assessment & quote", d: "We inspect the property, identify what's needed and give you a clear, itemised quote." },
      { t: "Scheduled work", d: "Work is planned to minimise disruption to your home, site or business." },
      { t: "Testing & certification", d: "Every circuit we touch is tested before handover — we don't leave until it's safe." },
      { t: "Aftercare", d: "If anything related to our work fails later, we come back and make it right." },
    ],
    idealFor: [
      "New home builders who want wiring done right from day one",
      "Owners of older properties with ageing or unsafe wiring",
      "Businesses needing reliable power for equipment and lighting",
      "Anyone experiencing breaker trips, flickering lights or dead sockets",
    ],
    faqs: [
      { q: "Do you handle small jobs or only big installations?", a: "Both. A single faulty socket gets the same professional attention as a full house rewire — no job is too small for a safe fix." },
      { q: "Can you work while I'm living in the property?", a: "Yes. We phase the work room by room, keep the power on where possible and clean up at the end of each day." },
      { q: "Are your materials genuine?", a: "We only use certified breakers, cables and fittings from reputable suppliers. Cheap uncertified components are exactly what causes fires." },
      { q: "Do you install solar or backup power?", a: "Yes — we install inverters and standby power systems, and can coordinate solar panel integration with the wiring design." },
    ],
  },
  {
    to: "/services/cctv-security",
    name: "CCTV & Security",
    image: img("cctv"),
    short: "Cameras, access control and security solutions.",
    intro:
      "Protect what matters with professionally installed CCTV cameras, access control and security systems.",
    heroTagline: "See everything, from anywhere",
    description: [
      "Whether it's your family at home, your tenants or your business stock — peace of mind comes from knowing your property is watched even when you're not there. We design and install security systems suited to Rwandan homes and businesses.",
      "Cameras you can view from your phone, access control for gates and offices, and systems that keep working through power cuts.",
    ],
    offerings: [
      {
        title: "CCTV camera installation",
        desc: "High-definition indoor and outdoor cameras positioned for full coverage — no blind spots at gates, entrances or storerooms.",
      },
      {
        title: "Remote viewing on your phone",
        desc: "Watch live or review recordings from anywhere — configured and connected to your phone or computer.",
      },
      {
        title: "Access control systems",
        desc: "Gate automation, keypad and card entry for homes, offices and rental compounds.",
      },
      {
        title: "Maintenance and support",
        desc: "System health checks, recording checks and prompt repairs so your security never quietly fails.",
      },
    ],
    process: [
      { t: "Security assessment", d: "We walk the property with you, identify vulnerable points and agree the coverage you need." },
      { t: "System design & quote", d: "You receive a camera layout, equipment list and clear pricing — no vague packages." },
      { t: "Installation", d: "Neat cabling, proper mounting and configuration of recording and remote access." },
      { t: "Training & support", d: "We show you how to use the system on your own phone, and remain available for support." },
    ],
    idealFor: [
      "Homeowners wanting to watch their property from abroad",
      "Landlords securing rental compounds and shared entrances",
      "Shops, offices and warehouses protecting stock and staff",
      "Anyone who has experienced a break-in and wants it never to repeat",
    ],
    faqs: [
      { q: "Can I really watch the cameras from outside Rwanda?", a: "Yes. The system connects through your internet so you can view live footage and recordings from your phone anywhere in the world." },
      { q: "What happens when power goes off?", a: "We size the recording system with battery backup so cameras and recording continue through outages — essential in any security setup." },
      { q: "How is the footage stored?", a: "On a recorder at your property with storage sized for how far back you want to review — typically weeks. We help you choose the right capacity." },
      { q: "Do you offer systems for small budgets?", a: "Yes. We design around what matters most to you — for example covering entrances and the gate only — so you get real security at a cost you're comfortable with." },
    ],
  },
] as const;

export type Service = (typeof services)[number];
