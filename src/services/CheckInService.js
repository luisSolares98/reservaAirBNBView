import axios from "axios"
export class CheckInService {
    constructor(endpoint) {
        this.endpoint = endpoint;
        if (!endpoint) {
            endpoint = 'localhost:8989/airNUR/';
        }
    }
    crear = (dateTimeCheckIn, typeCheckIn, reserveId) => {
        console.log('endpoint: ', this.endpoint + '/checkIn/');

        return new Promise((resolve, reject) => {
            axios.post(this.endpoint + '/checkIn/', {
                dateTimeCheckIn,
                typeCheckIn,
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
            axios.get(this.endpoint + `/checkIn/${UUID}`,{
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
    