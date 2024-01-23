import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Genius, ApiResponseType } from '../models/genius';

@Injectable({
  providedIn: 'root'
})
export class GeniusService {
  private baseUrl: string = "";
  private genius: Genius | any;


  constructor(private http: HttpClient) {
    this.baseUrl = environment.geniusBaseUrl;
  }

 getGeniusSearch(query: string): Observable<Genius[]> {
    this.genius = this.http.get<ApiResponseType>(`${this.baseUrl}`, {
      params: {
        q: query,
        access_token: environment.geniusToken,
        per_page: "5"
      }

    });

    return this.genius

  }

}
