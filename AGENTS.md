# IREME Real Estate

Public website for IREME Real Estate (Kigali, Rwanda).

- Standard Vite + React SPA (no SSR framework). Entry: `index.html` → `src/main.tsx` → `src/App.tsx`.
- Routing: tiny custom History-API router in `src/router.tsx` (`Link`, `useRouter`, `useParams`).
- Styling: Tailwind CSS v4 via `@tailwindcss/vite`, design tokens in `src/styles.css`.
- Content lives in `src/data/*.json`, validated with zod in `src/lib/data.ts`.
- Forms open WhatsApp/email with a prefilled message — nothing is stored.
