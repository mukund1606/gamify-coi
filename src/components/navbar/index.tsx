import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="w-full flex justify-between items-center py-4 px-6">
      <div>Logo</div>
      <div className="flex gap-4 items-center">
        <Button asChild variant="link" className="text-md">
          <Link href="/">Home</Link>
        </Button>
        <Button asChild variant="link" className="text-md">
          <Link href="/library">Library</Link>
        </Button>
      </div>
    </nav>
  );
}
