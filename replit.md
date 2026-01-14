# Azzivone Website

## Overview

Azzivone is a luxury skincare e-commerce website built as a high-conversion landing page and checkout funnel. The application sells premium snail mucin serum products with a focus on conversion optimization through carefully designed user flows: Home → Product → Checkout. The site features a luxury aesthetic with gold accents, elegant typography, and smooth animations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight client-side routing)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS v4 with custom CSS variables for theming
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Animations**: Framer Motion for page transitions and micro-interactions
- **Typography**: Cormorant Garamond (headings) + Montserrat (body text)
- **Color Palette**: Cream backgrounds (#FAFAF9), gold accents (#B45309), minimal black for text

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript with ESM modules
- **Build Tool**: esbuild for server bundling, Vite for client
- **API Pattern**: RESTful endpoints prefixed with `/api`
- **Development**: Hot module replacement via Vite middleware

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` (shared between client and server)
- **Validation**: Zod schemas generated from Drizzle tables via drizzle-zod
- **Storage**: Currently uses in-memory storage (`MemStorage` class) with database schema ready for PostgreSQL

### Key Design Decisions
1. **Monorepo Structure**: Client (`client/`), server (`server/`), and shared code (`shared/`) in single repository
2. **Type Safety**: End-to-end TypeScript with shared schema definitions
3. **Component Library**: Customized shadcn/ui components with brand-specific styling
4. **Asset Handling**: Static assets in `attached_assets/` with Vite aliasing (`@assets`)
5. **Path Aliases**: `@/` for client source, `@shared/` for shared code

### Page Structure
- `/` - Home page with hero video, product showcase, reviews
- `/product` - Detailed product page with benefits, FAQs, social proof
- `/checkout` - Order form with payment method selection
- `/admin` - Admin dashboard (frontend-only, mock data)

## External Dependencies

### Database
- **PostgreSQL**: Primary database (configured via `DATABASE_URL` environment variable)
- **Drizzle Kit**: Database migrations and schema pushing

### UI/Component Libraries
- **Radix UI**: Full suite of accessible primitives (dialog, accordion, tabs, etc.)
- **shadcn/ui**: Pre-built component system with New York style variant
- **Lucide React**: Icon library

### Animation & Interaction
- **Framer Motion**: Page transitions and scroll animations
- **Embla Carousel**: Product image carousels

### Development Tools
- **Vite**: Frontend build and dev server
- **Replit Plugins**: Dev banner, cartographer, runtime error overlay

### Session Management
- **connect-pg-simple**: PostgreSQL session store (configured but not actively used yet)
- **express-session**: Session middleware foundation