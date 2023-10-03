"use client";

import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import Link from "next/link";
import { useUserContext } from "../../context/UserContext";
import { MouseEventHandler } from "react";
import { useRouter } from "next/navigation";

export function AppNavbar() {
  const { user, setUser } = useUserContext();
  const router = useRouter();

  const onLogout: MouseEventHandler<HTMLButtonElement> = () => {
    setUser(null);
    localStorage.removeItem("token");
    router.replace("/");
  };

  return (
    <Navbar>
      <NavbarBrand>
        <Link href="/" className="font-bold text-inherit">
          FAKESTORE
        </Link>
      </NavbarBrand>
      {user && (
        <NavbarContent justify="end">
          <NavbarItem>
            <Link href="/users">Users</Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="/products">Products</Link>
          </NavbarItem>
          <NavbarItem>
            <Button color="danger" onClick={onLogout}>
              Logout
            </Button>
          </NavbarItem>
        </NavbarContent>
      )}
    </Navbar>
  );
}
