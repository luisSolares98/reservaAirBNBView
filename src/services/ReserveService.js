import axios from "axios"
export class ReserveService {
    constructor(endpoint) {
        this.endpoint = endpoint;
        if (!endpoint) {
            endpoint = 'localhost:8989/airNUR/';
        }
    }
    crearReserva = (dateIn, state, dateOut) => {
        console.log('endpoint: ', this.endpoint + '/reserve/');

        return new Promise((resolve, reject) => {
            axios.post(this.endpoint + '/reserve/', {
                dateIn,
                state,
                dateOut
            },{
                headers: {
                    'Accept': '*/*'
                }
            }).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                console.log('error: ' + error);
                reject(error);
            });
        });
    }
    obtenerReserva = (UUID) => {
        return new Promise((resolve, reject) => {
            axios.get(this.endpoint + `/reserve/${UUID}`,{
                headers: {
                    'Accept': '*/*'
                }
            }).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                console.log('error: ' + error);
                reject(error);
            });
        });
    }
}
    