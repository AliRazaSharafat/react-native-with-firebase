import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "test-70024.firebaseapp.com",
  projectId: "test-70024",
  storageBucket: "test-70024.appspot.com",
  messagingSenderId: "864334745251",
  appId: "1:864334745251:web:d7195e8373b561d621b916",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
