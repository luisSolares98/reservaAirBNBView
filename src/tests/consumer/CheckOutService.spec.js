import { PactV3, MatchersV3 } from '@pact-foundation/pact';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { CheckOutService } from '../../services/CheckOutService.js';
import { crearCheckOut, crearCheckOutResponse, UUIDCheckOutResponse } from '../PactResponseCheckOut.js';
describe('El API de CheckOut', () => {

    let service;
    const provider = new PactV3({
        consumer: 'react-client',
        provider: 'checkOut-service'
    });

    describe('crear CheckOut', () => {
        it('retorna una CheckOut ya creada', () => {
            //Arrange
            provider.given('crear CheckOut')
                .uponReceiving('para crear una CheckOut')
                .withRequest({
                    method: 'POST',
                    path: '/checkOut/',
                    headers: {
                        'Accept': '*/*'
                    },
                    body: crearCheckOut
                }).willRespondWith({
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: crearCheckOutResponse
                });
            return provider.executeTest(async mockServer => {
                // Act
                service = new CheckOutService(mockServer.url);
                return service.crear(crearCheckOut.dateTimeCheckOut, crearCheckOut.typeCheckOut, crearCheckOut.reserveId).then((response) => {
                    //Assert
                    expect(response).to.be.not.null;
                    expect(response).to.be.a.string;
                    expect(response).to.deep.equal(crearCheckOutResponse);                 
                });
            });

        });
    });
    describe('obtener CheckOut', () => {
        it('retorna un CheckOut', () => {
            //Arrange
            provider.given('realiza una busqueda')
                .uponReceiving('identificador')
                .withRequest({
                    method: 'GET',
                    path: `/checkOut/${UUIDCheckOutResponse}`,
                    headers: {
                        'Accept': '*/*'
                    },
                }).willRespondWith({
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: crearCheckOutResponse
                });
            return provider.executeTest(async mockServer => {
                // Act
                service = new CheckOutService(mockServer.url);
                return service.obtener(UUIDCheckOutResponse).then((response) => {
                    // Assert
                    expect(response).to.be.not.null;
                    expect(response).to.be.a.string;
                    console.log(response);
                    console.log(crearCheckOutResponse);
                    expect(response).to.deep.equal(crearCheckOutResponse);                 
                });
            });
        });
    });
});