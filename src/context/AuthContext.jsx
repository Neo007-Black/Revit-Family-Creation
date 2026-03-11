import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();
const LOGIN_LOG_KEY = 'app_login_log';
const LAST_ACTIVITY_KEY = 'app_user_last_activity';
const ACTIVE_THRESHOLD_MS = 5 * 60 * 1000; // 5 minutes

const loadLoginLog = () => {
    try {
        const saved = localStorage.getItem(LOGIN_LOG_KEY);
        return saved ? JSON.parse(saved) : [];
    } catch {
        return [];
    }
};

const saveLoginLog = (log) => {
    localStorage.setItem(LOGIN_LOG_KEY, JSON.stringify(log.slice(-200))); // keep last 200 entries
};

const loadLastActivity = () => {
    try {
        const saved = localStorage.getItem(LAST_ACTIVITY_KEY);
        return saved ? JSON.parse(saved) : {};
    } catch {
        return {};
    }
};

const updateLastActivityStorage = (username, timestamp = Date.now()) => {
    const map = loadLastActivity();
    map[username] = timestamp;
    localStorage.setItem(LAST_ACTIVITY_KEY, JSON.stringify(map));
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    // Check local storage for an existing session on load
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('auth_user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [loginLog, setLoginLog] = useState(loadLoginLog);

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

            // Record login and activity
            const now = Date.now();
            updateLastActivityStorage(account.username, now);
            const entry = {
                id: `${account.username}-${now}`,
                username: account.username,
                name: account.name || account.username,
                role: account.role,
                loginTime: now
            };
            const newLog = [entry, ...loadLoginLog()];
            saveLoginLog(newLog);
            setLoginLog(newLog);

            return { success: true };
        } else {
            return { success: false, message: 'Invalid username or password' };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('auth_user');
    };

    // Heartbeat: update last activity for current user while logged in
    useEffect(() => {
        if (!user?.username) return;
        const interval = setInterval(() => {
            updateLastActivityStorage(user.username);
        }, 30 * 1000);
        return () => clearInterval(interval);
    }, [user?.username]);

    const getLoginLog = () => loginLog;
    const getLastActivity = () => loadLastActivity();
    const isUserActive = (username) => {
        const map = loadLastActivity();
        const last = map[username];
        if (!last) return false;
        return Date.now() - last < ACTIVE_THRESHOLD_MS;
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

    const updatePassword = (username, newPassword) => {
        setUsers(prev => prev.map(u => u.username === username ? { ...u, password: newPassword } : u));
        return { success: true };
    };

    const value = {
        user,
        users,
        loginLog,
        getLoginLog,
        getLastActivity,
        isUserActive,
        login,
        logout,
        addStudent,
        updateStudent,
        deleteStudent,
        updatePassword,
        isAdmin: user?.role === 'admin',
        isStudent: user?.role === 'student'
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
