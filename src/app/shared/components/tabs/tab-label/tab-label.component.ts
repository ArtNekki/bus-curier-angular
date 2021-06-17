import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-tab-label',
  templateUrl: './tab-label.component.html'
})
export class TabLabelComponent implements OnInit {
  @ViewChild(TemplateRef)
  labelContent: TemplateRef<any>;

  constructor() { }

  ngOnInit(): void {
  }

}
