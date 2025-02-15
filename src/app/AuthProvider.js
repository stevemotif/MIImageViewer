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
        const role = Cookies.get('role');
        return email && name && role ? { email, name, role } : null;
    });

    function login(data) {

        console.log(data);

        const { token, email, name,role } = data;

        // Save token and user details in cookies
        Cookies.set('authToken', token, { expires: 7 }); // Expires in 7 days
        Cookies.set('userEmail', email, { expires: 7 });
        Cookies.set('firstName', name, { expires: 7 });
        Cookies.set('role', role, { expires: 7 });

        console.log('Login successful:', token, email, name, role);
    
        // Update the user state
        setUser({ email,name,role });
    }


    function logout() {
        Cookies.remove('authToken');
        Cookies.remove('userEmail');
        Cookies.remove('firstName');
        Cookies.remove('role');
        setUser(null);
        console.log('User logged out.');
        router.push('/account/login'); // Redirect explicitly
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