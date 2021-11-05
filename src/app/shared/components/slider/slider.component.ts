import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import Swiper, {Navigation, Pagination} from 'swiper';
import {SwiperComponent} from 'swiper/angular';
import {Example} from '../../../core/interfaces/common';
import MediaQuery from '../../../core/utils/media';
import SwiperCore from 'swiper';

SwiperCore.use([Navigation, Pagination]);

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;

  @Input() id: string;
  @Input() data: any;

  public config = null;

  constructor() { }

  ngOnInit(): void {

    this.config = {
      slidesPerView: 1,
      spaceBetween: 15,
      breakpointsInverse: true,
      breakpoints: {
        // [MediaQuery.S]: {
        //   slidesPerView: 2,
        //   spaceBetween: 15
        // },
        [MediaQuery.SM]: {
          slidesPerView: 2,
          spaceBetween: 15
        },
        [MediaQuery.MD]: {
          slidesPerView: 3,
          spaceBetween: 15
        },
        [MediaQuery.LG]: {
          slidesPerView: 4,
          spaceBetween: 30
        }
      },
      // pagination: {
      //   el: '.swiper-pagination',
      //   clickable: true}
    };

  }

  slideNext() {
    this.swiper.swiperRef.slideNext(100);
  }

  slidePrev() {
    this.swiper.swiperRef.slidePrev(100);
  }

  onSwiper($event: any) {
    // console.log('$event', $event);
  }
}
