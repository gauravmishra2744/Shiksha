import { Avatar } from "@/components/ui/avatar";

function Testimonial({ name, quote }) {
  return (
    <div className="rounded-base border-4 p-4 shadow-shadow">
      <div className="flex items-center gap-3">
        <Avatar>
          <img src="/avatars/teacher.jpg" alt={name} />
        </Avatar>
        <div>
          <div className="font-bold">{name}</div>
          <div className="text-sm opacity-90">{quote}</div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-2xl font-heading mb-6">Why Shiksha</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <Testimonial name="Ms. Priya" quote="Great for collaborative learning." />
        <Testimonial name="Rahul" quote="Helps me stay organized." />
        <Testimonial name="Anita" quote="Love the community features." />
      </div>
    </section>
  );
}
