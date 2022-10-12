import React,{ useEffect, useState } from 'react';
import { getEstanciasDB,finalizarEstanciaDB,addEstaciaDB } from '../api/apiEstancias';
import { getCarsDB} from '../api/apiVeiculos';
import Navegacion from '../components/navegacion';
import { 
    Button,
    Modal,
    InputGroup,
    Form,
    Table
} from 'react-bootstrap';
const Estancias = () =>{
    const [idVeiculo, setIdVeiculo ] = useState('');
    const [estancias, setEstancias] = useState([]);
    const [search, setSearch] = useState([]);
    const [ cars, setCars ] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
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
    const aldaEstancia = () => {
        setShow(true);
    }
    //Hacemos la peticion a las apis al cargar la pagina
    useEffect(() => {
        getEstancias(setEstancias);
        getCar('http://localhost:3000/veiculosActivos', setCars)
    },[]);
    const getCar = async (url, setState) => {
        const result = await getCarsDB(url);
        setState(result);
     }
    const getEstancias = async (setState) => {
        const result = await getEstanciasDB();
        setState(result);
    }
    const finalizar = async (id) => {
        const result = await finalizarEstanciaDB(id);
        if(result.status === 204) {
            getEstancias(setEstancias);
            alert("Finalizar estancia");
        }
    }
    //Para tomar el valor de los inputs
    const handleIdVeiculo = e => {
        setIdVeiculo(e.target.value)
    };
    const altaEstancia = async () =>{
        const data = { id_veiculo:idVeiculo };
        const result = await addEstaciaDB(data);
        if(result.status === 200) {
            getEstancias(setEstancias);
            setShow(false);
        } else {
            alert("Hubo un problema en el servidor xd.");
        }
    }
    return(<>
        <Navegacion />
        <div className='container'>
            <br />
            <Button variant="primary"  onClick={() => aldaEstancia()} >
               Alta Estncia
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Alta Estancia</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Select aria-label="Default select example"  onChange={handleIdVeiculo} >
                        <option>Typo de vehiculo</option>
                        {cars.map(type => {
                            return (
                                <option 
                                    value={type.id_veiculo} 
                                    key={type.id_veiculo}
                                >
                                    {type.placa}
                                </option>
                            )
                        })}
                    </Form.Select>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={() => altaEstancia()}>
                        Agregar
                    </Button>
                </Modal.Footer>
            </Modal>    
            <br /><br />
            <br />
            <InputGroup className="mb-3">
                 <Form.Control
                    type="search"
                    value={search}
                    onChange={handleSearch}
                />
            </InputGroup>
        {
            estancias.length !== 0 ? 
            <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th scope="col">Nu.</th>
                                <th scope="col">Inicio</th>
                                <th scope="col">Fin</th>
                                <th scope="col">Veiculo</th>
                                <th scope="col">Tipo</th>
                                <th scope="col">Costo</th>
                                <th scope="col">Finalizar</th>
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
                                            <td>{estancia.coste_estancia}</td>
                                            <td>
                                                <Button variant="danger" onClick={
                                                    () => finalizar(estancia.id_estancia)
                                                }>
                                                    Finalizar Estancia
                                                </Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                )
                            })
                        }
                            
            </Table>
            :
            <p>No hay datos</p>
        }
        </div>
    </>
    );
}
export default Estancias;