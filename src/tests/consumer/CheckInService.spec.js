import { PactV3, MatchersV3 } from '@pact-foundation/pact';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { CheckInService } from '../../services/CheckInService.js';
import { crearCheckIn, crearCheckInResponse, UUIDCheckInResponse } from '../PactResponseCheckIn.js';
describe('El API de CheckIn', () => {

    let service;
    const provider = new PactV3({
        consumer: 'react-client',
        provider: 'checkIn-service'
    });

    describe('crear CheckIn', () => {
        it('retorna una CheckIn ya creada', () => {
            //Arrange
            provider.given('crear CheckIn')
                .uponReceiving('para crear una CheckIn')
                .withRequest({
                    method: 'POST',
                    path: '/checkIn/',
                    headers: {
                        'Accept': '*/*'
                    },
                    body: crearCheckIn
                }).willRespondWith({
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: crearCheckInResponse
                });
            return provider.executeTest(async mockServer => {
                // Act
                service = new CheckInService(mockServer.url);
                return service.crear(crearCheckIn.dateTimeCheckIn, crearCheckIn.typeCheckIn, crearCheckIn.reserveId).then((response) => {
                    //Assert
                    expect(response).to.be.not.null;
                    expect(response).to.be.a.string;
                    expect(response).to.deep.equal(crearCheckInResponse);                 
                });
            });

        });
    });
    describe('obtener CheckIn', () => {
        it('retorna una CheckIn', () => {
            //Arrange
            provider.given('realiza una busqueda')
                .uponReceiving('identificador')
                .withRequest({
                    method: 'GET',
                    path: `/checkIn/${UUIDCheckInResponse}`,
                }).willRespondWith({
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: crearCheckInResponse
                });
            return provider.executeTest(async mockServer => {
                // Act
                service = new CheckInService(mockServer.url);
                return service.obtener(UUIDCheckInResponse).then((response) => {
                    // Assert
                    expect(response).to.be.not.null;
                    expect(response).to.be.a.string;
                    expect(response).to.deep.equal(crearCheckInResponse);                 
                });
            });
        });
    });
});