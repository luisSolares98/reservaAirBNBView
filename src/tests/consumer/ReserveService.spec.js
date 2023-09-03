import { PactV3, MatchersV3 } from '@pact-foundation/pact';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { ReserveService } from '../../services/ReserveService.js';
import { crearReserva, crearReservaResponse, UUIDReservaResponse} from '../PactResponseReserva.js';
const { like } = MatchersV3;
describe('El API de Reserva', () => {

    let reserveService;
    const provider = new PactV3({
        consumer: 'react-client',
        provider: 'reserva-service'
    });

    describe('crear Reserva', () => {
        it('retorna una Reserva ya creada', () => {
            //Arrange
            provider.given('crear Reserva')
                .uponReceiving('para crear una Reserva')
                .withRequest({
                    method: 'POST',
                    path: '/reserve/',
                    headers: {
                        'Accept': '*/*'
                    },
                    body: crearReserva
                }).willRespondWith({
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: like(crearReservaResponse)
                });
            return provider.executeTest(async mockServer => {
                // Act
                reserveService = new ReserveService(mockServer.url);
                return reserveService.crearReserva(crearReserva.dateIn, crearReserva.state, crearReserva.dateOut).then((response) => {
                    //Assert
                    expect(response).to.be.not.null;
                    expect(response).to.be.a.string;
                    expect(response).to.deep.equal(crearReservaResponse);                 
                });
            });

        });
    });
    describe('obtener Reserva', () => {
        it('retorna una reserva', () => {
            //Arrange
            provider.given('realiza una busqueda de una reserva')
                .uponReceiving('identificador')
                .withRequest({
                    method: 'GET',
                    path: `/reserve/${UUIDReservaResponse}`,
                }).willRespondWith({
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: crearReservaResponse
                });
            return provider.executeTest(async mockServer => {
                // Act
                reserveService = new ReserveService(mockServer.url);
                return reserveService.obtenerReserva(UUIDReservaResponse).then((response) => {
                    // Assert
                    expect(response).to.be.not.null;
                    expect(response).to.be.a.string;
                    expect(response).to.deep.equal(crearReservaResponse);                 
                });
            });
        });
    });
});