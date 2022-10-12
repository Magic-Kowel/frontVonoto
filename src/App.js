import {Route, Routes } from 'react-router-dom';
import Veiculos from './pages/Veiculos';
import Estancias from './pages/Estancias';
import Pdf from './pages/Pdf';
function App() {
  return (
    <Routes>
      <Route path='/Veiculos' element={<Veiculos />} />
      <Route path='/Estancias' element={<Estancias />} />
      <Route path='/Reporte' element={<Pdf />} />
    </Routes>
  );
}

export default App;
