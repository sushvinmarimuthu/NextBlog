'use client'
import React, {useEffect, useState} from 'react';
import {UserAuth} from "@/app/context/AuthContext";
import {createUserWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";
import {auth} from '../../firebase';
import {useRouter} from "next/navigation";

function Page() {
    const router = useRouter();
    const {user} = UserAuth();
    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSignUp(e) {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                router.push('/');
            })
            .catch((error) => {
                if (error.code === "auth/email-already-in-use") {
                    alert('Email already exists.');
                } else if (error.code === "auth/weak-password") {
                    alert('Password should be at least 6 characters.')
                }
            });
    }

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setLoading(true);
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
                            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white-900">Register new account</h2>
                        </div>

                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form className="space-y-6" onSubmit={handleSignUp}>
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
                                    <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                        Register
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
        </>
    )
}

export default Page;