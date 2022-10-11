const urlBase = "http://localhost:3000/";
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