import {Component, Input, OnInit} from '@angular/core';
import {ModsService} from '../../../../core/services/mods.service';
import {Router} from '@angular/router';

interface Icon {
  name: string;
  width: string;
  height: string;
}

@Component({
  selector: 'app-account-media',
  templateUrl: './account-media.component.html',
  styleUrls: ['./account-media.component.scss']
})
export class AccountMediaComponent implements OnInit {
  @Input() title: string;
  @Input() path: string;
  @Input() mods;

  public cssClass;

  constructor(private modsService: ModsService, private router: Router) { }

  ngOnInit(): void {
    this.cssClass = this.modsService.setMods('account-media', this.mods);
  }

  goTo() {
    this.router.navigate(['/account', ...this.path]);
  }
}
