import Link from "next/link";
import Image from "next/image";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

function NavLinks() {
  return (
    <nav className="flex gap-6 text-gray-700 font-medium">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Link href="/home" className="hover:text-blue-600 transition">
            Home
          </Link>
        </HoverCardTrigger>
        <HoverCardContent className="text-sm">
          Welcome to Home page 🏠
        </HoverCardContent>
      </HoverCard>
      <HoverCard>
        <HoverCardTrigger asChild>
          <Link href="/about" className="hover:text-blue-600 transition">
            About
          </Link>
        </HoverCardTrigger>
        <HoverCardContent className="text-sm">
          Learn more about us 👨‍💻
        </HoverCardContent>
      </HoverCard>

      <HoverCard>
        <HoverCardTrigger asChild>
          <Link href="/service" className="hover:text-blue-600 transition">
            Services
          </Link>
        </HoverCardTrigger>
        <HoverCardContent className="text-sm">
          What we provide ⚡
        </HoverCardContent>
      </HoverCard>
      
      <HoverCard>
        <HoverCardTrigger asChild>
          <Link href="/contact" className="hover:text-blue-600 transition">
            Contact
          </Link>
        </HoverCardTrigger>
        <HoverCardContent className="text-sm">
          Get in touch 📩
        </HoverCardContent>
      </HoverCard>
    </nav>
  );
}

function ProfileImage() {
  return (
    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-500 shadow-md hover:scale-110 transition duration-300">
      <Image
        src="/profile.jpg"
        alt="Profile"
        width={100}
        height={100}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

export default function Navigation() {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <h1 className="text-xl font-bold text-blue-600">
      </h1>

      <NavLinks />

      <ProfileImage />
    </header>
  );
}