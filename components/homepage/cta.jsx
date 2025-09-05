import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";

const CTA = () => {
  return (
    <section className="py-10 bg-main/10 border-b-2">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-6 text-foreground">
            Ready to Get Started?
          </h2>
          <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
            Join thousands of educators and students already transforming their
            learning experience.
          </p>
          <Button asChild size="lg" className="text-lg px-8 py-6">
            <Link href="/login">Start Your Journey</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
