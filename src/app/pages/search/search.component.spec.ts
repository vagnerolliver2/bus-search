import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { SearchComponent } from './search.component';
import { AppService } from 'src/app/service/app.service';
import { BUS_LIST, MICROBUS_LIST } from '../../test-helpers/mock/api-datapoa';
import { of } from 'rxjs';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        FormsModule,
        HttpClientModule
      ],
      declarations: [ SearchComponent ],
      providers: [
        AppService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    spyOn(component.appService, 'fetchBusLines').and.stub();
    spyOn(component.appService, 'fetchMicroBusLines').and.stub();
    fixture.detectChanges();
  });

  it('should create and expected \'fetchs\' called on init', () => {
    expect(component).toBeTruthy();
    expect(component.appService.fetchBusLines).toHaveBeenCalled();
    expect(component.appService.fetchMicroBusLines).toHaveBeenCalled();
  });

  it('should assert attribute \'filter\' default ', () => {
    expect(component.filter).toEqual('bus');
  });

  it('should assert attribute \'filter\' changing ', () => {
    const { debugElement: { nativeElement } } = fixture;

    const radioBus = nativeElement.querySelector('[data-test="search-input__radio-bus"]');
    const radioMicroBus = nativeElement.querySelector('[data-test="search-input__radio-microBus"]');

    radioMicroBus.click();
    expect(component.filter).toEqual('microBus');

    radioBus.click();
    expect(component.filter).toEqual('bus');
  });

  it('should coverage method  \'onSearch\' by filter bus', () => {
    component.stateBusLines = BUS_LIST;

    component.onSearch('perimetral');

    const result = component.queryResults[0];
    expect(result.id).toEqual(BUS_LIST[2].id);
    expect(result.codigo).toEqual(BUS_LIST[2].codigo);
    expect(result.nome).toEqual(BUS_LIST[2].nome);

    expect(component.queryResults.length).toEqual(1);
  });

  it('should coverage method  \'onSearch\' by filter microBus', () => {
    component.filter = 'microBus';
    component.stateMicroBusLines = MICROBUS_LIST;

    component.onSearch('auxiliador');

    const result = component.queryResults[0];
    expect(result.id).toEqual(MICROBUS_LIST[1].id);
    expect(result.codigo).toEqual(MICROBUS_LIST[1].codigo);
    expect(result.nome).toEqual(MICROBUS_LIST[1].nome);

    expect(component.queryResults.length).toEqual(1);
  });

  it('should coverage method  \'onBlurSearch\'', () => {
    component.queryResults = MICROBUS_LIST;

    component.clearQueryResults();

    expect(component.queryResults.length).toEqual(0);
  });
});
