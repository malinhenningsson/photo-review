import { createContext, useContext } from 'react';
import { auth } from '../firebase';

const AuthContext = createContext();

const useAuthContext = () => {
    return useContext(AuthContext)
}

const AuthContextProvider = (props) => {
    const login = (email, password) => {
        // sign in user
        return auth.signInWithEmailAndPassword(email, password);
    }
    
    const register = (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password)
    }
    
    const values = {
        login,
        register
    }

    return (
        <AuthContext.Provider value={values}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthContext, useAuthContext, AuthContextProvider as default }