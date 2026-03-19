import { useState, useEffect } from 'react';
import API from '../servicios/api';
import './PedidoList.css';

function PedidoList() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchPedidos();
  }, []);

  const fetchPedidos = async () => {
    try {
      setLoading(true);
      const response = await API.get('/pedidos');
      setPedidos(response.data);
    } catch (err) {
      setError('Error al cargar los pedidos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este pedido?')) {
      try {
        await API.delete(`/pedidos/${id}`);
        setPedidos(pedidos.filter(p => p._id !== id));
      } catch (err) {
        alert('Error al eliminar el pedido');
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(amount);
  };

  const filteredPedidos = pedidos.filter(pedido =>
    pedido.nombre.toLowerCase().includes(filter.toLowerCase()) ||
    pedido.telefono.includes(filter)
  );

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Cargando pedidos...</p>
      </div>
    );
  }

  return (
    <div className="pedido-list-container">
      <div className="list-header">
        <h1>📋 Lista de Pedidos</h1>
        <div className="search-box">
          <input
            type="text"
            placeholder="Buscar por nombre o teléfono..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {filteredPedidos.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <h3>No hay pedidos</h3>
          <p>Comienza creando un nuevo pedido</p>
        </div>
      ) : (
        <div className="pedidos-grid">
          {filteredPedidos.map((pedido) => (
            <div key={pedido._id} className="pedido-card">
              <div className="pedido-header">
                <h3>{pedido.nombre}</h3>
                <button 
                  onClick={() => handleDelete(pedido._id)}
                  className="delete-btn"
                  title="Eliminar pedido"
                >
                  ×
                </button>
              </div>
              
              <div className="pedido-body">
                <p><strong>📱 Teléfono:</strong> {pedido.telefono}</p>
                <p><strong>📍 Dirección:</strong> {pedido.direccion}</p>
                <p><strong>📅 Solicitud:</strong> {formatDate(pedido.fecha_solicitud)}</p>
                <p><strong>🚚 Envío:</strong> {formatDate(pedido.fecha_envio)}</p>
                <p><strong>💰 Total:</strong> {formatCurrency(pedido.total)}</p>
                <p><strong>💳 Pago:</strong> {pedido.pagado.join(', ')}</p>
                {pedido.comentario && (
                  <p><strong>📝 Comentario:</strong> {pedido.comentario}</p>
                )}
              </div>
              
              <div className="pedido-footer">
                <span className="pedido-id">ID: {pedido._id.slice(-6)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PedidoList;