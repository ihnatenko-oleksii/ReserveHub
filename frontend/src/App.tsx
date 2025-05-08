import './App.css'
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage.tsx';
import LoginPage from './components/LoginPage.tsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App
