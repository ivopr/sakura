import { Flower } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 shadow-sm hidden w-full h-20 px-8 py-2 md:block">
      <div className="container flex justify-between h-full space-x-3 items-center px-8 py-2">
        <Link
          className="flex gap-2.5 items-center text-primary"
          href="/"
          title="Sakura"
        >
          <Flower size={24} />
          <h1 className="text-1xl lg:text-3xl font-light">
            <span className="font-medium">S</span>akura
          </h1>
        </Link>
      </div>
    </header>
  );
}
