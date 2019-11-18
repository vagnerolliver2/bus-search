import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppService } from './service/app.service';
import { AppComponent } from './app.component';
import { SearchComponent } from './pages/search/search.component';
import { ItineraryComponent } from './pages/itinerary/itinerary.component';
import { LoadingComponent } from './components/loading/loading.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ItineraryComponent,
    LoadingComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 7 * 1000,
      progressBar: true,
      closeButton: true,
    }),
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
