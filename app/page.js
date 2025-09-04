import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      This is the homepage or landing page
      <div className="flex gap-4 py-4">
        <Link href={"/student/dashboard"} className="block">
          <Button>Student Page</Button>
        </Link>
        <Link href={"/teacher/dashboard"} className="block">
          <Button>Teacher Page</Button>
        </Link>
        <Link href={"/login"} className="block">
          <Button>Login Page</Button>
        </Link>
      </div>
    </div>
  );
}
