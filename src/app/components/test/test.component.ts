import { Lyrics } from './../../models/lyrics';
import { Component, OnInit } from '@angular/core';
import { GeniusService } from '../../services/genius.service';
import { LyricsService } from '../../services/lyrics.service';
import { Genius } from '../../models/genius';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';



@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})

export class TestComponent implements OnInit {

  query: string = ""
  resultados: Genius[] = [];
  isDropdownOpen: boolean = false;
  private searchSubject: Subject<string> = new Subject<string>();

  constructor(private service: GeniusService, private lyricsService: LyricsService, private router: Router) {
    this.searchSubject.pipe(debounceTime(800)).subscribe((query) => {
      this.searchMusic(query);
    });

  }

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }

  onInputChange() {
    this.searchSubject.next(this.query);
  }

  searchMusic(query: string) {
    this.service.getGeniusSearch(query).subscribe({
      next: (res: any) => {
        this.resultados = res.response.hits.map((hit: any) => {
          return {
            id: hit.result.id,
            title: hit.result.title,
            artist_names: hit.result.primary_artist.name,
          };
        });
      },
      error: err => console.log('Error', err)
    })
  }

  showLyrics(music: Genius) {
    this.query = "";
    this.resultados = [];
    this.router.navigate(['/lyrics'], { queryParams: { music: JSON.stringify(music) } });
  }

  ngOnInit(): void { }

}
