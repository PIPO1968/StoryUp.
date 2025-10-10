import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Stories from './pages/Stories';
import CreateStory from './pages/CreateStory';
import News from './pages/News';
import Statistics from './pages/Statistics';
import ContestsTrophies from './pages/ContestsTrophies';

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={
                    <>
                        <Sidebar />
                        <main style={{ marginLeft: 220, marginTop: 70 }}>
                            <Profile />
                        </main>
                    </>
                } />
                <Route
                    path="*"
                    element={
                        <>
                            <Sidebar />
                            <main style={{ marginLeft: 220, marginTop: 70 }}>
                                <Routes>
                                    <Route path="/stories" element={<Stories />} />
                                    <Route path="/create-story" element={<CreateStory />} />
                                    <Route path="/news" element={<News />} />
                                    <Route path="/statistics" element={<Statistics />} />
                                    <Route path="/contests-trophies" element={<ContestsTrophies />} />
                                </Routes>
                            </main>
                        </>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
