'use client';
import { WagmiProvider, createConfig, http } from "wagmi";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { wagmiConfig } from '@/lib/wagmiConfig';
import { useEffect, useState } from 'react';
import { sepolia } from "wagmi/chains";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>
          {mounted && children}
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
