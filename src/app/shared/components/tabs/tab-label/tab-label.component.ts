import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-tab-label',
  templateUrl: './tab-label.component.html'
})
export class TabLabelComponent implements OnInit {
  @Input() id: string

  @ViewChild(TemplateRef)
  labelContent: TemplateRef<any>;

  constructor() { }

  ngOnInit(): void {
  }

}
