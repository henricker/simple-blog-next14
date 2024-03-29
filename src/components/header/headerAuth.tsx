'use client';

import { signIn, signOut } from "@/actions";
import { Avatar, Button, NavbarItem, Popover, PopoverContent, PopoverTrigger, Spinner } from "@nextui-org/react";
import { useSession } from "next-auth/react";

export default function HeaderAuth() {
    const session = useSession();
    if(session.status === 'loading') {
        return <Spinner/>
    }
    return (
        session?.data?.user ? 
        (
            <div>
                <Popover placement="left">
                  <PopoverTrigger>
                  <Avatar src={session.data.user.image || ''}/>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="p-4">
                        <form action={signOut}>
                            <Button type="submit">Sign out</Button>
                        </form>
                    </div>
                  </PopoverContent>
                </Popover>

            </div>
        )
        :
        (
            <div className="flex items-center gap-2">
                <NavbarItem>
                    <form action={signIn}>
                        <Button type="submit" color="secondary" variant="bordered">
                            Sign In
                        </Button>
                    </form>
                </NavbarItem>
                <NavbarItem>
                    <form action={signIn}> 
                        <Button type="submit" color="primary" variant="flat">
                            Sign Up
                        </Button>
                    </form>
                </NavbarItem>

            </div>
        )
    )
}