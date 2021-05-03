import React from "react";
import Link from "next/link";
import { ModalForm } from "../components/Modal/Modal";

const Header = () => {
  return (
    <header className="p-4">
      <nav>
        <ul>
          {/* <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li> */}
          <li>
            <ModalForm />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
