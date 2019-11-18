import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.sass']
})
export class LoadingComponent {

  @Input() loading: boolean ;

  constructor() {
    this.loading = false;
  }
}
