import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Component({
  selector: 'app-storage-of-cargo-page',
  templateUrl: './storage-of-cargo-page.component.html',
  styleUrls: ['./storage-of-cargo-page.component.scss']
})
export class StorageOfCargoPageComponent implements OnInit {
  public phoneNumber = '';

  constructor(private localStorage: LocalStorageService) { }

  ngOnInit(): void {
    this.phoneNumber = this.localStorage.get('phone-number');
  }

}
