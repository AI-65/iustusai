import React, { useEffect, useRef, useState } from 'react';

const MatrixRain = () => {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const codeAbbreviations = ['BGB', 'StGB', 'ZPO', 'HGB', 'AktG', 'SGB II', 'StVO', 'StPO'];

    const randomParagraph = () => {
      const abbreviation = codeAbbreviations[Math.floor(Math.random() * codeAbbreviations.length)];
      const sectionNumber = Math.floor(Math.random() * 300) + 1;
      return `§ ${sectionNumber} ${abbreviation}`;
    };

    const fontSize = 8;
    const horizontalSpacing = 2; // Increase horizontal spacing by a factor of 2
    const spacing = 2;
    const columns = canvas.width / (fontSize + spacing);

    const rainDrops = [];

    for (let x = 0; x < columns; x++) {
      rainDrops[x] = Math.random() * 20;
    }

    const draw = () => {
      context.fillStyle = 'rgba(0, 0, 0, 0.05)';
      context.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < rainDrops.length; i++) {
        const text = randomParagraph();
        const yPos = rainDrops[i] * fontSize;

        // Create gradient effect
        const gradient = context.createLinearGradient(0, yPos - fontSize, 0, yPos + fontSize);
        gradient.addColorStop(0, 'rgba(0, 255, 0, 0)');
        gradient.addColorStop(0.5, '#0F0');
        gradient.addColorStop(1, 'rgba(0, 255, 0, 0)');

        context.fillStyle = gradient;
        context.font = fontSize + 'px monospace';
        context.fillText(text, i * (fontSize + spacing), yPos);

        if (yPos > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }

        // Randomize speed
        rainDrops[i] += Math.random() * 0.5 + 0.5;
      }
    };

    const intervalId = setInterval(draw, 60);
    return () => clearInterval(intervalId);
  }, [dimensions]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      width={dimensions.width}
      height={dimensions.height}
    />
  );
};

export default MatrixRain;
