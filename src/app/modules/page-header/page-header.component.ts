import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit, AfterViewInit {
  @ViewChild('header', {read: ElementRef}) header: ElementRef;
  isSticky = false;

  constructor() { }

  ngOnInit() {
    if (this.isSticky) {
      document.documentElement.classList.add('page--header-sticky');
    } else {
      document.documentElement.classList.remove('page--header-sticky');
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.setStickyMenu();
    });
  }

  @HostListener('window:scroll', ['$event'])

  scroll() {
    this.setStickyMenu();
  }

  setStickyMenu() {
    if (this.header.nativeElement.getBoundingClientRect().top < -30) {
      this.isSticky = true;
      // document.documentElement.classList.add('page--header-sticky');
    } else {
      this.isSticky = false;
      // document.documentElement.classList.remove('page--header-sticky');
    }
  }
}
