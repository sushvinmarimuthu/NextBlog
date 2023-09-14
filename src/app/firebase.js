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