import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import examples from '../../../../mock-data/examples';
import {Example} from '../../../../core/interfaces/common';
import {SwiperComponent} from 'swiper/angular';

SwiperCore.use([Navigation, Pagination]);

@Component({
  selector: 'app-index-slider',
  templateUrl: './index-slider.component.html',
  styleUrls: ['./index-slider.component.scss']
})
export class IndexSliderComponent implements OnInit {
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;

  public examples: Array<Example> = examples;

  public config = null;

  constructor() { }

  ngOnInit(): void {

    this.config = {
      slidesPerView: 1,
      spaceBetween: 20,
      effect: 'flip',
      breakpointsInverse: true,
      updateOnImagesReady: true,
      // autoplay: {
      //   delay: 2000,
      //   stopOnLastSlide: false,
      //   disableOnInteraction: true
      // },
      // loop: true,
      breakpoints: {
        // ['576']: {
        //   slidesPerView: 2,
        //   spaceBetween: 14
        // },
        ['768']: {
          slidesPerView: 1,
          spaceBetween: 14
        }
      },
      navigation: false,
      pagination: {
        el: '.swiper-pagination',
        clickable: true}
    };
  }

  onSwiper(el: any) {
    // el.pagination.render();
    console.log('$event', el);
  }

  onSlideChange() {
    console.log('$slideChange', this.swiper.swiperRef);
  }

  slideNext() {
    this.swiper.swiperRef.slideNext(100);
  }

  slidePrev() {
    this.swiper.swiperRef.slidePrev(100);
  }
}
