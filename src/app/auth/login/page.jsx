'use client'
import React, {useEffect, useState} from 'react';
import {UserAuth} from "@/app/context/AuthContext";
import {useRouter} from "next/navigation";
import {onAuthStateChanged, signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "@/app/firebase";

function Page() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const {user, handleSocialSignIn} = UserAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSignIn(e) {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then(() => router.push('/'))
            .catch((error) => {
                if (error.code === "auth/wrong-password") {
                    alert('Wrong Password');
                } else if (error.code === "auth/user-not-found") {
                    alert('User not found');
                }
            });
    }

    useEffect(() => {
        setLoading(true)
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                router.push('/');
            }
            setLoading(false)
        });
    }, [user]);


    return (
        <>
            {loading ? (<p>Loading</p>)
                : (
                    <div className={"flex min-h-full flex-col justify-center px-6 py-12 lg:px-8"}>
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white-900">Sign in to your account</h2>
                        </div>

                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form className="space-y-6" onSubmit={handleSignIn}>
                                <div>
                                    <label className="block text-sm font-medium leading-6 text-white-900">Email address</label>
                                    <div className="mt-2">
                                        <input
                                            onChange={(e) => setEmail(e.target.value)}
                                            value={email}
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label className="block text-sm font-medium leading-6 text-white-900">Password</label>
                                        <div className="text-sm">
                                            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            onChange={(e) => setPassword(e.target.value)}
                                            value={password}
                                            id="password"
                                            name="password"
                                            type="password"
                                            autoComplete="current-password"
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-white-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                                </div>
                            </form>

                            <p className="mt-10 text-center text-sm text-white-500">
                                Sign with <a className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 cursor-pointer" onClick={() => handleSocialSignIn('google')}>Google</a>
                                <br /><br />
                                Sign with <a className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 cursor-pointer" onClick={() => handleSocialSignIn('github')}>Github</a>
                                <br /><br />
                                Sign with <a className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 cursor-pointer" onClick={() => handleSocialSignIn('microsoft')}>Microsoft</a>
                            </p>
                        </div>
                    </div>

                )}
        </>

    );
}

export default Page;