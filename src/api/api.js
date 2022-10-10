export function getCarsDB(url) {
    return fetch(url, {
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
    return fetch('http://localhost:3000/veiculos/'+idCar, {
        method:"DELETE",
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res => {
       return res;
    })
}
export function addDB(data) {
    return fetch('http://localhost:3000/veiculos',{
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
    return fetch('http://localhost:3000/veiculos/'+idCar,{
        method:'PUT',
        body:JSON.stringify(data),
        headers: {
            "Content-Type":"application/json"
        }
    }).then(res => {
        return res;
    })
}