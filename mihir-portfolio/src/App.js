import React, { useEffect, useState, useRef } from 'react';
import emailjs from '@emailjs/browser';



export default function Home() {
  const text = "  AI & ML | Data Science | NLP | Transformers | Cybersecurity";
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingForward, setIsTypingForward] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState(false);

  // EmailJS Configuration - Replace with your actual IDs
  const EMAILJS_SERVICE_ID = 'service_42n3p5b';
  const EMAILJS_TEMPLATE_ID = 'template_d0lxug8';
  const EMAILJS_PUBLIC_KEY = 'zvVOwO8mX46S8qwfo';

  // Form reference
  const form = useRef();

  // Email sending function
  const sendEmail = (e) => {
    e.preventDefault();
    
    // Show loading state (optional)
    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<span class="animate-spin">⚡</span> Sending...';
    submitButton.disabled = true;

    emailjs.sendForm(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      form.current,
      EMAILJS_PUBLIC_KEY
    )
    .then((result) => {
      console.log('SUCCESS!', result.text);
      alert('Message sent successfully! I\'ll get back to you soon.');
      form.current.reset();
    })
    .catch((error) => {
      console.error('FAILED...', error.text);
      alert('Failed to send message. Please try again or contact me directly.');
    })
    .finally(() => {
      // Reset button state
      submitButton.innerHTML = originalText;
      submitButton.disabled = false;
    });
  };



  // Trigger visibility after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    setMobileMenuOpen(false);
  };

  // Track active section for navigation highlighting
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'awards', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Typewriter effect
  useEffect(() => {
    let index = isTypingForward ? 0 : text.length;
    const interval = setInterval(() => {
      if (isTypingForward) {
        setDisplayedText((prev) => prev + text.charAt(index));
        index++;
        if (index === text.length) {
          clearInterval(interval);
          setTimeout(() => setIsTypingForward(false), 1000);
        }
      } else {
        setDisplayedText((prev) => prev.slice(0, -1));
        index--;
        if (index === 0) {
          clearInterval(interval);
          setTimeout(() => setIsTypingForward(true), 1000);
        }
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isTypingForward, text]);

  // Neural network canvas animation
  useEffect(() => {
    const canvas = document.getElementById('neuronCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let stars = [];
    let animationFrameId;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    class Star {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.2;
        this.speedY = (Math.random() - 0.5) * 0.2;
        this.brightness = Math.random() * 0.8 + 0.2;
        this.twinkleSpeed = Math.random() * 0.02 + 0.005;
        this.connectionStrength = Math.random() * 0.8 + 0.2;
        this.activeConnections = new Set();
        this.connectionTimers = new Map();
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

        this.brightness += Math.sin(Date.now() * this.twinkleSpeed) * 0.1;
        this.brightness = Math.max(0.1, Math.min(1, this.brightness));
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size * 3
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${this.brightness})`);
        gradient.addColorStop(0.4, `rgba(200, 220, 255, ${this.brightness * 0.3})`);
        gradient.addColorStop(1, 'rgba(100, 150, 255, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.brightness})`;
        ctx.fill();
      }
    }

    const numStars = Math.floor((canvas.width * canvas.height) / 15000) + 25;
    for (let i = 0; i < numStars; i++) {
      stars.push(new Star());
    }

    const drawConnections = () => {
      for (let i = 0; i < stars.length; i++) {
        let connectionCount = 0;
        const maxConnections = 4;

        for (let j = i + 1; j < stars.length && connectionCount < maxConnections; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const connectionKey = `${i}-${j}`;
          const maxDistance = 100 + (stars[i].connectionStrength * 60);

          if (distance < maxDistance) {
            if (!stars[i].activeConnections.has(connectionKey)) {
              if (Math.random() < 0.003) {
                stars[i].activeConnections.add(connectionKey);
                stars[i].connectionTimers.set(connectionKey, 0);
              }
            }

            if (stars[i].activeConnections.has(connectionKey)) {
              let timer = stars[i].connectionTimers.get(connectionKey);
              timer += 0.02;
              stars[i].connectionTimers.set(connectionKey, timer);

              let connectionOpacity = Math.sin(timer) * 0.5 + 0.5;

              if (timer > 10 && Math.random() < 0.001) {
                stars[i].activeConnections.delete(connectionKey);
                stars[i].connectionTimers.delete(connectionKey);
                continue;
              }

              const opacity = Math.max(0.02, (1 - distance / maxDistance) * 0.12 * connectionOpacity * stars[i].connectionStrength * stars[j].connectionStrength);
              const progress = Math.min(1, timer * 0.3);
              const endX = stars[i].x + (stars[j].x - stars[i].x) * progress;
              const endY = stars[i].y + (stars[j].y - stars[i].y) * progress;

              const gradient = ctx.createLinearGradient(
                stars[i].x, stars[i].y, endX, endY
              );
              gradient.addColorStop(0, `rgba(100, 150, 255, ${opacity})`);
              gradient.addColorStop(0.5, `rgba(200, 220, 255, ${opacity * 1.2})`);
              gradient.addColorStop(1, `rgba(100, 150, 255, ${opacity * 0.3})`);

              ctx.beginPath();
              ctx.moveTo(stars[i].x, stars[i].y);
              ctx.lineTo(endX, endY);
              ctx.strokeStyle = gradient;
              ctx.lineWidth = 0.8;
              ctx.stroke();

              if (progress >= 1 && Math.random() < 0.01) {
                const pulsePos = Math.random();
                const pulseX = stars[i].x + (stars[j].x - stars[i].x) * pulsePos;
                const pulseY = stars[i].y + (stars[j].y - stars[i].y) * pulsePos;

                ctx.beginPath();
                ctx.arc(pulseX, pulseY, 1.5, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(150, 200, 255, ${opacity * 4})`;
                ctx.fill();
              }

              connectionCount++;
            }
          } else {
            const connectionKey = `${i}-${j}`;
            if (stars[i].activeConnections.has(connectionKey)) {
              stars[i].activeConnections.delete(connectionKey);
              stars[i].connectionTimers.delete(connectionKey);
            }
          }
        }
      }
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawConnections();
      stars.forEach(star => {
        star.update();
        star.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="bg-black text-white relative">
      {/* Fixed Background Canvas */}
      <div className="fixed inset-0 z-0">
        <canvas id="neuronCanvas" className="w-full h-full"></canvas>
      </div>

      {/* Fixed Navigation */}
      <nav className="fixed top-0 w-full px-6 py-4 z-50 bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            MR
          </div>
          
          <ul className="hidden md:flex space-x-8 text-sm font-medium">
            {['home', 'about', 'skills', 'experience', 'projects', 'awards', 'contact'].map((section) => (
              <li key={section}>
                <button
                  onClick={() => scrollToSection(section)}
                  className={`transition-colors duration-300 relative group capitalize ${
                    activeSection === section ? 'text-blue-400' : 'text-gray-300 hover:text-blue-400'
                  }`}
                >
                  {section === 'awards' ? 'Awards & Achievements' : section}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-400 transition-all duration-300 ${
                    activeSection === section ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </button>
              </li>
            ))}
            {/* RESUME BOX BUTTON */}
            <li>
              <a
                href="https://drive.google.com/file/d/1sGuvEvK1mfbyTMO6qzXmhjxI3pwaxcSz/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm transition-all duration-300"
              >
                Resume
              </a>
            </li>
          </ul>
          
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-4 bg-gray-900 bg-opacity-95 backdrop-blur-sm rounded-lg p-4">
            <ul className="space-y-4 text-sm font-medium">
              {['home', 'about', 'skills', 'experience', 'projects', 'awards', 'contact'].map((section) => (
                <li key={section}>
                  <button
                    onClick={() => scrollToSection(section)}
                    className="block w-full text-left text-gray-300 hover:text-blue-400 transition-colors duration-300 capitalize"
                  >
                    {section === 'awards' ? 'Awards & Achievements' : section}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      {/* HOME SECTION */}
      <section id="home" className="min-h-screen relative z-10 flex flex-col items-center justify-center text-center px-6">
        <h1 className={`text-5xl md:text-7xl font-bold transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
        }`}>
          Hi, I'm Mihir Ranjan
        </h1>
        
        <p className="mt-6 text-xl md:text-2xl text-gray-300 max-w-2xl">
          {displayedText}<span className="animate-pulse">|</span>
        </p>
        
        <div className={`mt-10 flex gap-4 transition-all duration-1000 ease-out delay-500 ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
        }`}>
          <a 
            href="https://drive.google.com/file/d/1sGuvEvK1mfbyTMO6qzXmhjxI3pwaxcSz/view?usp=sharing" 
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl text-white font-semibold shadow-md transition-colors duration-300"
          >
            View Resume
          </a>
          <button
            onClick={() => scrollToSection('contact')}
            className="bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-xl text-white font-semibold shadow-md transition-colors duration-300"
          >
            Contact Me
          </button>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="min-h-screen relative z-10 flex items-center justify-center px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            About Me
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-300 leading-relaxed">
                Hi, I’m Mihir Ranjan — an enthusiastic and curious explorer in the world of Artificial Intelligence and Data Science.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                From a young age, I've been captivated by the potential of intelligent systems to transform how we interact with the world. 
                This passion led me to pursue a Bachelor’s in Artificial Intelligence, followed by a Master’s specializing in AI 
                and Data Science.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                While my specialization includes Cybersecurity, my true excitement lies in crafting intelligent systems that learn, 
                adapt, and evolve. I’m particularly drawn to research and innovation, and I’m constantly seeking opportunities to 
                grow, collaborate, and contribute to the AI ecosystem.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                When I’m not working on models or hacking on new ideas, you’ll find me at the gym, listening to thought-provoking 
                podcasts, or volunteering for social initiatives.
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8">
              <h3 className="text-2xl font-extrabold mb-6 text-purple-500">Quick Facts</h3>
              <ul className="space-y-4 text-black">
                <li className="flex items-center gap-3">
                  <span className="text-blue-400">🎓</span>
                  <span>Master of Technology in AI & Data Science (specialization in Cybersecurity) | 2024–Present | CGPA: 8.90 (Till 2nd sem) </span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-blue-400">🎓</span>
                  <span>Bachelor of Technology in Artificial Intelligence | 2020–2024 | CGPA: 7.39</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-blue-400">💻</span>
                  <span>4+ Years Experience in Development & Research</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-blue-400">🎤</span>
                  <span>Great Public Speaker & Event Host</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-blue-400">🏋️</span>
                  <span>Passionate Powerlifter & Fitness Enthusiast</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      
      {/* SKILLS SECTION */}
      <section id="skills" className="min-h-screen relative z-10 flex items-center justify-center px-6 py-20">
        <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Skills & Technologies
            </h2>

          <div className="grid md:grid-cols-3 gap-8">

            {/* Programming Languages */}
            <div className="bg-white bg-opacity-80 rounded-2xl p-6">
              <h3 className="text-2xl font-bold mb-6 text-blue-500 text-center">Programming</h3>
              <ul className="text-black space-y-3">
                <li className="flex items-center gap-3"><img src="/icons/python.svg" alt="Python Logo" className="w-6 h-6" /> Python</li>
                <li className="flex items-center gap-3"><img src="/icons/solidity.svg" alt="Solidity Logo" className="w-6 h-6" /> Solidity</li>
                <li className="flex items-center gap-3"><img src="/icons/cpp.svg" alt="C++ Logo" className="w-6 h-6" /> C++</li>
                <li className="flex items-center gap-3"><img src="/icons/c.svg" alt="C Logo" className="w-6 h-6" /> C</li>
                <li className="flex items-center gap-3"><img src="/icons/java.svg" alt="Java Logo" className="w-6 h-6" /> Java</li>
                <li className="flex items-center gap-3"><img src="/icons/html.svg" alt="HTML Logo" className="w-6 h-6" /> HTML & CSS</li>
                <li className="flex items-center gap-3"><img src="/icons/github.svg" alt="Git Logo" className="w-6 h-6" /> Git & GitHub</li>
              </ul>
            </div>
            
            {/* AI & Cybersecurity */}
            <div className="bg-white bg-opacity-80 rounded-2xl p-6">
              <h3 className="text-2xl font-bold mb-6 text-green-500 text-center">AI & Cybersecurity </h3>
              <ul className="text-black space-y-3">
                <li className="flex items-center gap-3">Machine Leanring& its libraries</li>
                <li className="flex items-center gap-3">RNN/LSTM/CNN</li>
                <li className="flex items-center gap-3">NLP & Tranformers</li>
                <li className="flex items-center gap-3">Network Architecture</li>
                <li className="flex items-center gap-3">Cyber Laws</li>
                <li className="flex items-center gap-3">Ethics in AI and Cybersecurity</li>
                {/* <li className="flex items-center gap-3">Ethical Hacking Fundamentals</li> */}
              </ul>
            </div>
            
            {/* Tools & Frameworks */}
            <div className="bg-white bg-opacity-80 rounded-2xl p-6">
              <h3 className="text-2xl font-bold mb-6 text-purple-500 text-center">Tools & Frameworks</h3>
              <ul className="text-black space-y-3">
                <li className="flex items-center gap-3"><img src="/icons/tensorflow.svg" alt="TensorFlow Logo" className="w-6 h-6" /> TensorFlow & Keras</li>
                <li className="flex items-center gap-3"><img src="/icons/pandas.svg" alt="Pandas Logo" className="w-6 h-6" /> Pandas</li>
                <li className="flex items-center gap-3"><img src="/icons/numpy.svg" alt="NumPy Logo" className="w-6 h-6" /> NumPy & Pandas</li>
                <li className="flex items-center gap-3"><img src="/icons/openCV.svg" alt="OpenCV Logo" className="w-6 h-6" /> OpenCV</li>
                <li className="flex items-center gap-3"><img src="/icons/matplotlib.svg" alt="Matplotlib Logo" className="w-6 h-6" /> Matplotlib & Seaborn</li>
                <li className="flex items-center gap-3"><img src="/icons/scikit-learn.svg" alt="Scikit-learn Logo" className="w-6 h-6" /> scikit-learn</li>
                <li className="flex items-center gap-3"><img src="/icons/MySQL.svg" alt="MySQL Logo" className="w-6 h-6" /> MySQL</li>
              </ul>
            </div>



          </div>
        </div>
      </section>


      {/* EXPERIENCE SECTION */}
      <section id="experience" className="min-h-screen relative z-10 flex items-center justify-center px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Experience
          </h2>
          
          <div className="space-y-8">

            <div className="relative bg-gray-900 bg-opacity-50 backdrop-blur-sm rounded-2xl p-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-blue-400">Artificial Intelligence Intern</h3>
                  <p className="text-xl text-gray-300">Solar Secure Solutions | Remote</p>
                </div>
                <span className="text-gray-400 text-sm">Feb 2025 - Apr 2025</span>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Worked with real-world datasets on data cleaning, feature engineering, and ML model development. Gained hands-on experience with supervised learning and model optimization. Received an "Excellent" performance rating.
              </p>

              <a
                href="https://drive.google.com/file/d/1v5wkboBHZhA96TD6UUG0w7nRD0ga55KI/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 right-4"
              >
                <img src="/icons/gdrive.svg" alt="Google Drive" className="w-6 h-6 hover:scale-110 transition-transform" />
              </a>
            </div>


              <div className="relative bg-gray-900 bg-opacity-50 backdrop-blur-sm rounded-2xl p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-purple-400">Machine Learning (NLP) Intern</h3>
                    <p className="text-xl text-gray-300">Suvidha Foundation | Remote</p>
                  </div>
                  <span className="text-gray-400 text-sm">Aug 2023 - Sep 2023</span>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  Researched rare-word issues in text summarization and contributed to the replication of published NLP experiments. Collaborated remotely on foundational machine learning workflows.
                </p>

                <a
                  href="https://drive.google.com/drive/folders/19H8OfldP-IzY1z7j5lbYPetJRdtEx4qy?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-4 right-4"
                >
                  <img src="/icons/gdrive.svg" alt="Google Drive" className="w-6 h-6 hover:scale-110 transition-transform" />
                </a>
              </div>


            <div className="bg-gray-900 bg-opacity-50 backdrop-blur-sm rounded-2xl p-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-green-400">Club Head – Kalakriti</h3>
                  <p className="text-xl text-gray-300">Mahindra University</p>
                </div>
                <span className="text-gray-400 text-sm">Sep 2022 - Jun 2023</span>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Led the university’s cultural club and organized major events including Tarang. Coordinated logistics, marketing, and creative direction to foster a strong campus culture.
              </p>
            </div>

            <div className="bg-gray-900 bg-opacity-50 backdrop-blur-sm rounded-2xl p-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-yellow-400">Cultural Head – Aether</h3>
                  <p className="text-xl text-gray-300">Mahindra University</p>
                </div>
                <span className="text-gray-400 text-sm">Jan 2023 - Apr 2023</span>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Spearheaded the execution of the annual Techno-Cultural Fest “Aether.” Managed end-to-end event planning, team coordination, and audience engagement strategies.
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* PROJECTS SECTION */}
      <section id="projects" className="min-h-screen relative z-10 flex items-center justify-center px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Featured Projects
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Project 1 */}
            <a
              href="https://github.com/your-project-link"
              target="_blank"
              rel="noreferrer"
              className="transition-transform transform hover:scale-105 hover:brightness-110 inline-block w-full"
            >
              <div className="bg-gray-900 bg-opacity-50 backdrop-blur-sm rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4 text-blue-400">Mental Health Assessment via NLP</h3>
                <p className="text-gray-300 mb-6">
                  Built an AI-powered system using NLP and ML to analyze mental health based on questionnaire input.
                  Provided personalized feedback and condition classification via a Streamlit app.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full">Python</span>
                  <span className="px-3 py-1 bg-purple-600 text-white text-sm rounded-full">NLP</span>
                  <span className="px-3 py-1 bg-green-600 text-white text-sm rounded-full">Streamlit</span>
                </div>
                <div className="flex justify-between items-center">
                  <img src="/icons/github.png" alt="GitHub Logo" className="w-6 h-6" />
                  <span className="text-sm text-gray-400">Jan 2025 – Apr 2025</span>
                </div>
              </div>
            </a>

            {/* Project 2 */}
            <a
              href="https://github.com/MIHIR-RANJAN/A_Multi_Faceted_Approach_to_Fraudulent_Website_Detection.git"
              target="_blank"
              rel="noreferrer"
              className="transition-transform transform hover:scale-105 hover:brightness-110 inline-block w-full"
            >
              <div className="bg-gray-900 bg-opacity-50 backdrop-blur-sm rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4 text-purple-400">Fraudulent Website Detection</h3>
                <p className="text-gray-300 mb-6">
                  Created an ML-based system to detect and classify fake websites using URL analysis, sentiment analysis,
                  OCR, TF-IDF, and NER. Integrated web scraping and ensemble anomaly detection.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full">ML</span>
                  <span className="px-3 py-1 bg-purple-600 text-white text-sm rounded-full">NLP</span>
                  <span className="px-3 py-1 bg-green-600 text-white text-sm rounded-full">OCR</span>
                </div>
                <div className="flex justify-between items-center">
                  <img src="/icons/github.png" alt="GitHub Logo" className="w-6 h-6" />
                  <span className="text-sm text-gray-400">Sep 2024 – Dec 2024</span>
                </div>
              </div>
            </a>

            {/* Project 3 */}
            <a
              href="https://github.com/MIHIR-RANJAN/Trigger_Word_Detection_AiDoneRight.git"
              target="_blank"
              rel="noreferrer"
              className="transition-transform transform hover:scale-105 hover:brightness-110 inline-block w-full"
            >
              <div className="bg-gray-900 bg-opacity-50 backdrop-blur-sm rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4 text-green-400">Trigger Word Detection</h3>
                <p className="text-gray-300 mb-6">
                  Designed a task automation system triggered by voice commands using CNN and LSTM on Raspberry Pi3.
                  Enabled hands-free actions like opening doors in smart environments.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full">CNN</span>
                  <span className="px-3 py-1 bg-purple-600 text-white text-sm rounded-full">LSTM</span>
                  <span className="px-3 py-1 bg-green-600 text-white text-sm rounded-full">Raspberry Pi</span>
                </div>
                <div className="flex justify-between items-center">
                  <img src="/icons/github.png" alt="GitHub Logo" className="w-6 h-6" />
                  <span className="text-sm text-gray-400">Jan 2024</span>
                </div>
              </div>
            </a>

            {/* Project 4 */}
            <a
              href="https://drive.google.com/file/d/15GKZhrozGMXPKujNorrlyGintx3QqqCy/view?usp=drive_link"
              target="_blank"
              rel="noreferrer"
              className="transition-transform transform hover:scale-105 hover:brightness-110 inline-block w-full"
            >
              <div className="bg-gray-900 bg-opacity-50 backdrop-blur-sm rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4 text-orange-400">Toxic Word Replacing Chatbot</h3>
                <p className="text-gray-300 mb-6">
                  Built an NLP chatbot that identifies and replaces toxic language in real-time communication.
                  Designed custom datasets and trained models to enhance conversation quality.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full">Python</span>
                  <span className="px-3 py-1 bg-purple-600 text-white text-sm rounded-full">NLP</span>
                  <span className="px-3 py-1 bg-green-600 text-white text-sm rounded-full">Chatbot</span>
                </div>
                <div className="flex justify-between items-center">
                  <img src="/icons/gdrive.svg" alt="GitHub Logo" className="w-6 h-6" />
                  <span className="text-sm text-gray-400">Aug 2023 – Mar 2024</span>
                </div>
              </div>
            </a>

          </div>
        </div>
      </section>



      {/* AWARDS & CERTIFICATIONS SECTION */}
      <section id="awards" className="min-h-screen relative z-10 flex items-center justify-center px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Awards & Certifications
          </h2>

          <div className="space-y-8">
            {/* Debate certificate */}
            <a
              href="https://drive.google.com/file/d/11uASYH2UqavtXNcwyxmgaJoMjOUqwSY0/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform transform hover:scale-105 hover:brightness-110 inline-block w-full"
            >
              <div className="bg-gray-900 bg-opacity-50 backdrop-blur-sm rounded-2xl p-6 relative">
                <h3 className="text-2xl font-bold text-blue-400 mb-2"> Inter-College Debate – NFSU Goa</h3>
                <p className="text-gray-300">
                Won 2nd place at the 2025 inter-college debate competition held at National Forensic Sciences University, Goa. Engaged in high-level discourse on cybercrime trends, new technological legislation, and legal reforms introduced in India after 2020.
                </p>
                <span className="absolute bottom-4 right-6 text-xs text-gray-400">2025</span>
              </div>
            </a>
            {/* IRM Certificate */}
            <a
              href="https://drive.google.com/file/d/1bQqinD-PEgxwXxF4pJlvSC022TX1KDnj/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform transform hover:scale-105 hover:brightness-110 inline-block w-full"
            >
              <div className="bg-gray-900 bg-opacity-50 backdrop-blur-sm rounded-2xl p-6 relative">
                <h3 className="text-2xl font-bold text-blue-400 mb-2"> IRM Global Level 1 Certificate</h3>
                <p className="text-gray-300">
                  Awarded by the Institute of Risk Management for foundational knowledge in risk identification, assessment, treatment, and governance.
                </p>
                <span className="absolute bottom-4 right-6 text-xs text-gray-400">2024</span>
              </div>
            </a>

            {/* Fitify App */}
            <a
              href="https://drive.google.com/file/d/1vwksQV-8m1wG4u6JZmkjTBh7VWVhvidb/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform transform hover:scale-105 hover:brightness-110 inline-block w-full"
            >
              <div className="bg-gray-900 bg-opacity-50 backdrop-blur-sm rounded-2xl p-6 relative">
                <h3 className="text-2xl font-bold text-purple-400 mb-2"> FITIFY – E-Summit 2022</h3>
                <p className="text-gray-300">
                  Secured 2nd place for developing a fitness app prototype at Mahindra University’s E-Summit 2022.
                </p>
                <span className="absolute bottom-4 right-6 text-xs text-gray-400">2022</span>
              </div>
            </a>

            {/* Game Dev */}
            <a
              href="https://github.com/MIHIR-RANJAN/Universe-Making.git"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform transform hover:scale-105 hover:brightness-110 inline-block w-full"
            >
              <div className="bg-gray-900 bg-opacity-50 backdrop-blur-sm rounded-2xl p-6 relative">
                <h3 className="text-2xl font-bold text-purple-400 mb-2"> Universe Making Game – Enigma 2021</h3>
                <p className="text-gray-300">
                Won 2nd place in a game development coding event by Enigma (CS club), Mahindra University.
                </p>
                <span className="absolute bottom-4 right-6 text-xs text-gray-400">2021</span>
              </div>
            </a>

            {/* MUN Mention */}
            <a
              href="https://drive.google.com/file/d/1Bpdk9pxj0Us-NPc7yg-vBM8jT7wuoOKX/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform transform hover:scale-105 hover:brightness-110 inline-block w-full"
            >
              <div className="bg-gray-900 bg-opacity-50 backdrop-blur-sm rounded-2xl p-6 relative">
                <h3 className="text-2xl font-bold text-yellow-400 mb-2"> Most Verbal Mention – MUN 2020</h3>
                <p className="text-gray-300">
                  Recognized for diplomacy and communication while representing South Africa at Mahindra University’s MUN.
                </p>
                <span className="absolute bottom-4 right-6 text-xs text-gray-400">2020</span>
              </div>
            </a>
          </div>
        </div>
      </section>

       

      
      {/* CONTACT SECTION */}
      <section
        id="contact"
        className="min-h-screen relative z-10 flex items-center justify-center px-6 py-20"
      >
        <div className="bg-white/10 backdrop-blur-md border border-gray-700 rounded-xl shadow-2xl w-full max-w-6xl p-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Contact Me
          </h2>
          <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-white/10">

            {/* Left: Contact Form */}
            <div className="md:w-1/2 md:pr-8 pb-8 md:pb-0">
              <h2 className="text-2xl font-bold mb-6">GET IN TOUCH</h2>
              <form ref={form} onSubmit={sendEmail} className="space-y-4">
                <div className="flex items-center bg-white/20 rounded-md px-3 py-2">
                  <i className="fas fa-user text-gray-300 mr-2"></i>
                  <input
                    type="text"
                    name="user_name"
                    placeholder="Your Name"
                    required
                    className="w-full outline-none bg-transparent placeholder-gray-300 text-white"
                  />
                </div>
                <div className="flex items-center bg-white/20 rounded-md px-3 py-2">
                  <i className="fas fa-envelope text-gray-300 mr-2"></i>
                  <input
                    type="email"
                    name="user_email"
                    placeholder="Your Email"
                    required
                    className="w-full outline-none bg-transparent placeholder-gray-300 text-white"
                  />
                </div>
                <div className="flex items-start bg-white/20 rounded-md px-3 py-2">
                  <i className="fas fa-comment-dots text-gray-300 mr-2 mt-1"></i>
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    required
                    className="w-full outline-none bg-transparent placeholder-gray-300 text-white h-24 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md flex items-center justify-center gap-2 transition-all duration-300 ease-in-out tracking-wide hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <i className="fas fa-paper-plane text-white"></i>
                  <span className="text-base font-medium">Send Message</span>
                </button>
              </form>
            </div>

            {/* Right: Info and Links */}
            <div className="md:w-1/2 md:pl-8 pt-8 md:pt-0 flex flex-col justify-center text-center md:text-left">
              <h2 className="text-4xl font-bold mb-6 leading-snug">
                Opportunities & Ideas ?<br /> Say Hello!
              </h2>

              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                {/* GitHub Icon */}
                <a
                  href="https://github.com/MIHIR-RANJAN"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-transform transform hover:scale-110 hover:brightness-125 inline-block"
                >
                  <img src="/icons/github.png" alt="GitHub Logo" className="w-10 h-10" />
                </a>

                {/* LinkedIn Icon */}
                <a
                  href="https://www.linkedin.com/in/mihir-ranjan-328503201/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-transform transform hover:scale-110 hover:brightness-125 inline-block"
                >
                  <img src="/icons/linkedin.svg" alt="LinkedIn Logo" className="w-10 h-10" />
                </a>

                {/* Instagram Icon */}
                <a
                  href="https://www.instagram.com/_mihir_ranjan_?igsh=MTZ0YnRqY2Z2ZG81aQ=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-transform transform hover:scale-110 hover:brightness-125 inline-block"
                >
                  <img src="/icons/instagram.svg" alt="Instagram Logo" className="w-10 h-10" />
                </a>

                {/* Resume Button */}
                <a
                  href="https://drive.google.com/file/d/1sGuvEvK1mfbyTMO6qzXmhjxI3pwaxcSz/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-gray-500 px-5 py-2 rounded-full text-white hover:bg-white hover:text-black transition"
                >
                  RESUME
                </a> 
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* FOOTER */}
     
      <div className="bg-white text-black w-full py-4 px-6 z-20 relative flex flex-col md:flex-row justify-between items-center">
        {/* Left Text */}
        <p className="text-sm font-medium">&copy; 2025 Mihir Ranjan. All rights reserved.</p>

        {/* Right Icons */}
        <div className="flex gap-4 mt-2 md:mt-0">
          <a
            href="https://github.com/MIHIR-RANJAN"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-60 transition-opacity duration-300"
          >
            <img src="/icons/github.svg" alt="GitHub Logo" className="w-6 h-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/mihir-ranjan-328503201/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-60 transition-opacity duration-300"
          >
            <img src="/icons/linkedin.svg" alt="LinkedIn Logo" className="w-6 h-6" />
          </a>
        </div>
      </div>

    </div>
  );
}
