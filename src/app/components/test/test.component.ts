import { Component, OnInit } from '@angular/core';
import { GeniusService } from '../../services/genius.service';
import { Genius } from '../../models/genius';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})

export class TestComponent implements OnInit {

  title: string = ""
  resultados: Genius[] = []

  constructor(private service: GeniusService) {

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

  ngOnInit(): void {


  }

}
