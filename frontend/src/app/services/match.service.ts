import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs'
import { Match } from 'src/app/models/Match';


@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(private http:HttpClient) { }


  newMatch(match: Object): Observable<Object>  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }),
      
    };
    // @ts-ignore
    return this.http.post<Object>(`${environment.baseApiUrl}/match`,match,  httpOptions)
  }

  getMatch(id: number): Observable<Object>  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    // @ts-ignore
    return this.http.get<Object>(`${environment.baseApiUrl}/match/${id}`, httpOptions)
  }
  

  getMatchPlayers(id: number): Observable<Object>  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    // @ts-ignore
    return this.http.get<Object>(`${environment.baseApiUrl}/players/${id}`, httpOptions)
  }

  joinMatch(id: number): Observable<Object>  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    // @ts-ignore
    return this.http.post<Object>(`${environment.baseApiUrl}/players/${id}`, httpOptions)
  }

  endMatch(id: number, winner: number): Observable<Object>  {
    const params = {winner_id: winner}
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }),
      params
    };
    // @ts-ignore
    return this.http.post<Object>(`${environment.baseApiUrl}/players/${id}`, httpOptions)
  }



  leaveMatch(id: number): Observable<Object>  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    // @ts-ignore
    return this.http.delete<Object>(`${environment.baseApiUrl}/match/${id}`, httpOptions)
  }


}
