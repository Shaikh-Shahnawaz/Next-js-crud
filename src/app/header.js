"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const TOKEN = localStorage.getItem("token");
  function logout() {
    localStorage.removeItem("token");
    router.push("/login");
  }

  return (
    <header class="bg-gray-500">
      <nav
        class="mx-auto flex max-w-7xl items-center justify-between p-3 lg:px-8"
        aria-label="Global"
      >
        <div class="flex lg:flex-1">
          <a href="#" class="-m-1.5 p-1.5">
            <span class="sr-only">Your Company</span>
            <img
              class="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
          </a>
        </div>

        <div class="flex lg:flex-1">
          <Link href={"/"}>Home</Link>
        </div>
        <div class="flex lg:flex-1">
          <Link href={"/dashboard"}>Dashboard</Link>
        </div>

        <div class="hidden lg:flex lg:flex-1 lg:justify-end">
          {TOKEN ? (
            <span
              onClick={logout}
              style={{ cursor: "pointer" }}
              aria-hidden="true cursor-pointer"
            >
              Logout &rarr;
            </span>
          ) : (
            //  <span style={{"cursor":"pointer"}} aria-hidden="true"></span>
            // <Link href={"/login"}>Log in&rarr;</Link>
            ""
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
