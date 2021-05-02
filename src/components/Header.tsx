import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="p-4">
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/post/create">
              <a>create</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
