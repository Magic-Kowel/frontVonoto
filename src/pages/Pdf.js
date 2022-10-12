
import React, { useRef,useEffect,useState } from "react";
import { Button ,Table} from "react-bootstrap";
import ReactToPrint from "react-to-print";
import { getEstanciasReporteDB } from './../api/apiEstancias';
import Navegacion from "../components/navegacion";
export default function Pdf() {
  const [estancias, setEstancias] = useState([]);
  let componentRef = useRef();
  useEffect(() => {
    getEstancias(setEstancias);
},[]);
const getEstancias = async (setState) => {
  const result = await getEstanciasReporteDB();
  setState(result);
}
  return (
    <>
      <Navegacion />
      <div className='container'>
            {/* button to trigger printing of target component */}
            <ReactToPrint
              trigger={() => <Button>Imprimir Reporte</Button>}
              content={() => componentRef}
            />

            {/* component to be printed */}
        
            <div ref={(el) => (componentRef = el)}>
              <h1 className="h1 text-center">Reporte</h1>
              <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th scope="col">Nu.</th>
                                <th scope="col">Placa</th>
                                <th scope="col">Minutos</th>
                                <th scope="col">Coste</th>
                            </tr>
                        </thead>
                        {estancias.map((estancia,index) => {
                                return (
                                    <tbody key={index}>
                                        <tr>
                                            <th scope="row">{index + 1}</th>
                                            <td>{estancia.placa}</td>
                                            <td>{estancia.minutos}</td>
                                            <td>{estancia.coste}</td>
                                        </tr>
                                    </tbody>
                                )
                            })
                        }
                            
              </Table>
      </div>
      </div>
    </>
  );
  }