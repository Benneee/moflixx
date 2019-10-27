import { Movie } from './../movie/movie.model';
import { MoviesService } from './../providers/movies.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

/**
 * The items I want
 * title
 * year
 * image
 * imdbId (for search & details page)
 */
export class HomeComponent implements OnInit {
  constructor(
    private moviesService: MoviesService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}
  isLoading = false;
  error = false;
  movies: Movie[];
  altImg = '../assets/no-img.png';
  p;
  previousPage = false;
  nextPage;
  totalPageNums;
  @Input() showFavoriteBtn = true;
  @Input() showDeleteBtn = false;
  // favourites = [];

  moviesUrl = `https://www.omdbapi.com/?apikey=f3b1fcc0`;

  // moviesUrl = `http://www.omdbapi.com/?apikey=2be45151`;

  ngOnInit() {
    this.loadData();
  }

  private loadData(url?: string, movie?: any) {
    if (!url) {
      url = this.moviesUrl;
    }
    if (!movie) {
      movie = 'batman';
    }
    this.moviesService
      .fetchMovies(url, movie)
      .then(res => {
        this.isLoading = true;
        this.error = false;
        if (res) {
          this.totalPageNums = res['totalResults'];
          if (res['Response'] === 'True') {
            this.movies = res['Search'].map(item => {
              return {
                title: item.Title,
                imdbID: item.imdbID,
                img: item.Poster ? item.Poster : this.altImg,
                year: item.Year
              };
            });
            // console.log('movies: ', this.movies);
          }
        }
      })
      .catch(err => {
        if (err) {
          this.isLoading = false;
          this.error = true;
          // console.log('err: ', err);
          this.toastr.error('Error while loading movies', 'Moflixx');
        }
        if (!navigator.onLine) {
          this.error = true;
        }
      });
  }

  search(movieSearch: NgForm) {
    const { movieTitle } = movieSearch.value;
    const convTitle = movieTitle.replace(' ', '+');
    this.router.navigate([`/movie/${convTitle}`], {
      relativeTo: this.route
    });
  }

  getNextPageData() {
    const randomMovies = [
      'batman',
      'superman',
      'avengers',
      'harry potter',
      'mission impossible',
      'friends',
      'suits'
    ];
    const randomNumber = Math.floor(
      Math.random() * randomMovies.length - 1 + 1
    );
    const randomMovie = randomMovies[randomNumber];
    // console.log(randomMovie);
    this.loadData(this.moviesUrl, randomMovie);
  }
}
