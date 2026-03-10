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

    // Dynamic list of all users, persisted to localStorage
    const [users, setUsers] = useState(() => {
        const savedUsers = localStorage.getItem('app_users_db');
        if (savedUsers) {
            return JSON.parse(savedUsers);
        }
        // Default accounts if no DB exists yet
        const defaultUsers = [
            { id: '1', name: 'Admin User', username: 'admin', role: 'admin', password: 'password123', status: 'Active', progress: '-' },
            { id: '2', name: 'Demo Student', username: 'student', role: 'student', password: 'password123', status: 'Active', progress: '0%' }
        ];
        localStorage.setItem('app_users_db', JSON.stringify(defaultUsers));
        return defaultUsers;
    });

    // Save users DB whenever it changes
    useEffect(() => {
        localStorage.setItem('app_users_db', JSON.stringify(users));
    }, [users]);

    const login = (username, password) => {
        const account = users.find(u => u.username.toLowerCase() === username.toLowerCase());

        if (account && account.password === password) {
            if (account.status === 'Inactive') {
                return { success: false, message: 'This account has been deactivated.' };
            }
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

    // --- Admin DB Functions ---
    const addStudent = (studentData) => {
        if (users.some(u => u.username.toLowerCase() === studentData.username.toLowerCase())) {
            return { success: false, message: 'Username already exists.' };
        }

        const newStudent = {
            id: Date.now().toString(),
            role: 'student',
            status: 'Active',
            progress: '0%',
            ...studentData
        };

        setUsers(prev => [...prev, newStudent]);
        return { success: true };
    };

    const updateStudent = (id, updates) => {
        setUsers(prev => prev.map(u => u.id === id ? { ...u, ...updates } : u));
    };

    const deleteStudent = (id) => {
        setUsers(prev => prev.filter(u => u.id !== id));
    };

    const value = {
        user,
        users, // Export the full list for the Settings page
        login,
        logout,
        addStudent,
        updateStudent,
        deleteStudent,
        isAdmin: user?.role === 'admin',
        isStudent: user?.role === 'student'
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
