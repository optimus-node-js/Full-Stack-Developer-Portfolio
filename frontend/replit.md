# Rahul Vishwakarma - Portfolio V2

## Overview

A modern, responsive portfolio website built with React, TypeScript, and Vite showcasing Rahul Vishwakarma's skills, projects, and professional experience as a Full Stack Developer. The application features a dark theme with glassmorphism effects, smooth animations, and Firebase integration for contact form submissions and newsletter subscriptions.

**Key Features:**
- Single-page application with smooth scrolling navigation
- Project showcase with dedicated detail pages
- Contact system with Firebase Firestore integration
- Admin panels for viewing form submissions and newsletter subscriptions
- Blog section with article pages
- Testimonials carousel
- Analytics dashboard
- Responsive design optimized for all devices
- Three.js particle text animation in hero section with hover morph effect (Canvas 2D fallback for unsupported environments)
- Telegram-style circular theme toggle with full-screen ripple animation
- Mobile-first floating bottom navigation (replaces top navbar on mobile devices)
- Theme persistence with localStorage

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build Tool:**
- React 18 with TypeScript for type safety
- Vite as the build tool and development server
- React Router for client-side routing (SPA pattern)

**Design System:**
- Tailwind CSS for utility-first styling
- shadcn/ui component library for pre-built, accessible UI components
- Custom CSS variables for theming (dark theme by default)
- Radix UI primitives for accessible, unstyled component foundations

**State Management:**
- React Query (@tanstack/react-query) for server state management and caching
- Local component state using React hooks (useState, useEffect, useRef)
- No global state management library (Redux/Zustand) - state is localized to components

**Animation & Effects:**
- Framer Motion for page transitions and component animations
- GSAP for advanced particle text effects
- Three.js for 3D particle background rendering
- Custom scroll animations using Intersection Observer API

**Routing Strategy:**
- Client-side routing with React Router
- Main routes: Home (/), Project Detail (/project/:projectId), Admin pages (/contacted, /project/contacted, /newsletter/subscribed)
- 404 catch-all route for handling non-existent pages
- Vercel configuration for SPA routing (all routes redirect to /index.html)

**Component Architecture:**
- Feature-based component organization under /src/components
- Reusable UI components under /src/components/ui (shadcn/ui)
- Page components under /src/pages
- Custom hooks under /src/hooks
- Utility functions under /src/lib

### External Dependencies

**Firebase Integration:**
- Firebase SDK v12.3.0 for backend services
- Firestore for NoSQL database storage
- Firebase Authentication for admin authentication
- Firebase Analytics for user tracking (with browser support detection)

**Database Schema (Firestore Collections):**
- `contacts` - Stores contact form submissions with fields: name, email, subject, message, timestamp, type, projectTitle
- `newsletter_subscriptions` - Stores email subscriptions with fields: email, timestamp

**Third-Party APIs:**
- SpaceX API integration for project showcase (SpaceX Launch Explorer project)

**UI Component Libraries:**
- Radix UI primitives for accessible components (accordion, dialog, dropdown, etc.)
- Mantine UI used in specific projects
- Lucide React for icon system

**Development & Build Tools:**
- ESLint with TypeScript support for code linting
- PostCSS with Autoprefixer for CSS processing
- Vercel for deployment and hosting

**SEO & Meta Tags:**
- React Helmet Async for dynamic meta tag management
- Structured data and Open Graph tags for social sharing
- Custom SEO component for page-specific metadata

**Form Handling:**
- React Hook Form with Zod resolver for form validation
- Custom toast notifications for user feedback

**Performance Optimizations:**
- Lazy loading for images with custom LazyImage component
- Intersection Observer for scroll-triggered animations
- Code splitting via dynamic imports (potential)
- WebGL support detection for 3D features

**Security Headers (Vercel):**
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection enabled

**Design Patterns:**
- Component composition over inheritance
- Custom hooks for reusable logic
- Render props pattern for flexible component APIs
- Container/Presentational component separation
- Error boundaries for graceful error handling (404 page)