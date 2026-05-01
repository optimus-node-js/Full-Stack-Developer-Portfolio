# Rahul Vishwakarma - Portfolio V2 🚀

A modern, responsive portfolio website showcasing my skills, projects, and professional experience as a Full Stack Developer. Built with cutting-edge technologies and designed for optimal user experience.

## 🌟 Live Demo

[View Live Portfolio](https://rahul-vishwakarma-portfolio.vercel.app/) 🚀

## 📋 Table of Contents

- [Features](#-features)
- [Technologies Used](#-technologies-used)
- [Project Structure](#-project-structure)
- [Installation & Setup](#-installation--setup)
- [Key Components](#-key-components)
- [Contact System](#-contact-system)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### 🎨 Modern Design
- **Glass Morphism UI**: Beautiful glassmorphism effects with backdrop blur
- **Responsive Design**: Optimized for all devices (mobile, tablet, desktop)
- **Dark Theme**: Elegant dark theme with gradient accents
- **Smooth Animations**: Framer Motion animations for enhanced UX
- **Custom Scrollbar**: Styled scrollbar for better visual appeal

### 📱 Sections
- **Hero Section**: Eye-catching introduction with animated background
- **About**: Personal story and professional background
- **Projects**: Showcase of featured projects with detailed views
- **Skills**: Technical skills with modern card design
- **Experience**: Professional experience and education
- **Contact**: Interactive contact form with Firebase integration

### 🔧 Advanced Functionality
- **Project Detail Pages**: Dedicated pages for each project with comprehensive information
- **Contact System**: 
  - General contact form for general inquiries
  - Project-specific contact modal for project inquiries
  - Firebase Firestore integration for data storage
  - Admin panel to view all submissions
- **Resume Download**: Direct download functionality for resume
- **Smooth Scrolling**: Ultra-smooth scrolling experience
- **SEO Optimized**: Meta tags and structured data for better search visibility

## 🛠 Technologies Used

### Frontend
- **React 18**: Modern React with hooks and functional components
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library for smooth transitions
- **Lucide React**: Beautiful icon library

### UI Components
- **shadcn/ui**: Modern, accessible component library
- **Radix UI**: Headless UI primitives
- **Custom Components**: Tailored components for specific needs

### Backend & Database
- **Firebase Firestore**: NoSQL database for contact form data
- **Firebase Auth**: Authentication system (for admin features)
- **Firebase Analytics**: User analytics and tracking

### Development Tools
- **ESLint**: Code linting and quality assurance
- **PostCSS**: CSS processing
- **Git**: Version control

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui components
│   ├── Hero.tsx         # Hero section component
│   ├── About.tsx        # About section component
│   ├── Projects.tsx     # Projects showcase component
│   ├── SkillsModern.tsx # Skills display component
│   ├── Experience.tsx   # Experience section component
│   ├── Contact.tsx      # Contact form component
│   ├── ContactModal.tsx # Project-specific contact modal
│   ├── Navigation.tsx   # Navigation component
│   └── Footer.tsx       # Footer component
├── pages/               # Page components
│   ├── Index.tsx        # Main portfolio page
│   ├── ProjectDetail.tsx # Individual project detail page
│   ├── Contacted.tsx    # General contact submissions page
│   ├── ProjectContacted.tsx # Project-specific inquiries page
│   └── NotFound.tsx     # 404 error page
├── data/                # Static data
│   └── resume-data.ts   # Portfolio data (skills, projects, experience)
├── lib/                 # Utility libraries
│   ├── firebase.ts      # Firebase configuration and functions
│   └── utils.ts         # Utility functions
├── hooks/               # Custom React hooks
│   ├── use-mobile.tsx   # Mobile detection hook
│   └── use-toast.ts     # Toast notification hook
└── assets/              # Static assets
    ├── images/          # Image files
    └── icons/           # Icon files
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Git

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Rahul-gif-asus/portfolio-v2.git
   cd portfolio-v2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase** (Optional - for contact form functionality)
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Firestore Database
   - Copy your Firebase config to `src/lib/firebase.ts`
   - Update the configuration with your project details

4. **Start development server**
   ```bash
npm run dev
```

5. **Open in browser**
   Navigate to `http://localhost:5173`

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🎯 Key Components

### Hero Section
- Animated background with floating tech icons
- Professional photo with gradient rings
- Social media links
- Resume download button
- Smooth typing animations

### Projects Showcase
- Grid layout with hover effects
- Project cards with key features
- Technology tags
- Links to GitHub and live demos
- Click to view detailed project pages

### Project Detail Pages
- Comprehensive project information
- Key features with icons
- Challenges and outcomes
- Technology stack
- Project metadata (duration, team, status)
- Contact modal for project-specific inquiries

### Contact System
- **General Contact Form**: For general inquiries
- **Project Contact Modal**: For project-specific questions
- **Firebase Integration**: Real-time data storage
- **Admin Pages**: 
  - `/contacted` - View all general contact submissions
  - `/project/contacted` - View project-specific inquiries

## 📞 Contact System

### Features
- **Dual Contact System**: Separate forms for general and project inquiries
- **Real-time Storage**: Firebase Firestore integration
- **Admin Dashboard**: View and manage all submissions
- **Email Integration**: Direct reply functionality
- **Data Organization**: Automatic categorization of inquiries

### Contact Types
1. **General Contact** (`/contacted`)
   - General inquiries and collaboration requests
   - Stored with `type: 'general_contact'`

2. **Project Inquiries** (`/project/contacted`)
   - Project-specific questions and interest
   - Stored with `type: 'project_inquiry'`
   - Includes project context in messages

### Data Structure
```typescript
interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  projectTitle?: string | null;
  type?: 'project_inquiry' | 'general_contact';
  createdAt: Timestamp;
  timestamp: Timestamp;
}
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables if needed
3. Deploy automatically on every push

### Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy

### Manual Deployment
```bash
npm run build
# Upload the 'dist' folder to your hosting provider
```

## 🎨 Customization

### Updating Content
1. **Personal Information**: Edit `src/data/resume-data.ts`
2. **Projects**: Add/remove projects in the same file
3. **Skills**: Update skills and certifications
4. **Experience**: Modify work experience and education

### Styling
- **Colors**: Update CSS variables in `src/index.css`
- **Fonts**: Modify font imports and configurations
- **Animations**: Adjust Framer Motion animations
- **Layout**: Modify Tailwind classes for different layouts

### Adding New Sections
1. Create component in `src/components/`
2. Import and add to `src/pages/Index.tsx`
3. Update navigation if needed

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+
- **Large Screens**: 1440px+

## 🔧 Performance Optimizations

- **Code Splitting**: Automatic code splitting with Vite
- **Image Optimization**: Optimized images and lazy loading
- **Bundle Size**: Minimal bundle size with tree shaking
- **Caching**: Efficient caching strategies
- **Smooth Scrolling**: Hardware-accelerated smooth scrolling

## 🛡 Security Features

- **Input Validation**: Form validation and sanitization
- **Firebase Security**: Firestore security rules
- **XSS Protection**: React's built-in XSS protection
- **HTTPS**: Secure connections for all external resources

## 📊 Analytics & Tracking

- **Firebase Analytics**: User behavior tracking
- **Performance Monitoring**: Core Web Vitals tracking
- **Error Tracking**: Error boundary implementation
- **Contact Form Analytics**: Submission tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Rahul Vishwakarma**
- Email: karmarahul67@gmail.com
- LinkedIn: [rahul-vishwakarma-101346192](https://linkedin.com/in/rahul-vishwakarma-101346192)
- GitHub: [Rahul-gif-asus](https://github.com/Rahul-gif-asus)
- Location: Ahmedabad, India

## 🙏 Acknowledgments

- **shadcn/ui** for the beautiful component library
- **Tailwind CSS** for the utility-first CSS framework
- **Framer Motion** for smooth animations
- **Firebase** for backend services
- **Vite** for the fast build tool
- **React** team for the amazing framework

## 📈 Future Enhancements

- [ ] Blog section integration
- [ ] Multi-language support
- [ ] Advanced project filtering
- [ ] Contact form analytics dashboard
- [ ] PWA capabilities
- [ ] Dark/light theme toggle
- [ ] Advanced animations
- [ ] Performance monitoring dashboard

---

⭐ **Star this repository if you found it helpful!**

*Built with ❤️ by Rahul Vishwakarma*