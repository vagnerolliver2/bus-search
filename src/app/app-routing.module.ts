import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchComponent } from './pages/search/search.component';
import { ItineraryComponent } from './pages/itinerary/itinerary.component';


const routes: Routes = [
  { path: '', redirectTo: '/busca', pathMatch: 'full' },
  { path: 'busca', component: SearchComponent},
  { path: 'itinerario/:id', component: ItineraryComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
