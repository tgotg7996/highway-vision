import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import AlgorithmLibrary from './pages/AlgorithmLibrary';
import AlgorithmBuilder from './pages/AlgorithmBuilder';
import ReportCenter from './pages/ReportCenter';
import VideoMonitor from './pages/VideoMonitor';
import MainControl from './pages/MainControl';

// Component to handle layout conditions
const AppRoutes = () => {
    const location = useLocation();
    
    // The MainControl page acts as a standalone entrance page with its own specific layout structure
    // stored within the page component itself, whereas others share the sidebar layout.
    const isStandalone = location.pathname === '/';

    if (isStandalone) {
        return (
            <Routes>
                <Route path="/" element={<MainControl />} />
            </Routes>
        );
    }

    return (
        <Layout>
            <Routes>
                <Route path="/algorithms" element={<AlgorithmLibrary />} />
                <Route path="/builder" element={<AlgorithmBuilder />} />
                <Route path="/reports" element={<ReportCenter />} />
                <Route path="/monitor" element={<VideoMonitor />} />
            </Routes>
        </Layout>
    );
};

const App: React.FC = () => {
  return (
    <Router>
        <AppRoutes />
    </Router>
  );
};

export default App;