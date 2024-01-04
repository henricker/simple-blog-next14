'use client';

import { useSession } from "next-auth/react";

export default function Profile() {
    const session = useSession()

    if(session.data?.user) {
        return (
            <div>{JSON.stringify(session.data.user, null,)}</div>
        )
    }

    return <div>From client: user is NOT signed in</div>
}