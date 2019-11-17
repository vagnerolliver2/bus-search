import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

import { AppService } from './app.service';
import itineraryParser from './parser/itinerary';
import { MICROBUS_LIST, BUS_LIST, ITINERARY } from '../test-helpers/mock/api-datapoa';

describe('AppService', () => {

  let service: AppService;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  beforeEach(() => {
    service = TestBed.get(AppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be asserts on subject \'microBusLines\' when called method \'fetchMicroBusLines\'', () => {
    spyOn(service.http, 'get').and.returnValue(of(MICROBUS_LIST));

    const EXPECTED_FIRST_ELEMENT = MICROBUS_LIST[0];

    service.microBusLines.subscribe(payload => {
      expect(payload[0].id).toEqual(EXPECTED_FIRST_ELEMENT.id);
      expect(payload[0].codigo).toEqual(EXPECTED_FIRST_ELEMENT.codigo);
      expect(payload[0].nome).toEqual(EXPECTED_FIRST_ELEMENT.nome);

      expect(payload.length).toEqual(MICROBUS_LIST.length);
    });

    service.fetchMicroBusLines();
  });

  it('should be asserts on subject \'busLines\' when called method \'fetchBusLines\'', () => {
    spyOn(service.http, 'get').and.returnValue(of(BUS_LIST));

    const EXPECTED_LAST_ELEMENT = BUS_LIST[0];

    service.busLines.subscribe(payload => {
      expect(payload[0].id).toEqual(EXPECTED_LAST_ELEMENT.id);
      expect(payload[0].codigo).toEqual(EXPECTED_LAST_ELEMENT.codigo);
      expect(payload[0].nome).toEqual(EXPECTED_LAST_ELEMENT.nome);

      expect(payload.length).toEqual(BUS_LIST.length);
    });

    service.fetchBusLines();
  });

  it('should be asserts on subject \'busLines\' when called method \'fetchSearchByItinerary\'', () => {
    spyOn(service.http, 'get').and.returnValue(of(ITINERARY));

    const EXPECTED_ITINERARY = itineraryParser.parse(ITINERARY)[0];

    service.itinerary.subscribe(payload => {
      expect(payload[0].id).toEqual(EXPECTED_ITINERARY.id);
      expect(payload[0].codigo).toEqual(EXPECTED_ITINERARY.codigo);
      expect(payload[0].nome).toEqual(EXPECTED_ITINERARY.nome);
     });

    service.fetchSearchByItinerary('1');
  });
});
