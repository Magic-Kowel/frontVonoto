import { useEffect, useState } from 'react';
import { getCarsDB,getTypesCarsDB, deleteCarDB, addDB, updateDB } from '../api/apiVeiculos';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import Navegacion from '../components/navegacion';
const Veiculos = () => {
    const [ placas, setPlacas ] = useState('');
    const [ type, setType ] = useState('');
    const [ cars, setCars ] = useState([]);
    const [ typeCar, setTypeCar ] = useState([]);
    const [ typeModal, setTypeModal ] = useState({ title:'', textButon:'', action:'' });
    const [show, setShow] = useState(false);
    const [ idCar, setIdCar ] = useState(0);
    //habrir y cerrar el modal
    const handleClose = () => setShow(false);
    const add = () => {
        setShow(true);
        setTypeModal({ title:'Agregar', textButon:'agregar', action:'add' });
        clearInputs();
    }
    //Hacemos la peticion a las apis al cargar la pagina
    useEffect(() => {
        getCar(setCars);
        getTypeCar(setTypeCar);
    },[]);
    const getCar = async (setState) => {
       const result = await getCarsDB();
       setState(result);
    }
    const getTypeCar = async (setState) => {
        const result = await getTypesCarsDB();
        setState(result);
     }
    const deleteCar = async (idCar) => {
       const result = await deleteCarDB(idCar);
       if(result.status === 204) {
        getCar(setCars);
            alert("The car was deleted");
        } else {
            alert("Error");
        }
    }
    //Para tomar el valor de los inputs
    const handlePlacas = e => setPlacas(e.target.value);
    const handleTypeCar = e => {
        setType(e.target.value)
    };
    const action = async (typeAction) => {
        const data = { placa:placas, id_tipo_veiculo:type };
        if(typeAction === "add") {
            const result = await addDB(data);
            if(result.status === 200) {
                getCar(setCars);
                clearInputs();
                setShow(false);
            } else {
                alert("Hubo un problema en el servidor xd.");
            }
        } else {
            const result = await updateDB(data, idCar);
            if(result.status === 204) {
                getCar(setCars);
                setShow(false);
            } else {
                alert("Hubo un error en el servidor")
            }
        }
    }
    const clearInputs = () => {
        setPlacas('');
        setType('Typo de vehiculo');
    }
    const edit = (id_veiculo, id_tipo_veiculo, placa) => {
        setType(id_tipo_veiculo);
        setPlacas(placa);
        setIdCar(id_veiculo)
        setShow(true);
        setTypeModal({ title:'Editar', textButon:'Editar', action:'update' });
    }
    return (
        <>
            <Navegacion />
            <div className='container'>
                <br />
                <Button variant="primary" onClick={() => add()}>
                Agregar
                </Button>
                <br /><br />
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{typeModal.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Control type="text" maxLength="7" placeholder="Placa"  onChange={handlePlacas}  value={placas} />
                        <hr />
                        <Form.Select aria-label="Default select example" onChange={handleTypeCar} value={type}>
                            <option>Typo de vehiculo</option>
                            {typeCar.map(type => {
                                return (
                                    <option 
                                        value={type.id_tipo_veiculo} 
                                        key={type.id_tipo_veiculo}
                                    >
                                        {type.tipo}
                                    </option>
                                )
                            })}
                        </Form.Select>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancelar
                        </Button>
                        <Button variant="primary" onClick={() => action(typeModal.action)}>
                            {typeModal.textButon}
                        </Button>
                    </Modal.Footer>
                </Modal>              
                {
                    cars.length !== 0 ? 
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th scope="col">Nu.</th>
                                    <th scope="col">Placas</th>
                                    <th scope="col">Typo de vehiculo</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                                </thead>
                                {cars.map((car,index) => {
                                    return (
                                        <tbody key={index}>
                                            <tr>
                                                <th scope="row">{index + 1}</th>
                                                <td>{car.placa}</td>
                                                <td>{car.tipo}</td>
                                                <td>
                                                    <Button 
                                                        variant="warning" 
                                                        onClick={() => {
                                                            edit(car.id_veiculo, car.id_tipo_veiculo, car.placa)
                                                        }}
                                                    >
                                                        Editar
                                                    </Button>
                                                    <Button variant="danger" onClick={() => deleteCar(car.id_veiculo)}>
                                                        Eliminar
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
export default Veiculos;