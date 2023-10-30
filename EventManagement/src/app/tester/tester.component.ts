import { Component } from '@angular/core';

@Component({
  selector: 'app-tester',
  templateUrl: './tester.component.html',
  styleUrls: ['./tester.component.scss']
})
export class TesterComponent {
  cats = ["hi", "you", "", ""]


  ngOnInit() {
    // // swiper element
    // const swiperEl = document.querySelector('swiper-container');

    // // swiper parameters
    // const swiperParams = {
    //   virtual: {
    //     // virtual slides
    //     slides: ['Slide 1', 'Slide 2', 'Slide 3'],
    //   },
    // };
    // // assign all parameters to Swiper element
    // Object.assign(swiperEl, swiperParams);

    // // and now initialize it
    // swiperEl.initialize();
  }

}
