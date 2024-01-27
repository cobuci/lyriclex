import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LyricsService {
  private baseUrl: string = "";
  private lyrics: any;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.lyricsBaseUrl;

  }

  getLyrics(artist: string, song: string) {
    this.lyrics = this.http.get<any>(`${this.baseUrl}`,{
      params: {
        art: artist,
        mus: song,
        apiKey: environment.lyricsToken
      }
    })
    return this.lyrics
  }
}
