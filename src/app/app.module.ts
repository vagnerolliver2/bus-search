import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BusComponent } from './pages/bus/bus.component';
import { ItineraryComponent } from './pages/itinerary/itinerary.component';
import { MicroBusComponent } from './pages/micro-bus/micro-bus.component';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    BusComponent,
    ItineraryComponent,
    MicroBusComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
