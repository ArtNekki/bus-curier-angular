import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import mainNav from '../../../../main-nav';
import {state, style, trigger} from '@angular/animations';

@Component({
  selector: 'app-mobile-nav',
  templateUrl: './mobile-nav.component.html',
  styleUrls: ['./mobile-nav.component.scss'],
  animations: [
    trigger('navBlock', [
      state('false', style({transform: 'translateX(100%)', opacity: 0})),
      state('true', style({transform: 'translateX(0)', opacity: 1 })),
    ])
  ]
})
export class MobileNavComponent implements OnInit {
  @Input() isOpen: boolean;
  @Output() onClose: EventEmitter<any> = new EventEmitter<any>();

  public nav = mainNav;
  public navBlock = '';

  constructor() { }

  ngOnInit(): void {
  }

  closeNav() {
    this.isOpen = false;
    this.onClose.emit(false);
  }

}
