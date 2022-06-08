import { Component, OnInit } from '@angular/core';
import {MenuItem, PrimeIcons} from 'primeng/api';
import { NgEventBus } from 'ng-event-bus';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  images: any; 
  responsiveOptions;

  constructor(private eventBus: NgEventBus) {
      this.responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 7,
            numScroll: 3
        },
        {
            breakpoint: '768px',
            numVisible: 5,
            numScroll: 2
        },
        {
            breakpoint: '560px',
            numVisible: 3,
            numScroll: 1
        }
    ];
  }

  ngOnInit(): void {

  }
}
