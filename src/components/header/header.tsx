import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import Link from "next/link";
import { Suspense } from "react";
import SearchInput from "../searchInput";
import HeaderAuth from "./headerAuth";

export default async function Header() {
    return (
        <Navbar className="w-full flex items-center justify-between">
            <NavbarBrand>
                <Link href="/" className="text-3xl font-bold">Discuss</Link>
            </NavbarBrand>
            <NavbarContent justify="center">
                <NavbarItem>
                    <Suspense>
                        <SearchInput/>
                    </Suspense>
                </NavbarItem>
            </NavbarContent>            
            <NavbarContent justify="end">
                    <HeaderAuth/>
            </NavbarContent>
        </Navbar>
    )
}