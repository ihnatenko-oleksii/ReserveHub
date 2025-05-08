import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import RegisterPage from './pages/RegisterPage.tsx';
import Dashboard from './pages/Dashboard.tsx';
import AdminPage from './pages/AdminPage.tsx';
import PrivateRoute from './routes/PrivateRoute';
import RoleRoute from './routes/RoleRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* 🌐 Публічні сторінки */}
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />

        {/* 🔐 Приватні сторінки */}
        <Route element={<PrivateRoute />}>
          <Route path="dashboard" element={<Dashboard />} />

          {/* 🛡️ Ролі: тільки ADMIN */}
          <Route element={<RoleRoute allowedRoles={['ADMIN']} />}>
            <Route path="admin" element={<AdminPage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
