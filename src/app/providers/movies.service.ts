import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  // moviesUrl = `http://www.omdbapi.com/?apikey=2be45151`;
  moviesUrl = `http://www.omdbapi.com/?apikey=f3b1fcc0`;

  constructor(private http: HttpClient) {}

  fetchMovies(url?: string, title?: string, pageNum?: number) {
    if (!pageNum) {
      pageNum = 1;
    }
    if (!title) {
      title = 'batman';
    }
    return this.http
      .get(`${url}&page=${pageNum}&s=${title}`)
      .toPromise()
      .then(res => res)
      .catch(err => err);
  }

  fetchMovieByID(id: string) {
    return this.http
      .get(`${this.moviesUrl}&i=${id}`)
      .toPromise()
      .then(res => res)
      .catch(err => err);
  }

  fetchMovieByTitle(title: string) {
    return this.http
      .get(`${this.moviesUrl}&t=${title}`)
      .toPromise()
      .then(res => res)
      .catch(err => err);
  }
}
