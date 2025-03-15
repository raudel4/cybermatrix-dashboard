
import React, { useEffect, useRef } from 'react';

interface MatrixRainProps {
  className?: string;
}

const MatrixRain: React.FC<MatrixRainProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Matrix character set
    const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    
    // Column configuration
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    
    // Initialize drops array, one per column
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -100); // Start above screen with random offset
    }

    // Draw function
    const draw = () => {
      // Semi-transparent black background to create trail effect
      context.fillStyle = 'rgba(0, 0, 0, 0.05)';
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      // Green text color (80% green, 20% blue for variety)
      const useBlue = Math.random() > 0.8;
      context.fillStyle = useBlue ? '#00b3ff' : '#00ff9d';
      context.font = `${fontSize}px "Share Tech Mono", monospace`;
      
      // Loop through drops
      for (let i = 0; i < drops.length; i++) {
        // Random character
        const text = characters[Math.floor(Math.random() * characters.length)];
        
        // x coordinate of the drop, y coordinate is drops[i] * fontSize
        context.fillText(text, i * fontSize, drops[i] * fontSize);
        
        // Randomly reset a drop if it's below screen or randomly
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        
        // Increment y coordinate
        drops[i]++;
      }
    };

    // Animation loop
    const interval = setInterval(draw, 50);

    // Cleanup
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 w-full h-full -z-10 opacity-40 ${className}`}
      aria-hidden="true"
    />
  );
};

export default MatrixRain;
