import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { SearchComponent } from './search.component';
import { AppService } from 'src/app/service/app.service';
import { BUS_LIST, MICROBUS_LIST } from '../../test-helpers/mock/api-datapoa';

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

  it('should create and called \'fetchs\' on init', () => {
    expect(component).toBeTruthy();
    expect(component.appService).toBeTruthy();
    expect(component.appService.fetchBusLines).toHaveBeenCalled();
    expect(component.appService.fetchMicroBusLines).toHaveBeenCalled();
  });

  it('should be assert \'filter\' attribute default', () => {
    expect(component.filter).toEqual('bus');
  });

  it('should be assert \'filter\' attribute when changing by handler click', () => {
    const { debugElement: { nativeElement } } = fixture;
    const radioBus = nativeElement.querySelector('[data-test="search-input__radio-bus"]');
    const radioMicroBus = nativeElement.querySelector('[data-test="search-input__radio-microBus"]');

    radioMicroBus.click();
    expect(component.filter).toEqual('microBus');

    radioBus.click();
    expect(component.filter).toEqual('bus');
  });

  it('should be coverage method \'onSearch\' when filter value is \'bus\'', () => {
    component.stateBusLines = BUS_LIST;

    component.onSearch('perimetral');

    const result = component.queryResults[0];
    expect(result.id).toEqual(BUS_LIST[2].id);
    expect(result.codigo).toEqual(BUS_LIST[2].codigo);
    expect(result.nome).toEqual(BUS_LIST[2].nome);

    expect(component.queryResults.length).toEqual(1);
  });

  it('should be coverage method \'onSearch\' when filter value is \'microBus\'', () => {
    component.filter = 'microBus';
    component.stateMicroBusLines = MICROBUS_LIST;

    component.onSearch('auxiliador');

    const result = component.queryResults[0];
    expect(result.id).toEqual(MICROBUS_LIST[1].id);
    expect(result.codigo).toEqual(MICROBUS_LIST[1].codigo);
    expect(result.nome).toEqual(MICROBUS_LIST[1].nome);

    expect(component.queryResults.length).toEqual(1);
  });

  it('should be empty \'queryResults\' when method \'onBlurSearch\' is called', () => {
    component.queryResults = MICROBUS_LIST;

    component.clearQueryResults();

    expect(component.queryResults.length).toEqual(0);
  });
});
