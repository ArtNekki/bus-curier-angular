import {Component, Input, OnInit} from '@angular/core';
import {ModsService} from '../../../../core/services/mods.service';

@Component({
  selector: 'app-package-block',
  templateUrl: './package-block.component.html',
  styleUrls: ['./package-block.component.scss']
})
export class PackageBlockComponent implements OnInit {
  @Input() title: string;
  @Input() text: string;
  @Input() label: string;
  @Input() img: string;
  @Input() count: number;
  @Input() mods: number;

  public cssClass = '';

  constructor(private modsService: ModsService) { }

  ngOnInit(): void {
    this.cssClass = this.modsService.setMods('package-block', this.mods);
  }
}
