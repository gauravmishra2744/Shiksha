"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="w-full bg-transparent">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-2xl font-heading">Shiksha</Link>
          <div className="hidden md:flex items-center gap-4 ml-6">
            <Link href="/" className="text-sm hover:text-main">Home</Link>
            <a href="#features" className="text-sm hover:text-main">Features</a>
            <a href="#about" className="text-sm hover:text-main">About</a>
            <a href="#contact" className="text-sm hover:text-main">Contact</a>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="neutral">Login</Button>
          </Link>
          <Link href="/login">
            <Button>Sign up</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
