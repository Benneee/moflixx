import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Movie } from "../movie/movie.model";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: "root",
})
export class MoviesService {
  // moviesUrl = `http://www.omdbapi.com/?apikey=2be45151`;
  moviesUrl = `https://www.omdbapi.com/?apikey=f3b1fcc0`;

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  fetchMovies(url?: string, title?: string) {
    if (!title) {
      title = "batman";
    }
    return this.http
      .get(`${url}&s=${title}`)
      .toPromise()
      .then((res) => res)
      .catch((err) => err);
  }

  fetchMovieByID(id: string) {
    return this.http
      .get(`${this.moviesUrl}&i=${id}`)
      .toPromise()
      .then((res) => res)
      .catch((err) => err);
  }

  fetchMovieByTitle(title: string) {
    return this.http
      .get(`${this.moviesUrl}&t=${title}`)
      .toPromise()
      .then((res) => res)
      .catch((err) => err);
  }

  getLengthOfMoviesInFavourites() {
    if (!localStorage.getItem("movies")) {
      return 0;
    } else {
      const favourites: Movie[] = JSON.parse(localStorage.getItem("movies"));
      return favourites.length;
    }
  }

  // Favorites Stuff

  getMoviesFromLS() {
    return localStorage.getItem("movies") === null
      ? []
      : JSON.parse(localStorage.getItem("movies"));
  }

  favourite(movie: Movie) {
    const title = movie.title;
    const storage = localStorage;
    const favourites = this.getMoviesFromLS();
    const checkArray = favourites.some((m: any) => m.title === title);
    if (checkArray === false) {
      favourites.push(movie);
      storage.setItem("movies", JSON.stringify(favourites));
      this.toastr.success(`${title} added to Favourites`, "Favourites");
    } else {
      this.toastr.info(`${title} already in 'Favourites'`, "Favourites");
    }
  }

  deleteFromFavourites(movie: Movie) {
    const title = movie.title;
    const storage = localStorage;
    const favourites = this.getMoviesFromLS();
    favourites.forEach((m, index) => {
      m.imdbID === movie.imdbID ? favourites.splice(index, 1) : null;
    });
    storage.setItem("movies", JSON.stringify(favourites));
    this.toastr.success(`${title} deleted from 'Favourites'`, "Favourites");
  }

  isInFavorites(imdbId: string) {
    const favourites = this.getMoviesFromLS();
    return favourites.map((movie: Movie) => movie.imdbID).includes(imdbId);
  }
}
