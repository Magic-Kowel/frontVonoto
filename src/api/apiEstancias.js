const urlBase = "http://localhost:4000/";
export function getEstanciasDB() {
    return fetch(`${urlBase}estancias`, {
        method:'GET',
        headers: {
            "Content-Type":"application/json"
        }
    }).then(res => {
        return res.json();
    }).then(res => {
        return res;
    }).catch(error => {
        console.log(error);
    });
}
export function getEstanciasReporteDB() {
    return fetch(`${urlBase}estancias/reporte`, {
        method:'GET',
        headers: {
            "Content-Type":"application/json"
        }
    }).then(res => {
        return res.json();
    }).then(res => {
        return res;
    }).catch(error => {
        console.log(error);
    });
}
export function finalizarEstanciaDB(id) {
    return fetch(`${urlBase}estancias/${id}`, {
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res => {
       return res;
    })
}
export function addEstaciaDB(data) {
    return fetch(`${urlBase}estancias`,{
        method:'POST',
        body:JSON.stringify(data),
        headers: {
            "Content-Type":"application/json"
        }
    }).then(res => {
        return(res);
    })
}