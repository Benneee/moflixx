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
    this.moviesService
      .fetchMovieByID(this.movieID)
      .then(res => {
        if (res) {
          this.isLoading = false;
          this.error = false;
          this.movie = res;
          console.log(this.movie);
        }
      })
      .catch(err => {
        this.error = false;
        console.log('err: ', err);
      });
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
}
