import { Star, BookOpen, Users } from "lucide-react";

function FeatureCard({ icon, title, desc, className = "" }) {
  return (
    <div className={`rounded-base border-4 p-4 shadow-shadow ${className}`}>
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-full bg-main/10 text-main-foreground">{icon}</div>
        <div>
          <div className="font-bold">{title}</div>
          <div className="text-sm opacity-90">{desc}</div>
        </div>
      </div>
    </div>
  );
}

export default function Features() {
  return (
    <section id="features" className="container mx-auto px-4 py-12">
      <h2 className="text-2xl font-heading mb-6">Features</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <FeatureCard icon={<BookOpen />} title="Structured Content" desc="Organize lessons and resources." />
        <FeatureCard icon={<Users />} title="Community" desc="Collaborate and discuss." />
        <FeatureCard icon={<Star />} title="Quality" desc="Peer-reviewed resources." />
      </div>
    </section>
  );
}
