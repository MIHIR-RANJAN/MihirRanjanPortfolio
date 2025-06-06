# Mihir_Ranjan_Portfolio_Website

# 🚀 Mihir Ranjan - Portfolio Website

A modern, interactive portfolio website built with React showcasing my journey in Artificial Intelligence, Data Science, and Cybersecurity. Features a stunning neural network animation background and smooth user experience.

## 🌟 Live Demo

Check out the live website: [Your Portfolio URL]

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Components](#components)
- [Installation](#installation)
- [Usage](#usage)
- [Customization](#customization)
- [Contact Form Setup](#contact-form-setup)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **Animated Neural Network Background** - Dynamic canvas animation with interconnected nodes
- **Typewriter Effect** - Smooth text animation for professional skills
- **Responsive Design** - Fully responsive across all devices
- **Smooth Scrolling Navigation** - One-page layout with smooth section transitions
- **Interactive Contact Form** - Functional email form using EmailJS
- **Project Showcase** - Detailed project cards with hover effects
- **Modern UI/UX** - Glass morphism effects and gradient designs
- **Mobile-First Approach** - Optimized for mobile and desktop experiences

## 🛠️ Tech Stack

- **Frontend Framework:** React 18+
- **Styling:** Tailwind CSS
- **Email Service:** EmailJS
- **Icons:** Custom SVG icons
- **Animations:** CSS3 & JavaScript Canvas API
- **Build Tool:** Create React App / Vite

## 🧩 Components

### Core Sections
- **Hero Section** - Landing area with animated typewriter effect
- **About Section** - Personal introduction and quick facts
- **Skills Section** - Technical skills categorized by domain
- **Experience Section** - Professional experience timeline
- **Projects Section** - Featured project showcases
- **Awards Section** - Certifications and achievements
- **Contact Section** - Interactive contact form and social links

### Interactive Elements
- **Neural Network Canvas** - Animated background with particle system
- **Navigation Bar** - Fixed navigation with active section highlighting
- **Mobile Menu** - Responsive hamburger menu
- **Hover Effects** - Interactive cards and buttons
- **Smooth Scrolling** - Seamless section transitions

## 🚦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Clone the Repository
```bash
git clone https://github.com/MIHIR-RANJAN/portfolio-website.git
cd portfolio-website
```

### Install Dependencies
```bash
npm install
# or
yarn install
```

### Required Dependencies
```json
{
  "react": "^18.0.0",
  "react-dom": "^18.0.0",
  "@emailjs/browser": "^3.11.0"
}
```

### Install Additional Packages (if needed)
```bash
npm install @emailjs/browser
```

## 🎯 Usage

### Development Server
```bash
npm start
# or
yarn start
```

The application will open at `http://localhost:3000`

### Build for Production
```bash
npm run build
# or
yarn build
```

### Deploy
```bash
npm run deploy
# or upload the build folder to your hosting service
```

## 📧 Contact Form Setup

To enable the contact form functionality:

1. **Create EmailJS Account**
   - Go to [EmailJS](https://www.emailjs.com/)
   - Sign up for a free account

2. **Configure Email Service**
   - Add your email service (Gmail, Outlook, etc.)
   - Create an email template

3. **Update Configuration**
   ```javascript
   // In the component file, update these variables:
   const EMAILJS_SERVICE_ID = 'your_service_id';
   const EMAILJS_TEMPLATE_ID = 'your_template_id';
   const EMAILJS_PUBLIC_KEY = 'your_public_key';
   ```

4. **Template Variables**
   - `{{user_name}}` - Sender's name
   - `{{user_email}}` - Sender's email
   - `{{message}}` - Message content

## 🎨 Customization

### Personal Information
Update the following sections with your details:

```javascript
// Hero Section
const text = " Your Skills | Your Expertise | Your Focus";

// About Section
- Update personal description
- Modify quick facts
- Change education details

// Experience Section
- Add your work experience
- Update company names and dates
- Modify job descriptions

// Projects Section
- Replace with your projects
- Update GitHub links
- Modify project descriptions

// Skills Section
- Update technical skills
- Change skill categories
- Replace skill icons
```

### Styling
- **Colors:** Modify Tailwind classes for different color schemes
- **Fonts:** Update font families in CSS
- **Animations:** Adjust animation speeds and effects
- **Layout:** Modify grid layouts and spacing

### Icons
Replace icons in the `/public/icons/` directory:
- `github.svg/png` - GitHub icon
- `linkedin.svg` - LinkedIn icon
- `instagram.svg` - Instagram icon
- `gdrive.svg` - Google Drive icon
- Technology icons (python.svg, tensorflow.svg, etc.)

## 📁 Project Structure

```
portfolio-website/
├── public/
│   ├── icons/              # SVG/PNG icons
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   └── Home.js         # Main component
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
└── README.md
```

## 🎭 Key Features Explained

### Neural Network Animation
- Custom Canvas API implementation
- Dynamic particle system with connections
- Responsive to screen size
- Smooth 60fps animation

### Typewriter Effect
- Custom React hook for text animation
- Forward and backward typing
- Configurable speed and delay

### Responsive Design
- Mobile-first approach
- Breakpoint-specific layouts
- Touch-friendly interactions

## 🚀 Performance Optimizations

- **Lazy Loading** - Images and components loaded on demand
- **Code Splitting** - Optimized bundle sizes
- **Animation Optimization** - RequestAnimationFrame for smooth animations
- **Image Optimization** - Compressed assets and proper formats

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Mihir Ranjan**
- GitHub: [@MIHIR-RANJAN](https://github.com/MIHIR-RANJAN)
- LinkedIn: [Mihir Ranjan](https://www.linkedin.com/in/mihir-ranjan-328503201/)
- Email: [Your Email]

## 🙏 Acknowledgments

- Neural network animation inspiration from various open-source projects
- Icons from various free icon libraries
- EmailJS for contact form functionality
- Tailwind CSS for styling framework

---

⭐ **Star this repository if you found it helpful!** ⭐

## 📝 Notes

- Make sure to replace placeholder URLs and personal information
- Update EmailJS configuration before deployment
- Test contact form functionality after deployment
- Optimize images for better performance
- Consider adding analytics (Google Analytics, etc.)

---

*Built with ❤️ by Mihir Ranjan*
