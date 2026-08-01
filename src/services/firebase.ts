import { initializeApp } from "firebase/app";
import { getAuth, signOut, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Sign in using a redirect
const provider = new GoogleAuthProvider()
provider.setCustomParameters({
  prompt: "select_account",
})

// never need more than one authentication
export const auth = getAuth(app);

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
  }
}

export const signInGoogleWithGooglePopup = () => signInWithPopup(auth, provider)
export default app;