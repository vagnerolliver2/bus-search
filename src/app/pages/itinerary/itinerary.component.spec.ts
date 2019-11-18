import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ItineraryComponent } from './itinerary.component';
import { AppService } from 'src/app/service/app.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastrService, ToastrModule } from 'ngx-toastr';

import { ITINERARY } from '../../test-helpers/mock/api-datapoa';
import itineraryParser from 'src/app/service/parser/itinerary';
import { LoadingComponent } from 'src/app/components/loading/loading.component';

describe('ItineraryComponent', () => {
  let component: ItineraryComponent;
  let fixture: ComponentFixture<ItineraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        FormsModule,
        HttpClientModule,
        ToastrModule.forRoot(),
      ],
      declarations: [
        ItineraryComponent,
        LoadingComponent
      ],
      providers: [
        AppService,
        ToastrService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItineraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
    expect(component.appService).toBeTruthy();
  });

  it('should be assert attribute \'state\' when changed Subject \'itinerary\' from appService', () => {
    const MOCK_PARSER_ITINERARY = itineraryParser.parse(ITINERARY);

    component.appService.itinerary.next(MOCK_PARSER_ITINERARY);
    expect(component.state).toEqual(MOCK_PARSER_ITINERARY);
  });

});
