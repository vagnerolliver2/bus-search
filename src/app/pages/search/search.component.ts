import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Bus } from 'src/app/model';
import { AppService } from '../../service/app.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit, OnDestroy {

  private stateBusLines: Bus[];
  private stateMicroBusLines: Bus[];

  private subscriptionStateBus: Subscription;
  private subscriptionStateMicroBus: Subscription;

  filter = 'bus';
  queryResults: Bus[];

  constructor(public appService: AppService) { }

  ngOnInit(): void {
    this.subscriptionStateBus = this.appService.busLines.subscribe((payload: Bus[]) => this.stateBusLines = payload);
    this.subscriptionStateMicroBus = this.appService.microBusLines.subscribe((payload: Bus[]) => this.stateMicroBusLines = payload);

    this.appService.fetchBusLines();
    this.appService.fetchMicroBusLines();
  }

  ngOnDestroy(): void {
    if (this.subscriptionStateBus) this.subscriptionStateBus.unsubscribe();
    if (this.subscriptionStateMicroBus) this.subscriptionStateMicroBus.unsubscribe();
  }

  private findPerBusLines(value: string): Bus[] {
    return this.stateBusLines.filter((bus: Bus) => this.removeSpaceString(bus.nome).toUpperCase().includes(value));
  }

  private findPerMicroBusLines(value: string): Bus[] {
    const regexValue = value.replace(/\s/g, '');
    return this.stateMicroBusLines.filter((bus: Bus) => this.removeSpaceString(bus.nome).toUpperCase().includes(value));
  }

  onSearch(value: string, from?: string) {
    if (value === '') return;

    if (from) this.filter = from;

    if (this.filter === 'bus') this.queryResults = this.findPerBusLines(this.removeSpaceString(value).toUpperCase());
    if (this.filter === 'microBus') this.queryResults = this.findPerMicroBusLines(this.removeSpaceString(value).toUpperCase());
  }

  removeSpaceString(value: string): string {
    return value.replace(/\s/g, '');
  }

  onBlurSearch(value: string): void {
    if (value !== '') return;

    this.clearQueryResults();
  }

  clearQueryResults(): void {
    this.queryResults = [];
  }
}