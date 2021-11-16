import {Component, Input, OnInit} from '@angular/core';
import {ModsService} from '../../../core/services/mods.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  @Input() mods;
  @Input() color = 'rgba(255, 255, 255, 0.5)';

  public cssClass;

  constructor(private modsService: ModsService) { }

  ngOnInit(): void {
    this.cssClass = this.modsService.setMods('loader', this.mods);
  }

}
