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
    if (this.header.nativeElement.getBoundingClientRect().top < -30) {
      this.isSticky = true;
    } else {
      this.isSticky = false;
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
