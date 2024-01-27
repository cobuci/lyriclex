import { Lyrics } from './../../../models/lyrics';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LyricsService } from '../../../services/lyrics.service';
import { TranslateService } from '../../../services/translate.service';
import { Translate } from '../../../models/translate';

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
  displayOriginal: boolean[] = [];

  toggleTranslation(index: number): void {
    this.displayOriginal[index] = !this.displayOriginal[index];
  }

  constructor(private route: ActivatedRoute, private lyricsService: LyricsService, private translateService: TranslateService) {
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
            translated: undefined
          }
          this.formatLyric();
          this.translateLyric()
          this.displayOriginal = Array(this.lyricsLines.length).fill(true);
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

  }

  translateLyric(): void {
    for (let i = 0; i < this.lyricsLines.length; i++) {
      if (this.lyricsLines[i] === '<br>' || this.lyricsLines[i] === '') {

        continue;
      }
      this.translateService.requestTranslate(this.lyricsLines[i]).subscribe({
        next: (res: Translate) => {
          this.lyricsTranslated[i] = res.translatedText.text;
        },
        error: err => console.log('Error', err)
      })
    }

  }

  ngOnInit(): void {



  }

}
