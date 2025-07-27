"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Breadcrumb = () => {
  const pathname = usePathname(); // Gets the current route
  const pathSegments = pathname.split("/").filter(Boolean); 

  return (
    <nav className="text-sm text-gray-500 flex gap-2">
      <Link href="/" className="hover:underline">Home</Link>
      {pathSegments.map((segment, i) => {
        const href = "/" + pathSegments.slice(0, i + 1).join("/");

        const formattedSegment =
          segment.charAt(0).toUpperCase() + segment.slice(1);

        return (
          <span key={i} className="flex items-center gap-2">
            <span>/</span>
            <Link href={href} className="hover:underline">
              {formattedSegment}
            </Link>
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
