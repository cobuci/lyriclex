import { Lyrics } from './../../../models/lyrics';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LyricsService } from '../../../services/lyrics.service';
import { Genius } from '../../../models/genius';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})

export class IndexComponent implements OnInit {

  Lyrics: Lyrics = {
    id: 0,
    title: '',
    artist_names: '',
    lyrics: '',
    translated: ''
  };

  lyricsLines: string[] = [];
  lyricsTranslated: string[] = [];
  lyricsInput: string[] = [];
  hasTranslated: boolean = true;

  constructor(private route: ActivatedRoute, private router: Router, private lyricsService: LyricsService) {
    this.route.queryParams.subscribe(params => {
      params = JSON.parse(params['music']);
      this.getLyrics(params);
    });
  }

  getLyrics(music: any): void {
    this.lyricsService.getLyrics(music.artist_names, music.title).subscribe({
      next: (res: any) => {
        if (res.type !== "song_notfound" && res.type !== "notfound") {
          this.Lyrics = {
            id: music.id,
            title: music.title,
            artist_names: music.artist_names,
            lyrics: res.mus[0].text,
            translated: res.mus[0].translate ? res.mus[0].translate[0].text : undefined
          }
          this.formatLyric();
        } else {
          console.log("Não encontrado")
        }
      },
    })

  }

  formatLyric(): void {
    if (this.Lyrics.lyrics === undefined) return;
    const linhasDaMusica = this.Lyrics.lyrics.split('\n');
    this.lyricsLines = linhasDaMusica.map(linha => linha.trim() === '' ? '<br>' : linha);

    if (this.Lyrics.translated) {
      const linhasDaMusica = this.Lyrics.translated.split('\n');
      this.lyricsTranslated = linhasDaMusica.map(linha => linha.trim() === '' ? '<br>' : linha);
    } else {
      this.hasTranslated = false;
    }
  }

  ngOnInit(): void { }

}
