import { useState } from "react";
import API from "../servicios/api";
import "./PedidoForm.css";

function PedidoForm() {
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    fecha_solicitud: "",
    fecha_envio: "",
    total: "",
    pagado: [],
    comentario: "",
    direccion: "" // 👈 NUEVO CAMPO
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handlePagadoChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setForm({
        ...form,
        pagado: [...form.pagado, value]
      });
    } else {
      setForm({
        ...form,
        pagado: form.pagado.filter((metodo) => metodo !== value)
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await API.post("/pedidos", form);
      alert("✅ Pedido guardado correctamente");
      setForm({
        nombre: "",
        telefono: "",
        fecha_solicitud: "",
        fecha_envio: "",
        total: "",
        pagado: [],
        comentario: "",
        direccion: "" // 👈 RESETEAR EL CAMPO
      });
    } catch (error) {
      console.error("Error detallado:", error.response?.data || error.message);
      alert("❌ Error al guardar el pedido");
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="pedido-container">
      <div className="pedido-wrapper">
        
        {/* Header */}
        <div className="pedido-header">
          <div className="header-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h1>Registro de Pedidos</h1>
          <p>Completa el formulario para registrar un nuevo pedido</p>
        </div>

        {/* Formulario */}
        <div className="pedido-card">
          <div className="card-header"></div>
          
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              
              {/* Grid de 2 columnas */}
              <div className="form-grid">
                
                {/* Nombre */}
                <div className="form-group">
                  <label>
                    Nombre completo <span className="required">*</span>
                  </label>
                  <div className="input-wrapper">
                    <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <input
                      type="text"
                      name="nombre"
                      value={form.nombre}
                      onChange={handleChange}
                      required
                      placeholder="Ej: Juan Pérez"
                      className="form-input"
                    />
                  </div>
                </div>

                {/* Teléfono */}
                <div className="form-group">
                  <label>
                    Teléfono <span className="required">*</span>
                  </label>
                  <div className="input-wrapper">
                    <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <input
                      type="tel"
                      name="telefono"
                      value={form.telefono}
                      onChange={handleChange}
                      maxLength="10"
                      required
                      placeholder="Ej: 5512345678"
                      className="form-input"
                    />
                  </div>
                </div>

                {/* 👇 NUEVO CAMPO DE DIRECCIÓN */}
                <div className="form-group">
                  <label>
                    Dirección <span className="required">*</span>
                  </label>
                  <div className="input-wrapper">
                    <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <input
                      type="text"
                      name="direccion"
                      value={form.direccion}
                      onChange={handleChange}
                      required
                      placeholder="Calle, número, colonia, CP"
                      className="form-input"
                    />
                  </div>
                </div>

                {/* Fecha Solicitud */}
                <div className="form-group">
                  <label>
                    Fecha de solicitud <span className="required">*</span>
                  </label>
                  <div className="input-wrapper">
                    <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <input
                      type="date"
                      name="fecha_solicitud"
                      value={form.fecha_solicitud}
                      onChange={handleChange}
                      max={today}
                      required
                      className="form-input"
                    />
                  </div>
                </div>

                {/* Fecha Envío */}
                <div className="form-group">
                  <label>
                    Fecha de envío <span className="required">*</span>
                  </label>
                  <div className="input-wrapper">
                    <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <input
                      type="date"
                      name="fecha_envio"
                      value={form.fecha_envio}
                      onChange={handleChange}
                      min={form.fecha_solicitud || today}
                      required
                      className="form-input"
                    />
                  </div>
                </div>
              </div>

              {/* Métodos de Pago */}
              <div className="form-group">
                <label>Métodos de pago</label>
                <div className="payment-grid">
                  {[
                    { value: 'Efectivo', icon: '💰' },
                    { value: 'Transferencia', icon: '🏦' },
                    { value: 'Tarjeta', icon: '💳' },
                    { value: 'Depósito', icon: '📄' }
                  ].map((metodo) => (
                    <label
                      key={metodo.value}
                      className={`payment-option ${form.pagado.includes(metodo.value) ? 'selected' : ''}`}
                    >
                      <input
                        type="checkbox"
                        value={metodo.value}
                        checked={form.pagado.includes(metodo.value)}
                        onChange={handlePagadoChange}
                      />
                      <span className="payment-icon">{metodo.icon}</span>
                      <span className="payment-label">{metodo.value}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="form-group">
                <label>
                  Total del pedido <span className="required">*</span>
                </label>
                <div className="input-wrapper">
                  <span className="input-icon" style={{ fontSize: '1.1rem' }}>$</span>
                  <input
                    type="number"
                    name="total"
                    value={form.total}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    className="form-input"
                    style={{ paddingLeft: '2rem' }}
                  />
                </div>
              </div>

              {/* Comentario */}
              <div className="form-group">
                <label>Comentarios adicionales</label>
                <div className="input-wrapper">
                  <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                  <textarea
                    name="comentario"
                    value={form.comentario}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Notas, instrucciones especiales, etc."
                    className="form-textarea"
                  />
                </div>
              </div>

              {/* Botón */}
              <button
                type="submit"
                disabled={loading}
                className="btn-submit"
              >
                {loading ? (
                  <>
                    <svg className="spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Guardando pedido...
                  </>
                ) : (
                  <>
                    <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Guardar Pedido
                  </>
                )}
              </button>

              <p className="required-note">
                <span className="required">*</span> Campos obligatorios
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PedidoForm;