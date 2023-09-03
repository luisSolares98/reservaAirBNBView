import axios from "axios"
export class CheckOutService {
    constructor(endpoint) {
        this.endpoint = endpoint;
        if (!endpoint) {
            endpoint = 'localhost:8989/airNUR/';
        }
    }
    crear = (dateTimeCheckOut, typeCheckOut, reserveId) => {
        console.log('endpoint: ', this.endpoint + '/checkOut/');

        return new Promise((resolve, reject) => {
            axios.post(this.endpoint + '/checkOut/', {
                dateTimeCheckOut,
                typeCheckOut,
                reserveId
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
    obtener = (UUID) => {
        return new Promise((resolve, reject) => {
            axios.get(this.endpoint + `/checkOut/${UUID}`,{
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
    