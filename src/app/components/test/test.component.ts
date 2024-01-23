import { Lyrics } from './../../models/lyrics';
import { Component, OnInit } from '@angular/core';
import { GeniusService } from '../../services/genius.service';
import { LyricsService } from '../../services/lyrics.service';
import { Genius } from '../../models/genius';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})

export class TestComponent implements OnInit {

  query: string = ""
  resultados: Genius[] = [];
  lyrics: Lyrics;

  constructor(private service: GeniusService, private lyricsService: LyricsService) {
    this.lyrics = {
      id: 0,
      title: "",
      artist_names: "",
      lyrics: ""
    }
  }

  searchMusic(query: string) {
    this.service.getGeniusSearch(query).subscribe({
      next: (res: any) => {
        this.resultados = res.response.hits.map((hit: any) => {
          return {
            id: hit.result.id,
            title: hit.result.title,
            url: hit.result.url,
            artist_names: hit.result.primary_artist.name,
            lyrics: hit.result.path,
            image: hit.result.song_art_image_url
          };
        }
        )
        console.log(this.resultados)
      },
      error: err => console.log('Error', err)
    })
  }

  getLyrics(music: Genius) {
    this.lyricsService.getLyrics(music.artist_names, music.title).subscribe({
      next: (res: any) => {
        if (res.type !== "song_notfound" && res.type !== "notfound") {
          this.lyrics = {
            id: music.id,
            title: music.title,
            artist_names: music.artist_names,
            lyrics: res.mus[0].text
          }
          console.log(this.lyrics)
        } else {
          console.log("Não encontrado")
        }
      },

    })

  }

  ngOnInit(): void {
  }

}
