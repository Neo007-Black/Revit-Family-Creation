import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    // Check local storage for an existing session on load
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('auth_user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    // Mock accounts for testing
    const validAccounts = {
        'admin': { username: 'admin', role: 'admin', password: 'password123' },
        'student': { username: 'student', role: 'student', password: 'password123' }
    };

    const login = (username, password) => {
        const account = validAccounts[username.toLowerCase()];

        if (account && account.password === password) {
            const userData = { username: account.username, role: account.role };
            setUser(userData);
            localStorage.setItem('auth_user', JSON.stringify(userData));
            return { success: true };
        } else {
            return { success: false, message: 'Invalid username or password' };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('auth_user');
    };

    const value = {
        user,
        login,
        logout,
        isAdmin: user?.role === 'admin',
        isStudent: user?.role === 'student'
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
