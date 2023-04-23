import MatrixRain from './matrixrain';
import React from 'react';

interface LayoutProps {
  children?: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <MatrixRain />
      <div className="mx-auto flex flex-col space-y-4 relative z-10">
        <header className="container sticky top-0 z-40 bg-white">
          <div className="h-16 border-b border-b-slate-200 py-4">
            <nav className="ml-4 pl-6">
              <a href="#" className="hover:text-slate-600 cursor-pointer">
                Home
              </a>
            </nav>
          </div>
        </header>
        <div>
          <main className="flex w-full flex-1 flex-col overflow-hidden">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
