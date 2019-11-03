import { ToastrService } from 'ngx-toastr';
import { MoviesService } from './../providers/movies.service';
import { Movie } from './../movie/movie.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
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
  altImg = '../assets/no-img.png';
  favourites: any;
  checkArray: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private moviesService: MoviesService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getMovieID();
    this.loadMovieDetails();
  }
  loadMovieDetails() {
    if (this.movieID.startsWith('tt')) {
      // console.log(this.movieID);
      this.moviesService
        .fetchMovieByID(this.movieID)
        .then(res => {
          if (res) {
            this.isLoading = false;
            this.error = false;
            this.movie = res;
            // console.log(res);
          }
        })
        .catch(err => {
          this.error = false;
          // console.log('err: ', err);
        });
    } else {
      // console.log('title: ', this.movieID);
      this.moviesService
        .fetchMovieByTitle(this.movieID)
        .then(res => {
          if (res) {
            this.movie = res;
            // console.log(res);
          }
        })
        .catch(err => {
          // console.log('err: ', err);
        });
    }
  }

  getMovieID() {
    this.route.params.subscribe((params: Params) => {
      if (!params['movieId']) {
        this.router.navigate(['/']);
        return;
      }
      this.movieID = params['movieId'];
    });
  }

  getMoviesFromLS() {
    let faves;
    faves =
      localStorage.getItem('movies') === null
        ? []
        : JSON.parse(localStorage.getItem('movies'));
    return faves;
  }

  favourite(movie: any) {
    const title = movie.Title;
    const storage = localStorage;

    this.favourites = this.getMoviesFromLS();
    this.checkArray = this.favourites.some((m: any) => m.title === title);
    if (this.checkArray === false) {
      this.favourites.push(movie);
      storage.setItem('movies', JSON.stringify(this.favourites));
      this.toastr.success(`${title} added to Favourites`, 'Favourites');
    } else {
      this.toastr.info(`${title} already in 'Favourites'`, 'Favourites');
    }
  }
}
/**
 * To Do
 * 
 * Add more of the items being used in Movie Detail to be part of the Movie Model so that 
 * the movies "favourited" from Movie Detail can show like the other movies there....
 * It's currently showing as undefined, we can't work with that.
 */