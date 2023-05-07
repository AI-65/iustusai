import MatrixRain from './matrixrain';
import React from 'react';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <MatrixRain />
      <div className="mx-auto flex flex-col space-y-4 relative z-10 min-h-screen">
        <div className="sticky top-0 z-40 bg-black bg-opacity-50">
          <header className="w-full">
            <div className="container h-16 border-b border-b-slate-200 py-4 flex flex-col justify-center items-center">
              <h1 className="text-green-400 font-mono text-3xl">IustusAI</h1>
              <h2 className="text-green-400 font-mono text-sm">Powered by ChatGPT</h2>
            </div>
          </header>
          <main className="flex w-full flex-1 flex-col overflow-hidden">
            {children}
          </main>
        </div>
        <footer className="w-full bottom-0 z-40 bg-black bg-opacity-50">
          <div className="container h-16 border-t border-t-slate-200 py-4 flex flex-col justify-center items-center">
            <h2 className="text-green-400 font-mono text-sm">Demo built by Ilja Garber</h2>
            <a
              className="text-green-400 font-mono text-sm hover:underline"
              href="https://github.com/AI-65"
              target="_blank"
              rel="noopener noreferrer"
            >
              @AI-65
            </a>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Layout;
