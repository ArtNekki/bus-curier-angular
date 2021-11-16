import {Component, OnInit} from '@angular/core';
import { LocalStorageService } from './core/services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Баскурьер';

  constructor(private localStorage: LocalStorageService) {}

  ngOnInit(): void {
    if (!this.localStorage.get('phone-number')) {
      this.localStorage.set('phone-number', '8 (423) 293 78 79');
    }

    if (!this.localStorage.get('email')) {
      this.localStorage.set('email', 'inbox@busbox.guru');
    }
  }
}
