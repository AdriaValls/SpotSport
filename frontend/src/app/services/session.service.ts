import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs'

import { Token } from '../models/Token';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  sessionToken!: string
  error!: string

  constructor(private http:HttpClient) { }


  login (user:Object): Observable<Token> {
    return this.http.post<Token>(`${environment.baseApiUrl}/login`, user)
    /* .pipe(
        catchError(err => {throw 'Error en realitzar el post '; })) */
  }

  register(user:Object): Observable<Object> {
    return this.http.post<Object>(`${environment.baseApiUrl}/account`, user);
  }

}
