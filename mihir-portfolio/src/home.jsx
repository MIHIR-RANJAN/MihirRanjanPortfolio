import React from 'react';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background canvas for neurons */}
      <div className="absolute inset-0 z-0">
        <canvas id="neuronCanvas" className="w-full h-full"></canvas>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-32">
        <motion.h1 
          className="text-5xl md:text-7xl font-bold"
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1 }}
        >
          Hi, I'm Mihir Ranjan
        </motion.h1>

        <motion.p 
          className="mt-6 text-xl md:text-2xl text-gray-300 max-w-2xl"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 1, duration: 1 }}
        >
          AI & Cybersecurity Enthusiast | NLP Researcher | Problem Solver
        </motion.p>

        <motion.div 
          className="mt-10 flex gap-4"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 1.5, duration: 1 }}
        >
          <a href="/resume.pdf" className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl text-white font-semibold shadow-md">
            📄 View Resume
          </a>
          <a href="#contact" className="bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-xl text-white font-semibold shadow-md">
            📫 Contact Me
          </a>
        </motion.div>
      </div>

      {/* Neuron background animation script */}
      <script>
        {`
          window.onload = function() {
            const canvas = document.getElementById('neuronCanvas');
            const ctx = canvas.getContext('2d');
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            let particlesArray = [];

            class Particle {
              constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
              }
              update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
              }
              draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = '#00f0ff';
                ctx.fill();
              }
            }

            function init() {
              particlesArray = [];
              for (let i = 0; i < 150; i++) {
                particlesArray.push(new Particle());
              }
            }

            function animate() {
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
              }
              requestAnimationFrame(animate);
            }

            init();
            animate();
          };
        `}
      </script>
    </div>
  );
}
