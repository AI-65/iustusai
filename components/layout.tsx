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
        <header className="container sticky top-0 z-40 bg-black bg-opacity-50">
          <div className="h-16 border-b border-b-slate-200 py-4 flex flex-col justify-center items-center">
            <h1 className="text-green-400 font-mono text-3xl">LegalBot</h1>
            <h2 className="text-green-400 font-mono text-sm">Powered by ChatGPT</h2>
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
