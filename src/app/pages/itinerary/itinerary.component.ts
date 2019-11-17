import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { Itinerary } from 'src/app/model';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-itinerary',
  templateUrl: './itinerary.component.html',
  styleUrls: ['./itinerary.component.sass']
})
export class ItineraryComponent implements OnInit, OnDestroy {

  state: Itinerary;

  private subscriptionStateItinerary: Subscription;

  constructor(
    public appService: AppService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.subscriptionStateItinerary = this.appService.itinerary.subscribe((payload: Itinerary) => this.state = payload);

    const idLinha = this.route.snapshot.paramMap.get('id');
    this.appService.fetchSearchByItinerary(idLinha);
  }

  ngOnDestroy(): void {
    if (this.subscriptionStateItinerary) this.subscriptionStateItinerary.unsubscribe();
  }

}
