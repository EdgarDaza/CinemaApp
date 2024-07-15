import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CinemaApiService {
  private apiCinemaUrl = 'http://localhost:8091/api/v1/'



  constructor(private http: HttpClient) { }

  getMovies(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiCinemaUrl}movies`);
  }

  getMovie(idMovie: string): Observable<any> {
    return this.http.get<any>(`${this.apiCinemaUrl}movie/${idMovie}`);
  }

  getShowtimeHours(idMovie: string): Observable<any> {
    return this.http.get<any>(`${this.apiCinemaUrl}showtimes/movie/${idMovie}`);
  }

  getSeatsFromShowtimeHours(idShowtimeHour : string): Observable<any> {
    return this.http.get<any>(`${this.apiCinemaUrl}showtimehour/${idShowtimeHour}/seats`)
  }

  postTicket(form : any): Observable<any> {
    return this.http.post<any>(`${this.apiCinemaUrl}purchase/ticket`, form);
  }

  getTicket(form: any): Observable<any> {
    return this.http.get<any>(`${this.apiCinemaUrl}ticket/user`, { params: form });
  }

  getTicketById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiCinemaUrl}ticket/${id}`);
  }

  getTickets(form : any): Observable<any> {
    console.log(form);
    return this.http.get<any>(`${this.apiCinemaUrl}tickets/user`, { params: form } );
  }

  }

