import { ToastrService } from "ngx-toastr";
import { MoviesService } from "./../providers/movies.service";
import { Movie } from "./../movie/movie.model";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, Params } from "@angular/router";

@Component({
  selector: "app-movie-detail",
  templateUrl: "./movie-detail.component.html",
  styleUrls: ["./movie-detail.component.scss"],
})

/**
 * The Items I want
 * Rated
 * Released
 * Genre
 * Runtime
 * Director
 * Writer
 * Actors
 * Plot
 * Language
 * Country
 * Awards
 * BoxOffice
 * Poster
 * imdbRating
 * Title
 * Production
 */
export class MovieDetailComponent implements OnInit {
  movie: any;
  movieID: string;
  isLoading = false;
  error = false;
  altImg = "../assets/no-img.png";
  favourites: any;
  checkArray: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private moviesService: MoviesService
  ) {}

  ngOnInit() {
    this.getMovieID();
    this.loadMovieDetails();
  }
  loadMovieDetails() {
    if (this.movieID.startsWith("tt")) {
      this.moviesService
        .fetchMovieByID(this.movieID)
        .then((res) => {
          if (res) {
            this.isLoading = false;
            this.error = false;
            this.movie = res;
          }
        })
        .catch((err) => {
          this.error = false;
        });
    } else {
      this.moviesService
        .fetchMovieByTitle(this.movieID)
        .then((res) => {
          if (res) {
            this.movie = res;
          }
        })
        .catch((err) => {
          console.log("err: ", err);
        });
    }
  }

  getMovieID() {
    this.route.params.subscribe((params: Params) => {
      if (!params["movieId"]) {
        this.router.navigate(["/"]);
        return;
      }
      this.movieID = params["movieId"];
    });
  }

  favourite(movie: Movie) {
    let title = movie["Title"];
    movie.title = title;
    this.moviesService.favourite(movie);
  }

  deleteFromFavourites(movie: Movie) {
    let title = movie["Title"];
    movie.title = title;
    this.moviesService.deleteFromFavourites(movie);
  }

  isInFavorites(imdbId: string) {
    return this.moviesService.isInFavorites(imdbId);
  }
}

/**
 * To Do
 *
 * Add more of the items being used in Movie Detail to be part of the Movie Model so that
 * the movies "favourited" from Movie Detail can show like the other movies there....
 * It's currently showing as undefined, we can't work with that.
 */
