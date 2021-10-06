import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  @Input() name: string;
  @Input() tabs: {type: string; name: string; checked?: boolean};

  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void {
  }

}
