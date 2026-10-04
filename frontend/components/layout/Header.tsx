import Link from "next/link";
import Navigation from "./Navigation";

export default function Header() {
  return (
    <header>
      <Link href="/" aria-label="Go to homepage">
        JP.DEV
      </Link>

      <Navigation />
    </header>
  );
}