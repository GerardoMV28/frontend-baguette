import { Toaster } from 'react-hot-toast';
import { Routes, Route } from 'react-router-dom';
import PedidoForm from './componentes/PedidoForm';
import './App.css';

function App() {  
  return (
    <div className="app">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      
      <Routes>
        <Route path="/" element={<PedidoForm />} />
        {/* Puedes agregar más rutas después si quieres */}
      </Routes>
    </div>
  );
}

export default App;