import { Component, OnInit } from '@angular/core';
import { DataStorageService } from './shared/services/data-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'dota-buff';

  constructor(private dataStorageService: DataStorageService) {}
  ngOnInit(): void {
    // this.dataStorageService.fetchHeroes().subscribe();
    // this.dataStorageService.fetchLobbyTypes().subscribe();
    // this.dataStorageService.fetchAbilitiesIds().subscribe();
    // this.dataStorageService.fetchAbilitiesFullInfo().subscribe();
    // this.dataStorageService.fetchItemsIds().subscribe();
    // this.dataStorageService.fetchItemsFullInfo().subscribe();
  }
}
