const url = "http://localhost:4000/";
export function getCarsDB() {
    return fetch(`${url}veiculosActivos`, {
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
export function getTypesCarsDB() {
    return fetch(`${url}tipoveiculos`, {
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
export function deleteCarDB(idCar) {
    return fetch(`${url}veiculos/${idCar}`, {
        method:"DELETE",
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res => {
       return res;
    })
}
export function addDB(data) {
    return fetch(`${url}veiculos`,{
        method:'POST',
        body:JSON.stringify(data),
        headers: {
            "Content-Type":"application/json"
        }
    }).then(res => {
        return(res);
    })
}
export function updateDB(data, idCar) {
    return fetch(`${url}veiculos/${idCar}`,{
        method:'PUT',
        body:JSON.stringify(data),
        headers: {
            "Content-Type":"application/json"
        }
    }).then(res => {
        return res;
    })
}