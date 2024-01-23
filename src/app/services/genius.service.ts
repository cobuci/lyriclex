import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Genius } from '../models/genius';

@Injectable({
  providedIn: 'root'
})
export class GeniusService {
  private baseUrl: string = ""
  private genius: Genius | any;
  private header: any;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.geniusBaseUrl;


  }

  getTest(): Observable<Genius> {
    this.genius = this.http.get<Genius[]>(`${this.baseUrl}`);
    return this.genius

  }
}
