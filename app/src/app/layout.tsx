'use client';
import './globals.css'
import satoshi from 'next/font/local';
import { Source_Code_Pro } from 'next/font/google';
import type { Metadata } from 'next'
import Providers from './providers'
import Navbar from '@/components/layout/Navbar';
import MainLayout from '@/components/layout/MainLayout';
import AxiomProvider from './axiomProvider';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

const Satoshi = satoshi({
  src: '../../public/fonts/Satoshi-Variable.ttf',
  display: "swap",
  weight: "500 700",
  variable: "--font-satoshi",
});

const SourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  display: "swap",
  weight: ["400", "600"],
  variable: "--font-source-code-pro",
});

// export const metadata: Metadata = {
//   title: 'Axiom Autonomous Airdrop Example dApp',
//   description: 'Users are able to generate a ZK proof of their own on-chain history to be eligible for an airdrop.',
// }

const DynamicComponentWithNoSSR = dynamic(() => import('../components/game/GameIndex'), { ssr: false });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
  }, []);
  return (
    <html lang="en">
      <body className={`${Satoshi.className} ${Satoshi.variable} ${SourceCodePro.variable}`}>
        <Providers>
          <main className="flex flex-col w-screen min-h-screen justify-start items-center">
            <Navbar />
            <MainLayout>
              <AxiomProvider>
                {children}
              <div key={Math.random()} id='game'>
                {loading ? <DynamicComponentWithNoSSR /> : null}
              </div>
              </AxiomProvider>
            </MainLayout>
          </main>
        </Providers>
      </body>
    </html>
  )
}
