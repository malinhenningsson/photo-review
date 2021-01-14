import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';

const AuthContext = createContext();

const useAuthContext = () => {
    return useContext(AuthContext)
}

const AuthContextProvider = (props) => {
    const [authUser, setAuthUser] = useState(null);
	const [loading, setLoading] = useState(true);

    const forgotPassword = (email) => {
        return auth.sendPasswordResetEmail(email)
    }

    const login = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password);
    }

    const logout = () => {
		return auth.signOut();
	}
    
    const register = (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setAuthUser(user);
            setLoading(false);
        })
        
        return unsubscribe;
    }, []);
    
    const values = {
        authUser,
        loading,
        forgotPassword,
        login,
        logout,
        register
    }

    return (
        <AuthContext.Provider value={values}>
            {!loading && props.children}
        </AuthContext.Provider>
    )
}

export { AuthContext, useAuthContext, AuthContextProvider as default }