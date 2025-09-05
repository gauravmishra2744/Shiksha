import React from "react";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Brand Section - Left side */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-xl bg-main/80 px-4 py-1.5 rounded-md border border-border/20 uppercase dark:text-black">
                Adecimate
              </span>
            </div>
            <p className="text-muted-foreground text-sm max-w-xs">
              Revolutionizing education through gamified learning experiences
              and AI-powered tools.
            </p>
          </div>

          {/* Combined Links Section - Right side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Quick Links</h3>
              <div className="space-y-2">
                <Link
                  href="/about"
                  className="block text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  About
                </Link>
                <Link
                  href="/feature"
                  className="block text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  Features
                </Link>
                <Link
                  href="/contact"
                  className="block text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  Contact
                </Link>
                <Link
                  href="/login"
                  className="block text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  Login
                </Link>
              </div>
            </div>

            {/* Support */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Support</h3>
              <div className="space-y-2">
                <Link
                  href="/help"
                  className="block text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  Help Center
                </Link>
                <Link
                  href="/privacy"
                  className="block text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="block text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-muted-foreground text-sm text-center sm:text-left">
              © {currentYear} Adecimate. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;