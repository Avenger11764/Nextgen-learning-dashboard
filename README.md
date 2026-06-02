# NEURAL_DASH | Next-Gen Learning Dashboard

A futuristic, high-fidelity Student Learning Dashboard prototype built with Next.js (App Router), Supabase PostgreSQL database integration, Tailwind CSS v4.0, and hardware-accelerated spring-physics animations powered by Framer Motion.

## 🚀 Deployment Link (Vercel)
- **Deployment URL**: [https://nextgen-learning-dashboard.vercel.app](https://nextgen-learning-dashboard.vercel.app) *(To deploy, connect this repository to your Vercel Dashboard)*

---

## 🛠️ Architecture & Design Choices

1. **Bento Grid Layout**: Optimized grid system utilizing CSS Grid configurations (`grid-cols-12`) that stack into a single column on mobile, collapse to icon layouts on tablets, and open to full grids on desktops.
2. **NEURAL_DASH Theme**: Dark-mode only color palette based on high-contrast zinc backing accented by glowing violet and cyan highlights. Included interactive canvas mouse-tracking gradients.
3. **Typography & Assets**: Leveraged Google Font APIs for `Geist` and `JetBrains Mono` and loaded Google Material Symbols Outlined icons dynamically.

---

## ⚡ Server / Client Component Split

- **Server Component (RSC) (Data Fetching)**: 
  - `src/app/page.tsx` acts as the secure server boundary. It directly connects to the Supabase client using `@supabase/supabase-js` without exposing API keys to the browser, fetches the `courses` table database rows securely on the server side, and passes the parsed payload down.
  - Implemented `export const revalidate = 0` to force Next.js cache revalidation, guaranteeing real-time database sync on refresh.
  - Added a pulsing loader screen inside `src/app/loading.tsx` to handle loading states smoothly.

- **Client Components (Interactive Layout & Micro-interactions)**:
  - `DashboardContainer.tsx` manages active section states and page transitions (`AnimatePresence`).
  - `Sidebar.tsx` manages viewport collapses and active links (`layoutId` slide highlights).
  - `BentoGrid.tsx` captures mouse-move vectors (`onMouseMove`) to translate coordinates into real-time custom radial gradient glows on the greeting card.

---

## 🧩 Challenges & Resolutions

1. **Hydration Mismatch Errors**:
   - *Issue*: Generating random heatmap grids dynamically resulted in differing HTML structures between server pre-renders and client hydration.
   - *Resolution*: Replaced `Math.random()` with a **sine-based deterministic hash** (`Math.sin(idx + 1) * 10000`). This maintains exact server-client parity (resolving warnings) while producing chaotic, organic heatmap noise.
2. **Column Repeating Grids**:
   - *Issue*: Using simple modulos (`% 7`) on a 7-column grid caused values to align exactly vertically, drawing solid stripes instead of a GitHub-style scattered heatmap.
   - *Resolution*: Adjusted the mathematical mapping to coprime values to break repetitions.
3. **Card Layout Auto-Stretching**:
   - *Issue*: Flexible layouts caused the activity cells to expand into large rectangular blocks.
   - *Resolution*: Wrapped the grid container inside a proportional aspect-locked box (`aspect-[7/5]`) capped at `max-w-[240px]`.
