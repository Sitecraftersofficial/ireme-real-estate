# IREME Real Estate — public website (no Lovable Cloud, JSON storage)

## Approach
- No Lovable Cloud / Supabase. All content (properties, services, blog posts, FAQs, company contact info) lives in JSON files inside the project.
- Adding or editing a property = editing one JSON file (or asking me to). The site rebuilds and shows it.
- Important limitation: the hosted site cannot write to a JSON file (the hosting has no permanent disk). So visitor forms (inquiry, viewing request, request a property, sell/rent your property, contact) will send the message straight to IREME via **WhatsApp** (pre-filled message) with an **email** fallback. Nothing is stored on the site.
- Favorites are kept in the visitor's own browser only.

## Brand
- Deep navy + elegant gold accents, white and soft neutral backgrounds; supplied logo used unchanged.
- Premium serif headings with clean sans body; generous spacing, photography-led cards.
- Flyer and listing images used as references only.

## Pages
Home, Properties, Buy, Rent, Land, Property Details, Construction, Property Management, Interior Design, Electrical Services, CCTV & Security, About, Contact, Request a Property, Sell / Rent Your Property, Blog (list + article), FAQs, Privacy Policy, Terms, Listing Disclaimer.

## Key features
- Sticky nav with Services dropdown, proper mobile menu, floating WhatsApp button.
- Hero with Buy / Rent / Land search (location, type, price range, bedrooms) leading to filtered listings.
- Listing page filters + sort; status badges (Available, Pending, Sold, Rented, Unavailable); prices in RWF.
- Property details: gallery, specs, features, inquiry + viewing request (via WhatsApp/email), similar properties.
- Clearly marked sample listings — no invented real prices/locations presented as real; to be replaced with your actual data.

## Technical details
- `src/data/*.json` (properties, services, posts, faqs, site settings) loaded via typed helpers with zod validation.
- Routes: `/properties`, `/properties/$slug`, `/buy`, `/rent`, `/land`, `/services/*`, `/blog`, `/blog/$slug`, etc., each with its own head() metadata.
- Search state in URL query params; favorites in localStorage (UI preference only).
- Logo copied into `src/assets`.

## Info needed from you (placeholders until provided)
WhatsApp number, phone, email, office address, social links, and real property listings with photos.
