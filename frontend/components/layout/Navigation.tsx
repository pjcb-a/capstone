import Link from "next/link";

const navigationItems = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "AI Guide", href: "/chat" },
  { label: "Experience", href: "/experience" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navigation() {
  return (
    <nav className="site-nav" aria-label="Main navigation">
      <ul>
        {navigationItems.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
