"use client";

import Link from "next/link";
import ConnectWallet from "../ui/ConnectWallet";
import { useSearchParams } from "next/navigation";

export default function Navbar() {
  const searchParams = useSearchParams();
  const connected = searchParams.get('connected') ?? "";

  return (
    <div className="flex flex-row justify-between items-center w-full px-8 py-4 border-b-[1px] border-darkgrey shadow-md">
      <Link href="/" className="text-xl text-white font-mono">
        <div >
          Crypto Run
        </div>
      </Link>
      <div className="flex flex-row items-center gap-4 sm:gap-8">
        <Link className="hover:underline" href="https://axiom.xyz" target="_blank">
          Axiom
        </Link>
        <Link className="hover:underline" href="https://docs.axiom.xyz/" target="_blank">
          Docs
        </Link>
        <Link className="hover:underline" href="https://github.com/axiom-crypto/autonomous-airdrop-example" target="_blank">
          Github
        </Link>
        <ConnectWallet/>
      </div>
    </div>
  )
}
