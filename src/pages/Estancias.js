import { useEffect, useState } from 'react';
import { getEstanciasDB } from '../api/apiEstancias';
import { Button, Modal,InputGroup , Form, Table } from 'react-bootstrap';

const Estancias = () =>{
    const [estancias, setEstancias] = useState([]);
    const [search, setSearch] = useState([]);
    const handleSearch = (e)=>{
        setSearch(e.target.value);
        filtrar(e.target.value);
    }
    const filtrar=(terminoBusqueda)=>{
        let resultadosBusqueda=estancias.filter((elemento)=>{
          if(elemento.placa.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())){
            return elemento;
          }
        });
        setEstancias(resultadosBusqueda);
      }
    //Hacemos la peticion a las apis al cargar la pagina
    useEffect(() => {
        getEstancias(setEstancias);
    },[]);
    const getEstancias = async (setState) => {
        const result = await getEstanciasDB();
        setState(result);
    }
    return(
        <div className='container'>
            <br />
            <InputGroup className="mb-3">
                 <Form.Control
                    type="search"
                    value={search}
                    onChange={handleSearch}
                />
            </InputGroup>

            <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th scope="col">Nu.</th>
                                <th scope="col">Inicio</th>
                                <th scope="col">Fin</th>
                                <th scope="col">Veiculo</th>
                                <th scope="col">Tipo</th>
                            </tr>
                        </thead>
                        {estancias.map((estancia,index) => {
                                return (
                                    <tbody key={index}>
                                        <tr>
                                            <th scope="row">{index + 1}</th>
                                            <td>{estancia.tiempo_inicio}</td>
                                            <td>{estancia.tiempo_fin}</td>
                                            <td>{estancia.placa}</td>
                                            <td>{estancia.tipo}</td>
                                        </tr>
                                    </tbody>
                                )
                            })
                        }
                            
            </Table>
        </div>
    );
}
export default Estancias;