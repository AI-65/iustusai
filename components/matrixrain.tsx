import React, { useEffect, useRef, useState } from 'react';

const MatrixRain = () => {
  // Initialize canvas reference and dimensions state
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Set dimensions when the component mounts
  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  // Main effect to create and update the matrix rain animation
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Define the code abbreviations to be displayed
    const codeAbbreviations = ['BGB', 'StGB', 'ZPO', 'HGB', 'AktG', 'SGB II', 'StVO', 'StPO'];

    // Generate a random paragraph with code abbreviation and section number
    const randomParagraph = () => {
      const abbreviation = codeAbbreviations[Math.floor(Math.random() * codeAbbreviations.length)];
      const sectionNumber = Math.floor(Math.random() * 300) + 1;
      return `§ ${sectionNumber} ${abbreviation}`;
    };

    // Set font size and calculate the number of columns based on canvas width
    const fontSize = 16;
    const columns = canvas.width / fontSize;

    // Initialize raindrops array with random starting positions
    const rainDrops = [];

    for (let x = 0; x < columns; x++) {
      rainDrops[x] = Math.random() * 20;
    }

    // Main draw function to update the matrix rain animation
    const draw = () => {
      // Clear the canvas with a semi-transparent black rectangle
      context.fillStyle = 'rgba(0, 0, 0, 0.05)';
      context.fillRect(0, 0, canvas.width, canvas.height);

      // Set text color and font
      context.fillStyle = '#0F0';
      context.font = fontSize + 'px monospace';

      // Iterate over the raindrops array and draw each raindrop
      for (let i = 0; i < rainDrops.length; i++) {
        const text = randomParagraph();
        context.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        // Reset the raindrop position if it reaches the bottom of the canvas or randomly with a small chance
        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }

        // Update the raindrop's position for the next frame
        rainDrops[i]++;
      }
    };

    // Set an interval to call the draw function every 60 milliseconds
    const intervalId = setInterval(draw, 60);
    // Clear the interval when the component is unmounted or dimensions change
    return () => clearInterval(intervalId);
  }, [dimensions]);

  // Render the canvas element with the proper dimensions and styles
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
