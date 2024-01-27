import { environment } from './../../environments/environment.development';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Translate } from '../models/translate';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  private baseUrl: string = "";


  constructor(private http: HttpClient) {
    this.baseUrl = environment.deeplUrl;
  }

  requestTranslate(text: string, targetLanguage: string = "pt-br") {
    const payload = { text, targetLanguage };
    return this.http.post<Translate>("http://localhost:3000/api/translate", payload)
  }


}
