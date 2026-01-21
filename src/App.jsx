import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthStore } from './store/authStore';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Notes from './pages/Notes';
import TaskCalendar from './pages/TaskCalendar';
import Projects from './pages/Projects';
import Clients from './pages/Clients';
import Chat from './pages/Chat';
import Payments from './pages/Payments';
import Automations from './pages/Automations';
import UserManagement from './pages/UserManagement';
import Workflows from './pages/Workflows';
import Store from './pages/Store';
import Company from './pages/Company';
import Employee from './pages/Employee';
import Apps from './pages/Apps';
import PrivateRoute from './components/auth/PrivateRoute';
import AppLayout from './components/layouts/AppLayout';

function App() {
  const initializeAuth = useAuthStore((state) => state.initialize);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground font-sans">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route element={<PrivateRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/calendar" element={<TaskCalendar />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/notes" element={<Notes />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/automations" element={<Automations />} />
              <Route path="/users" element={<UserManagement />} />
              <Route path="/workflows" element={<Workflows />} />
              <Route path="/store" element={<Store />} />
              <Route path="/company" element={<Company />} />
              <Route path="/employee" element={<Employee />} />
              <Route path="/apps" element={<Apps />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
