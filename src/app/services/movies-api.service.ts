import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesApiService {
  private apiMoviesUrl = 'http://localhost:8091/api/v1/movies';
  private apiMovieUrl = 'http://localhost:8091/api/v1/movie/'


  constructor(private http: HttpClient) { }

  getMovies(): Observable<any[]> {
    return this.http.get<any[]>(this.apiMoviesUrl);
  }

  getMovie(idMovie: string): Observable<any> {
    return this.http.get<any>(`${this.apiMovieUrl}${idMovie}`);
  }
}
