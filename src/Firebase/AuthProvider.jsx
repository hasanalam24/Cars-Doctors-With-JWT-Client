import { createContext, useEffect, useState } from "react";
import app from "./firebase.config";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { set } from "firebase/database";
const auth = getAuth(app);


export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)


    //sign up
    const signUpUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    //sign in
    const signInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    useEffect(() => {
        const unSubcribe = onAuthStateChanged(auth, currentUser => {
            setLoading(false)
            setUser(currentUser)
        })
        return () => unSubcribe()
    }, [])

    const allvalues = {
        signUpUser,
        signInUser,
        user,
        loading,
        logOut
    }
    return (


        <AuthContext.Provider value={allvalues}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;