"use client";
import Link from "next/link";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import logoMovie from "../../assets/logo/movieLove.png";


function Navbar() {

  const router = useRouter();
  
  function signOut() {

    document.cookie = "auth_cookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "user_data=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    router.push('/');
  }

  return (
    <>
      <header
        aria-label="Site Header"
        className="border-b bg-white shadow-sm font-inter"
      >
        <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
              <Link href="/home">
                <Image
                  className="max-h-12 duration-300 hover:scale-125 w-auto"
                  src={logoMovie}
                  alt="Logo de la empresa"
                  width={50}
                  height={50}
                />
              </Link>
            </div>

          <div className="flex flex-1 items-center justify-end gap-8 mr-10">
            <nav
              aria-label="Site Nav"
              className="flex gap-4 lg:text-xs font-bold uppercase tracking-wide text-gray-500 items-center"
            >

              <div className="flex items-center border-x border-gray-100">
                <div className="flex items-center">
                  <span className="border-e border-e-gray-100">
                    <Link
                      href="/profile"
                      className="grid h-16 w-16 place-content-center border-b-4 border-transparent duration-300 hover:scale-150 hover:text-blue-300"
                    >
                      <FaUserCircle className="text-gray-900 text-2xl hover:text-blue-300 transition-colors" />
                    </Link>
                  </span>
                </div>
              </div>

              <FaSignOutAlt
                onClick={signOut}
                className="h-8 w-8 cursor-pointer text-gray-900 text-2xl hover:text-blue-300 transition-colors"
              />

            </nav>
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;
