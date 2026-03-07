import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { TopTabs } from './components/TopTabs';
import { Lesson } from './pages/Lesson';
import { courseData } from './data/courseData';

function App() {

    // The first lesson will be the default page.
    const firstLessonId = courseData[0].id;

    return (
        <div className="app-container">
            <Navbar />
            <TopTabs />

            <main className="main-content" style={{ maxWidth: 'none', padding: '0' }}>
                <Routes>
                    <Route path="/" element={<Navigate to={`/lesson/${firstLessonId}`} replace />} />
                    <Route path="/lesson/:id" element={<Lesson />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
