import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

export const Header = () => {
  return (
    <header className="sticky top-0 border-b-[1px] border-foreground/20 bg-background z-30">
      <nav className="flex max-w-7xl w-full mx-auto items-center justify-between h-14 px-4">
        <Link href="/" className="text-xl font-black">
          Logo Generator
        </Link>
        <div className="flex gap-2 items-center">
          <SignedIn>
            <Button asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <Button asChild>
              <Link href="/auth/sign-in">Sign In</Link>
            </Button>
          </SignedOut>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
};
