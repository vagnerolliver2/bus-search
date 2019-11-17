import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

import { Bus, Itinerary } from '../model';
import itineraryParser from './parser/itinerary';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private endpoint = `${environment.endpoints.dataPoa}`;

  busLines = new Subject<Bus[]>();
  microBusLines = new Subject<Bus[]>();
  itinerary = new Subject<Itinerary>();

  constructor(private http: HttpClient) { }

   fetchBusLines(): void {
    const params = 'a=nc&p=%&t=o';

    this.http.get(`${this.endpoint}?${params}`).subscribe({
      next: (payload: Bus[]) => this.busLines.next(payload),
      error: error => console.log('error', error)
    });
  }

  fetchMicroBusLines(): void {
    const params = 'a=nc&p=%&t=l';

    this.http.get(`${this.endpoint}?${params}`).subscribe({
      next: (payload: Bus[]) => this.microBusLines.next(payload),
      error: error => console.log('error', error)
    });
  }

  fetchSearchByItinerary(id: string): void {
    const params = `a=il&p=${id}`;

    this.http.get(`${this.endpoint}?${params}`).subscribe({
      next: payload => {
        const parsePayload: Itinerary = itineraryParser.parse(payload);
        this.itinerary.next(parsePayload);
      },
      error: error => console.log('error', error)
    });
  }
}