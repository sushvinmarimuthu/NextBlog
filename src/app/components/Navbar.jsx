import React, {useState, useEffect} from 'react';
import Link from "next/link";
import {UserAuth} from "@/app/context/AuthContext";
import {onAuthStateChanged, signOut} from "firebase/auth";
import {auth} from '../firebase'
import {useRouter} from "next/navigation";

function Navbar() {
    const router = useRouter();
    const {user} = UserAuth();
    const [loading, setLoading] = useState(true);

    const handleSignOut = e => {
        e.preventDefault()
        signOut(auth)
            .then(() => router.push('/auth/login'))
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setLoading(false)
        });
    }, [user]);

    return (
        <div className={"flex items-center justify-between"}>
            <ul className={"flex"}>
                <li className={"cursor-pointer p-2"}>
                    <Link href={"/"}>Home</Link>
                </li>
                <li className={"cursor-pointer p-2"}>
                    <Link href={"/about"}>About</Link>
                </li>
                <li className={"cursor-pointer p-2"}>
                    <Link href={"/profile"}>Profile</Link>
                </li>
            </ul>

            {loading ? (<p>Loading...</p>) : user ? (
                <ul className={"flex"}>
                    <li className={"cursor-pointer p-2"}>
                        {user.displayName}
                    </li>
                    <li className={"cursor-pointer p-2"}>
                        <button onClick={handleSignOut} type={"button"}>Logout</button>
                    </li>
                </ul>
            ) : (
                <ul className={"flex"}>
                    <li className={"cursor-pointer p-2"}>
                        <Link href={"/auth/login"}>Login</Link>
                    </li>
                    <li className={"cursor-pointer p-2"}>
                        <Link href={"/auth/register"}>Register</Link>
                    </li>
                </ul>
            )}
        </div>
    );
}

export default Navbar;