import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit, AfterViewInit {
  @ViewChild('header', {read: ElementRef}) header: ElementRef;

  isSticky = false;
  mobileNavIsOpen = false;

  constructor() { }

  ngOnInit() {

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
    console.log('fffff', this.header.nativeElement.getBoundingClientRect().top);

    if ((this.header.nativeElement.getBoundingClientRect().top < -5) && !this.isSticky) { // -30
      this.isSticky = true;
      document.body.style.paddingTop = '70px';
    } else if ((this.header.nativeElement.getBoundingClientRect().top === 70) && this.isSticky) {
      this.isSticky = false;
      document.body.style.paddingTop = '0';
    }
  }

  openMobileNav() {
    this.mobileNavIsOpen = true;
    document.documentElement.classList.add('page--mobile-open');
  }

  closeMobileNav(state) {
    this.mobileNavIsOpen = state;
    document.documentElement.classList.remove('page--mobile-open');
  }
}
