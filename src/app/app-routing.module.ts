import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusComponent } from './pages/bus/bus.component';
import { MicroBusComponent } from './pages/micro-bus/micro-bus.component';
import { ItineraryComponent } from './pages/itinerary/itinerary.component';


const routes: Routes = [
  { path: 'onibus', component: BusComponent },
  { path: 'lotacao', component: MicroBusComponent },
  { path: 'itinerarios', component: ItineraryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
