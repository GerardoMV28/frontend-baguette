import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PedidoForm from './componentes/PedidoForm';
import Login from './componentes/Login';
import Register from './componentes/Register';
import PedidoList from './componentes/PedidoList';
import Navbar from './componentes/Navbar';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Recuperar usuario del localStorage al cargar
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar user={user} onLogout={() => setUser(null)} />
        
        <div className="main-content">
          <Routes>
            <Route path="/" element={
              user ? <PedidoForm /> : <Navigate to="/login" />
            } />
            <Route path="/login" element={
              <Login onLogin={(userData) => setUser(userData)} />
            } />
            <Route path="/register" element={
              <Register onRegister={(userData) => setUser(userData)} />
            } />
            <Route path="/pedidos" element={
              user ? <PedidoList /> : <Navigate to="/login" />
            } />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;