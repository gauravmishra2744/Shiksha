import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t-2 border-border mt-12">
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="font-bold">Shiksha</div>
          <Link href="/about" className="text-sm">About</Link>
          <Link href="/contact" className="text-sm">Contact</Link>
        </div>
        <div className="text-sm">© {new Date().getFullYear()} Shiksha</div>
      </div>
    </footer>
  );
}
