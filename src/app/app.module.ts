import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppService } from './service/app.service';
import { AppComponent } from './app.component';
import { SearchComponent } from './pages/search/search.component';
import { ItineraryComponent } from './pages/itinerary/itinerary.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ItineraryComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
