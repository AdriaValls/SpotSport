import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(private http:HttpClient) { }

  getMainFeed(): Observable<Object>  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.get<Object>(`${environment.baseApiUrl}/feed`, httpOptions)

  }

  getJoinedMatches(id: number): Observable<Object>  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.get<Object>(`${environment.baseApiUrl}/matches/${id}`, httpOptions)

  }

  getOwnedMatches(id: number): Observable<Object>  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.get<Object>(`${environment.baseApiUrl}/owned/${id}`, httpOptions)

  }

}
