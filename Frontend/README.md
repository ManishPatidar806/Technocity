# TechVision - AI/ML Solutions & Digital Transformation

A modern, professional React.js frontend for an IT services startup specializing in AI/ML solutions, web development, and digital transformation services.

## 🚀 Features

- **Modern Design**: Professional, trust-building design with subtle gradients and animations
- **Responsive**: Fully responsive across desktop, tablet, and mobile devices
- **Accessibility**: WCAG 2.1 compliant with proper ARIA labels and keyboard navigation
- **API Integration**: Ready for Spring Boot backend integration
- **Admin Dashboard**: Complete job management system with JWT authentication
- **SEO Optimized**: Proper meta tags, semantic HTML, and structured content

## 🛠 Tech Stack

- **Framework**: React.js with Vite
- **Styling**: Tailwind CSS with custom design system
- **HTTP**: Axios with interceptors
- **Routing**: React Router with protected routes
- **Forms**: React Hook Form + Yup validation
- **State**: Context API for auth/global state
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **TypeScript**: Full type safety

## 📱 Pages

### Public Pages
- **Home**: Hero section, services overview, testimonials, CTA
- **Services**: Detailed service offerings with API integration
- **About**: Company story, team, values, timeline
- **Careers**: Job listings with application form modal
- **Contact**: Contact form with validation

### Admin Pages
- **Login**: Secure JWT authentication
- **Dashboard**: Job management CRUD operations

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:8080
VITE_APP_NAME=TechVision
```

## 🚀 Quick Start

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd techvision-frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your backend URL
```

4. **Start development server**
```bash
npm run dev
```

5. **Build for production**
```bash
npm run build
```

## 🔗 API Integration

### Backend Endpoints Expected

```typescript
// Services
GET /api/services - Fetch all services

// Jobs/Careers
GET /api/jobs - Fetch all job listings
POST /api/jobs - Create new job (admin)
PUT /api/jobs/{id} - Update job (admin)

// Applications
POST /api/applications - Submit job application
Payload: { name, email, role, resumeLink }

// Authentication
POST /api/auth/login - Admin login
Returns: { token, user }

// Contact
POST /api/contact - Send contact message
Payload: { name, email, message }
```

### JWT Authentication

- JWT tokens are stored in localStorage (can be configured for HttpOnly cookies)
- Automatic token injection in request headers
- Automatic redirect on 401 unauthorized
- Protected admin routes with route guards

## 🎨 Design System

### Color Palette
- **Primary**: Professional blue (`hsl(215 85% 25%)`)
- **Accents**: Teal (`hsl(175 85% 35%)`), Orange (`hsl(25 95% 55%)`)
- **Neutrals**: Carefully crafted gray scale for readability

### Typography
- **Font**: Inter (Google Fonts)
- **Hierarchy**: Semantic heading structure with proper contrast

### Components
- **Buttons**: Multiple variants (hero, outline, etc.)
- **Cards**: Service cards with hover effects
- **Forms**: Validated forms with error states
- **Modals**: Accessible modals with focus trapping

## 🔒 Security Features

- **JWT Authentication**: Secure token-based auth
- **Form Validation**: Client-side validation with Yup schemas
- **Protected Routes**: Admin route protection
- **HTTPS Ready**: Production-ready security headers
- **Input Sanitization**: XSS protection

## ♿ Accessibility

- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Readers**: Proper ARIA labels and roles
- **Color Contrast**: WCAG AA compliant contrast ratios
- **Focus Management**: Proper focus indicators and trapping
- **Semantic HTML**: Proper heading hierarchy and landmarks

## 📱 Responsive Design

- **Mobile First**: Designed for mobile, enhanced for desktop
- **Breakpoints**: Tailwind's responsive system
- **Touch Friendly**: Proper touch targets on mobile
- **Performance**: Optimized images and lazy loading

## 🧪 Demo Credentials

For testing the admin dashboard:
- **Username**: admin
- **Password**: password

## 📂 Project Structure

```
src/
├── api/          # API clients and services
├── components/   # Reusable UI components
├── contexts/     # React contexts (Auth, etc.)
├── hooks/        # Custom React hooks
├── pages/        # Page components
├── assets/       # Images and static files
└── styles/       # CSS and styling
```

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

### Deploy to Vercel/Netlify
1. Connect your Git repository
2. Set environment variables
3. Deploy automatically on push

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 📞 Support

For support and questions:
- Email: hello@techvision.com
- Phone: +1 (555) 123-4567
