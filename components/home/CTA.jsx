import { Button } from "@/components/ui/button";

export default function CTA() {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="rounded-base p-8 text-center bg-main text-white shadow-shadow border-4 border-main">
        <h3 className="text-2xl font-bold">Join Shiksha Today!</h3>
        <p className="mt-2 opacity-90">Create an account and start sharing knowledge.</p>
        <div className="mt-4">
          <Button className="mx-auto">Get Started</Button>
        </div>
      </div>
    </section>
  );
}
