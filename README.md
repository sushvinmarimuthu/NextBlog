## Getting Started
Create New Next App

This Project configuration:
```bash
$ npx create-next-app
√ What is your project named? ... sample_app
√ Would you like to use TypeScript? ... 'No' / Yes
√ Would you like to use ESLint? ... 'No' / Yes
√ Would you like to use Tailwind CSS? ... No / 'Yes'
√ Would you like to use `src/` directory? ... No / 'Yes'
√ Would you like to use App Router? (recommended) ... No / 'Yes'
√ Would you like to customize the default import alias? ... 'No' / Yes
```

### Dependencies:
```json
{
   "autoprefixer": "10.4.15",
   "encoding": "^0.1.13",
   "firebase": "^10.3.1",
   "next": "13.4.19",
   "postcss": "8.4.29",
   "react": "18.2.0",
   "react-dom": "18.2.0",
   "tailwindcss": "3.3.3"
}
```

To install all the dependencies in the `package.json`:
```bash
$ npm install
```

## Firebase Setup:
1. Go to [`Firebase Website`](https://firebase.google.com/)
2. Click go to console.
3. Click Add Project and Create new project.
4. Once the Project created, click continue to enter project dashboard.
5. Click Web(under Add an app to get started).
6. Register your app there and then firebase will generate the config for your app like this.
7. Create a new file as `firebase.js` in your app folder and Copy that config code to that file.
8. Add getAuth in this `firebase.js` file.
    ```js
    import { initializeApp } from "firebase/app";
    import { getAuth } from "firebase/auth";

    const firebaseConfig = {
    apiKey: "AIzaSyDxsuTTVTUh5LPehRG1yKWl5-D3-9SZPhc",
    authDomain: "nextblog-project.firebaseapp.com",
    projectId: "nextblog-project",
    storageBucket: "nextblog-project.appspot.com",
    messagingSenderId: "806611823382",
    appId: "1:806611823382:web:ec82a736b2d695fa8dbe37",
    measurementId: "G-FS5B0H218G"
    };
    
    const app = initializeApp(firebaseConfig);
    
    export const auth = getAuth(app);
    ```

## AuthContext:
AuthContext used for Authentication.
We can pass the data through the components without props.

### Basic AuthContext Setup:
```js
import { useContext, createContext, useEffect, useState } from "react";
const AuthContext = createContext();
export const AuthContextProvider = ({children}) => {
   const [user, setUser] = useState(null); // initially set null

   // It'll set the user.
   useEffect(() => {
      onAuthStateChanged(auth, (currentUser) => {
         setUser(currentUser);
      });
   }, [user]);

   return(
           <AuthContext.Provider value={{user}}>{children}</AuthContext.Provider>
   )

   export const UserAuth = () => {
      return useContext(AuthContext);
   }
}
```

## Layout.js
```js
import {AuthContextProvider} from "@/app/context/AuthContext";

export default function RootLayout({ children }) {
   return (
           <html lang="en">
              <body className={inter.className}>
                 <AuthContextProvider>
                    {children}
                 </AuthContextProvider>
              </body>
           </html>
   )
}
```

### Email/Password Registration:
#### In Firebase
1. Go to firebase console -> Authentication -> Sign-in method.
2. Enable the Email/Password Provider.

#### In Project:
1. From `firebase/auth` import `createUserWithEmailAndPassword` for Email/Password registration.
2. Import `onAuthStateChanged` for check the user logged in or not and to set the current user and session.
   ```js
   import {onAuthStateChanged, createUserWithEmailAndPassword} from "firebase/auth";
    ```
3. Import `auth` from the `firebase.js` for Authentication for the provider.
   ```js
    import {auth} from "@/app/firebase";
    ```
4. In `register/page.jsx`:
   ```js
   import {useState} from 'react';
   import {onAuthStateChanged, createUserWithEmailAndPassword} from "firebase/auth";
   import {auth} from "@/app/firebase";
   
   // get and set email/password from register form.
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   
   // function to handle signup
   function handleSignUp(e) {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                router.push('/');
            })
            .catch((error) => {
                alert(error);
            });
    }
   
   // Add this in form field
   <form className="space-y-6" onSubmit={handleSignUp}>
   
   <input
    onChange={(e) => setEmail(e.target.value)}
    value={email}
   />
   <input
    onChange={(e) => setPassword(e.target.value)} 
    value={password}
   />
   <button type="submit">Register</button>
   </form>
    ```

5. To check user logged in.
   ```js
    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            // Add your code here...
            // redirect if user logged in...
        });
    }, [user]);
    ```

### Email/Password Login:
#### In Project:
1. From `firebase/auth` import `signInWithEmailAndPassword` for Email/Password login.
2. Import `onAuthStateChanged` for check the user logged in or not and to set the current user and session.
   ```js
   import {onAuthStateChanged, signInWithEmailAndPassword} from "firebase/auth";
    ```
3. Import `auth` from the `firebase.js` for Authentication for the provider.
   ```js
    import {auth} from "@/app/firebase";
    ```
4. In `register/page.jsx`:
   ```js
   import {useState} from 'react';
   import {onAuthStateChanged, signInWithEmailAndPassword} from "firebase/auth";
   import {auth} from "@/app/firebase";
   
   // get and set email/password from register form.
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   
   // function to handle signup
   function handleSignIn(e) {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                router.push('/');
            })
            .catch((error) => {
                alert(error);
            });
    }
   
   // Add this in form field
   <form className="space-y-6" onSubmit={handleSignIn}>
   
   <input
    onChange={(e) => setEmail(e.target.value)}
    value={email}
   />
   <input
    onChange={(e) => setPassword(e.target.value)} 
    value={password}
   />
   <button type="submit">Login</button>
   </form>
    ```

5. To check user logged in.
   ```js
    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            // Add your code here...
            // redirect if user logged in...
        });
    }, [user]);
    ```

### Sign in with Google:
#### In Firebase:
1. Go to firebase console -> Authentication -> Sign-in method.
2. Enable the Google Provider.

#### In Project:
1. In AuthContext:
   1. Import `GoogleAuthProvider` - It'll provide the Google Authentication.
   2. Import `signInWithPopup` - It'll provide the function for sign-in popup window.
   ```js
   // Add this imports
   import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
   
   // Google Authentication
   const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
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
                default:
                    console.log('Authentication not provided.')
                    break;
            }
        } catch (error) {
            console.log(error)
        }
    }
   
   return(
       <AuthContext.Provider value={{user, handleSocialSignIn}}>{children}</AuthContext.Provider>
   )
   ```

2. In `login/page.jsx`
   ```js
   import {UserAuth} from "@/app/context/AuthContext";
   
   const {user, handleSocialSignIn} = UserAuth();
   
   <a onClick={() => handleSocialSignIn('google')}>Google</a>
    ```

### Sign in with GitHub:
#### In GitHub:
1. Go to GitHub and [register new OAuth application](https://github.com/settings/applications/new).
2. To get the Authorization callback url:
   1. Go to firebase console -> Authentication -> Sign-in method.
   2. Click GitHub and copy the `authorization url` in the bottom.
3. To get the Client ID and Secret:
   1. After the register app, It shows the `Client ID`.
   2. Click `Generate a new client secret` to get the client secret.

#### In Firebase:
1. Go to firebase console -> Authentication -> Sign-in method.
2. Enable the GitHub Provider and copy the client ID and Secret from the GitHub.
3. Paste it in the firebase GitHub popup and save it.

#### In Project:
1. In AuthContext:
   1. Import `githubSignIn` - It'll provide the GitHub Authentication.
   ```js
   // Add this imports
   import { githubSignIn, signInWithPopup } from 'firebase/auth';

   // GitHub Authentication
   const githubSignIn = () => {
        const provider = new GithubAuthProvider();
        signInWithPopup(auth, provider)
            .then(() => router.push('/'))
            .catch((err) => console.log(err));
    }
   
   const handleSocialSignIn = async (signInFunction) => {
        try {
            switch (signInFunction) {
                case 'github':
                    await githubSignIn();
                    break;
                default:
                    console.log('Authentication not provided.')
                    break;
            }
        } catch (error) {
            console.log(error)
        }
    }
   
   return(
       <AuthContext.Provider value={{user, handleSocialSignIn}}>{children}</AuthContext.Provider>
   )
   ```

2. In `login/page.jsx`
   ```js
   import {UserAuth} from "@/app/context/AuthContext";
   
   const {user, handleSocialSignIn} = UserAuth();
   
   <a onClick={() => handleSocialSignIn('github')}>Github</a>
    ```

### Sign in with Microsoft:
#### In Microsoft Azure Portal:
1. Go to Azure Active Directory and [Register new Application.](https://portal.azure.com/#view/Microsoft_AAD_RegisteredApps/CreateApplicationBlade/quickStartType~/null/isMSAApp~/false)
2. Select
3. In Redirect, select web and get the authorization URL from,
   1. Go to firebase console -> Authentication -> Sign-in method.
   2. Click GitHub and copy the `authorization url` in the bottom.

4. After the register the App, copy the `Application (client) ID` and `Directory (tenant) ID`.
5. To get the secret ID:
   1. Go to `Certificates & Secrets` and click `new client secret` in the `Client Secrets`.
   2. Give description and expires - 6 months by default and add it.
   3. Now, copy the `Value`. (Not the secret).

#### In Firebase:
1. Go to firebase console -> Authentication -> Sign-in method.
2. Enable the Microsoft Provider.
3. Paste the `Application (client) ID` in the Application ID.
4. Paste the `Value` in the Application Secret and save it.

#### In Project:
1. In AuthContext:
   1. Import `OAuthProvider` - It'll provide the OAuth.
   ```js
   // Add this imports
   import { OAuthProvider, signInWithPopup } from 'firebase/auth';

   // GitHub Authentication
   const microsoftSignIn = () => {
        const provider = new OAuthProvider('microsoft.com');
        provider.setCustomParameters({
            prompt: "consent",
            // tenant: Directory (tenant) ID
            tenant: "9af9fae6-f5c9-4332-98a7-f640eb52df5c",
        })
        signInWithPopup(auth, provider)
            .then(() => router.push('/'))
            .catch((err) => console.log(err));
   }
   
   const handleSocialSignIn = async (signInFunction) => {
        try {
            switch (signInFunction) {
                case 'microsoft':
                    await microsoftSignIn();
                    break;
                default:
                    console.log('Authentication not provided.')
                    break;
            }
        } catch (error) {
            console.log(error)
        }
    }
   
   return(
       <AuthContext.Provider value={{user, handleSocialSignIn}}>{children}</AuthContext.Provider>
   )
   ```

2. In `login/page.jsx`
   ```js
   import {UserAuth} from "@/app/context/AuthContext";
   
   const {user, handleSocialSignIn} = UserAuth();
   
   <a onClick={() => handleSocialSignIn('microsoft')}>Microsoft</a>
    ```



First, run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
