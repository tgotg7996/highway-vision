import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import AlgorithmLibrary from './pages/AlgorithmLibrary';
import AlgorithmBuilder from './pages/AlgorithmBuilder';
import ReportCenter from './pages/ReportCenter';
import VideoMonitor from './pages/VideoMonitor';
import MainControl from './pages/MainControl';
import DeviceManagement from './pages/DeviceManagement';
import DataAnalysis from './pages/DataAnalysis';
import Settings from './pages/Settings';
import UserPermissions from './pages/UserPermissions';
import AuthPage from './pages/AuthPage';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-white">加载中...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// Component to handle layout conditions
const AppRoutes = () => {
    const location = useLocation();

    // The MainControl page acts as a standalone entrance page with its own specific layout structure
    // stored within the page component itself, whereas others share the sidebar layout.
    const isStandalone = location.pathname === '/';

    if (isStandalone) {
        return (
            <Routes>
                <Route path="/" element={
                    <ProtectedRoute>
                        <MainControl />
                    </ProtectedRoute>
                } />
            </Routes>
        );
    }

    return (
        <Layout>
            <Routes>
                <Route path="/algorithms" element={
                    <ProtectedRoute>
                        <AlgorithmLibrary />
                    </ProtectedRoute>
                } />
                <Route path="/builder" element={
                    <ProtectedRoute>
                        <AlgorithmBuilder />
                    </ProtectedRoute>
                } />
                <Route path="/reports" element={
                    <ProtectedRoute>
                        <ReportCenter />
                    </ProtectedRoute>
                } />
                <Route path="/monitor" element={
                    <ProtectedRoute>
                        <VideoMonitor />
                    </ProtectedRoute>
                } />
                <Route path="/devices" element={
                    <ProtectedRoute>
                        <DeviceManagement />
                    </ProtectedRoute>
                } />
                <Route path="/analysis" element={
                    <ProtectedRoute>
                        <DataAnalysis />
                    </ProtectedRoute>
                } />
                <Route path="/settings" element={
                    <ProtectedRoute>
                        <Settings />
                    </ProtectedRoute>
                } />
                <Route path="/permissions" element={
                    <ProtectedRoute>
                        <UserPermissions />
                    </ProtectedRoute>
                } />
            </Routes>
        </Layout>
    );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<AuthPage />} />
          <Route path="*" element={<AppRoutes />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;