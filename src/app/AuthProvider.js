'use client'
import { createContext, useState, useContext } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import "core-js/stable/atob";

const AuthContext = createContext({
    user: null,
    login: () => {},
    logout: () => {},
  });

export function AuthProvider({children}) {


    const [user, setUser] = useState(() => {
        const email = Cookies.get('userEmail');
        const name = Cookies.get('firstName');
        return email && name ? { email, name } : null;
    });

    function login(data) {

        console.log(data);

        const { token, email, name } = data;

        // Save token and user details in cookies
        Cookies.set('authToken', token, { expires: 7 }); // Expires in 7 days
        Cookies.set('userEmail', email, { expires: 7 });
        Cookies.set('firstName', name, { expires: 7 });

        console.log('Login successful:', token, email, name);
    
        // Update the user state
        setUser({ email,name });
    }


    function logout() {
        Cookies.remove('authToken');
        Cookies.remove('userEmail');
        Cookies.remove('firstName');
        setUser(null);
        console.log('User logged out.');
    
    }

    return(
        <AuthContext.Provider value={{ user, login, logout }}>
        {children}
      </AuthContext.Provider>
    )
}


export function useAuth() {
    return useContext(AuthContext);
}