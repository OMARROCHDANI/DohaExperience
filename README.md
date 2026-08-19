# Doha Luxury Travel Experience

A highly interactive, premium luxury travel landing page for Doha, Qatar. This project showcases modern web development techniques including high-performance scroll-linked animations, glassmorphism aesthetics, and buttery-smooth transitions.

## Features

- **Cinematic Scroll Animation**: A 300-frame high-resolution video sequence rendered on an HTML Canvas, perfectly synchronized with scroll position.
- **Smooth Scrolling**: Implemented using [Lenis](https://lenis.studiofreight.com/) for a fluid, weightless scrolling experience across all devices.
- **Premium Aesthetics**: 
  - Pure minimalist luxury design with immersive black backgrounds.
  - Custom "Velvet Glass" utility classes mixing deep burgundy/purple gradients with frosted glassmorphism.
  - Elegant typography featuring high-contrast serif and sans-serif pairings.
- **Dynamic Interactions**: 
  - An Apple-style dynamic island floating navigation bar that responds to scroll direction.
  - Interactive modal dialogs, drawers, and staggered card reveal animations powered by [Framer Motion](https://www.framer.com/motion/).

## Tech Stack

- **Framework**: [React 18](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Motion for React](https://motion.dev/) (formerly Framer Motion)
- **Smooth Scroll**: [Lenis](https://lenis.studiofreight.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## Project Structure

- `/src/components`: Contains all modular React components (Navbar, Sections, Modals).
- `/src/App.tsx`: The main application entry point orchestrating the layout and scroll logic.
- `/frames`: Contains the 300 pre-rendered image frames used for the background scroll canvas sequence.
- `/public/images`: Static assets used in glassmorphism cards.
- `index.css`: Global styles, CSS variables, and custom velvet-glass utilities.

## Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository or extract the project files.
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

To start the development server with Hot Module Replacement (HMR):
```bash
npm run dev
```

### Production Build

To create an optimized production build:
```bash
npm run build
```
You can preview the built app using:
```bash
npm run preview
```
