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
import MyFavorites from './pages/MyFavorites';
import EditService from './pages/EditService';
import ProfileEdit from './pages/ProfileEdit';
import MyObligations from "./pages/MyObligations.tsx";
import NotificationsPage from "./pages/NotificationsPage.tsx";
import MyInvoices from "./pages/MyInvoices.tsx";


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
          <Route path="favorites" element={<MyFavorites />} />
          <Route path="create-service" element={<CreateService />} />
          <Route path="my-services" element={<MyServices />} />
          <Route path="my-reservations" element={<MyReservations />} />
          <Route path="services/:id/edit" element={<EditService />} />
          <Route path="profile" element={<ProfileEdit />} />
          <Route path="my-obligations" element={<MyObligations />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="invoices" element={<MyInvoices />} />


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
