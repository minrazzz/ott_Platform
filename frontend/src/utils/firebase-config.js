import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
   apiKey: "AIzaSyCkDOz1yGeA2UkaZYUADpQnLIpG2ruwvow",
   authDomain: "react-ott-platform.firebaseapp.com",
   projectId: "react-ott-platform",
   storageBucket: "react-ott-platform.appspot.com",
   messagingSenderId: "230883429021",
   appId: "1:230883429021:web:05c3e00de2d02d908d6274",
   measurementId: "G-QT5C2DYCDH",
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
