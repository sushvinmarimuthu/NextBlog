'use client'
import React, {useEffect, useState} from 'react';
import {UserAuth} from "@/app/context/AuthContext";
import {useRouter} from "next/navigation";

const Page = () => {
    const [loading, setLoading] = useState(false);
    const {user} = UserAuth();
    const router = useRouter();
    useEffect(() => {
        setLoading(true);
        if (user == null) {
            router.push('/auth/login');
        }
        setLoading(false);
    }, [user]);

    return (
        <div>
            <h1>Profile Page</h1>
            {loading === false && user ? (
                <div>
                    <p>{user.displayName}</p>
                    <p>{user.email}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Page;