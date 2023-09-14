'use client'
import { useContext, createContext, useEffect, useState } from "react";

import { GoogleAuthProvider, signInWithPopup, GithubAuthProvider, OAuthProvider, onAuthStateChanged } from 'firebase/auth';
import {auth} from "@/app/firebase";
import {useRouter} from "next/navigation";

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const router = useRouter();
    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then(() => router.push('/'))
            .catch((err) => console.log(err));
    }

    const githubSignIn = () => {
        const provider = new GithubAuthProvider();
        signInWithPopup(auth, provider)
            .then(() => router.push('/'))
            .catch((err) => {
                if (err.code === "auth/account-exists-with-different-credential") {
                    alert('This Account exists with different Credentials.');
                }
            });
    }

    const microsoftSignIn = () => {
        const provider = new OAuthProvider('microsoft.com');
        provider.setCustomParameters({
            prompt: "consent",
            tenant: "9af9fae6-f5c9-4332-98a7-f640eb52df5c",
        })
        signInWithPopup(auth, provider)
            .then(() => router.push('/'))
            .catch((err) => console.log(err));
    }

    const handleSocialSignIn = async (signInFunction) => {
        try {
            switch (signInFunction) {
                case 'google':
                    await googleSignIn();
                    break;
                case 'github':
                    await githubSignIn();
                    break;
                case 'microsoft':
                    await microsoftSignIn();
                    break;
                default:
                    console.log('Authentication not provided.')
                    break;
            }
        } catch (error) {
            alert(error.code)
            console.log(error.code);
        }
    }

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
    }, [user]);

    return(
        <AuthContext.Provider value={{user, googleSignIn, githubSignIn, microsoftSignIn, handleSocialSignIn}}>{children}</AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext);
}