import { createContext, useContext, useState, useEffect } from 'react';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from '../config/firebase.ts';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: any) {
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);

  const googleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      setError(err.code);
    }
  }

  useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user: any) => {
        setCurrentUser(user);
      });

      return unsubscribe;
  }, []);

  const value = {
    googleLogin,
    currentUser,
    error
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}