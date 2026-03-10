import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { TopTabs } from './components/TopTabs';
import { Lesson } from './pages/Lesson';
import { courseData } from './data/courseData';

import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Login } from './pages/Login';
import { Settings } from './pages/Settings';

function App() {

    // The first lesson will be the default page.
    const firstLessonId = courseData[0].id;

    return (
        <AuthProvider>
            <div className="app-container">
                <Navbar />

                <Routes>
                    <Route path="/login" element={<Login />} />

                    {/* Protected Routes - require any logged in user */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="/" element={
                            <>
                                <TopTabs />
                                <main className="main-content" style={{ maxWidth: 'none', padding: '0' }}>
                                    <Navigate to={`/lesson/${firstLessonId}`} replace />
                                </main>
                            </>
                        } />
                        <Route path="/lesson/:id" element={
                            <>
                                <TopTabs />
                                <main className="main-content" style={{ maxWidth: 'none', padding: '0' }}>
                                    <Lesson />
                                </main>
                            </>
                        } />
                    </Route>

                    {/* Admin Only Routes */}
                    <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                        <Route path="/settings" element={<Settings />} />
                    </Route>
                </Routes>
            </div>
        </AuthProvider>
    );
}

export default App;
