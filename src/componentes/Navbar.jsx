import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    onLogout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🥖</span>
          Baguette Pedidos
        </Link>

        <div className="navbar-links">
          <Link to="/" className="nav-link">Nuevo Pedido</Link>
          <Link to="/pedidos" className="nav-link">Lista Pedidos</Link>
        </div>

        <div className="navbar-user">
          {user ? (
            <div className="user-info">
              <span className="user-name">👤 {user.nombre}</span>
              <button onClick={handleLogout} className="logout-btn">
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <div className="auth-links">
              <Link to="/login" className="login-btn">Iniciar Sesión</Link>
              <Link to="/register" className="register-btn">Registrarse</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;