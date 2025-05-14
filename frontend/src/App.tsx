import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import RegisterPage from './pages/RegisterPage.tsx';
import Dashboard from './pages/Dashboard.tsx';
import CreateService from './pages/CreateService';
import MyServices from './pages/MyServices';
import MyReservations from './pages/MyReservations';
import ServiceList from './pages/ServiceList';
import AdminPage from './pages/AdminPage.tsx';
import PrivateRoute from './routes/PrivateRoute';
import RoleRoute from './routes/RoleRoute';
import ServiceDetails from './pages/ServiceDetails';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* 🌐 Публічні сторінки */}
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="services" element={<ServiceList />} />
        <Route path="services/:id" element={<ServiceDetails />} />

        {/* 🔐 Приватні сторінки */}
        <Route element={<PrivateRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="create-service" element={<CreateService />} />
          <Route path="my-services" element={<MyServices />} />
          <Route path="my-reservations" element={<MyReservations />} />

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
