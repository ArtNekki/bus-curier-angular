import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import Swiper from 'swiper';
import {indexSlider} from '../../../../core/config/slider';
import examples from '../../../../mock-data/examples';
import {Example} from '../../../../core/interfaces/common';

@Component({
  selector: 'app-index-slider',
  templateUrl: './index-slider.component.html',
  styleUrls: ['./index-slider.component.scss']
})
export class IndexSliderComponent implements OnInit, AfterViewInit {
  @ViewChild('slider', {read: ElementRef}) slider: ElementRef;

  public swiper: Swiper;
  public examples: Array<Example> = examples;

  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.initSwiper();
  }

  initSwiper() {

    //|| !this.swiper.initialized

    if (!this.swiper) {
      this.swiper = new Swiper(this.slider.nativeElement, indexSlider);
    }
  }

  }
