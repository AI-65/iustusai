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
    const sectionNumbers = Array.from({ length: 300 }, (_, i) => i + 1);

    const randomParagraph = () => {
      const abbreviation = codeAbbreviations[Math.floor(Math.random() * codeAbbreviations.length)];
      const sectionNumber = sectionNumbers[Math.floor(Math.random() * sectionNumbers.length)];
      return `§ ${sectionNumber} ${abbreviation}`;
    };

    const fontSize = 16;
    const columns = canvas.width / fontSize;

    const rainDrops = [];

    for (let x = 0; x < columns; x++) {
      rainDrops[x] = 1;
    }

    const draw = () => {
      context.fillStyle = 'rgba(0, 0, 0, 0.05)';
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.fillStyle = '#0F0';
      context.font = fontSize + 'px monospace';

      for (let i = 0; i < rainDrops.length; i++) {
        const text = randomParagraph();
        context.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }

        rainDrops[i]++;
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
