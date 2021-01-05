import { createContext, useContext } from 'react';
import { auth } from '../firebase';

const AuthContext = createContext();

const useAuthContext = () => {
    return useContext(AuthContext)
}

const AuthContextProvider = (props) => {
    const register = (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    const values = {
        register
    }

    return (
        <AuthContext.Provider value={values}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthContext, useAuthContext, AuthContextProvider as default }