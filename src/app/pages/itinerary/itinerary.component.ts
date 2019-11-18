import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { Itinerary } from 'src/app/model';
import { AppService } from 'src/app/service/app.service';
import { ServiceStatus } from 'src/app/service/utils/service-status';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-itinerary',
  templateUrl: './itinerary.component.html',
  styleUrls: ['./itinerary.component.sass']
})
export class ItineraryComponent implements OnInit, OnDestroy {

  state: Itinerary;
  status: ServiceStatus;

  private subscriptionItineraryState: Subscription;
  private subscriptionServiceStatus: Subscription;

  constructor(
    public appService: AppService,
    private route: ActivatedRoute,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.subscriptionItineraryState = this.appService.itinerary.subscribe((payload: Itinerary) => this.state = payload);

    this.subscriptionServiceStatus = this.appService.status.subscribe((status: ServiceStatus) => {
      this.status = status;

      if (status.internalError.length > 0) this.toastrService.error(status.internalError);
    });

    const idLinha = this.route.snapshot.paramMap.get('id');
    this.appService.fetchSearchByItinerary(idLinha);
  }

  ngOnDestroy(): void {
    if (this.subscriptionItineraryState) this.subscriptionItineraryState.unsubscribe();
    if (this.subscriptionServiceStatus) this.subscriptionServiceStatus.unsubscribe();
  }

}
