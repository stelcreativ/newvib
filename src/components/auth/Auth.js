import React, { useEffect, useState, createContext } from 'react'
import firebase from "../../firebase/config"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            setCurrentUser(user)
        })
        return unsubscribe
    }, [])

    return (
        <AuthContext.Provider
            value={{
                currentUser,

            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider