import {Route, Routes } from 'react-router-dom';
import Veiculos from './pages/Veiculos';
import Estancias from './pages/Estancias';
function App() {
  return (
    <Routes>
      <Route path='/' element={<Veiculos />} />
      <Route path='/Estancias' element={<Estancias />} />
    </Routes>
  );
}

export default App;
