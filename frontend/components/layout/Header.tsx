import Link from "next/link";
import Navigation from "./Navigation";

export default function Header() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link className="brand" href="/" aria-label="JP.DEV homepage">
          JP<span>.DEV</span>
        </Link>
        <Navigation />
      </div>
    </header>
  );
}
