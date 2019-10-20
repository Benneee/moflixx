import { Movie } from './../movie/movie.model';
import { MoviesService } from './../providers/movies.service';
import { Component, OnInit } from '@angular/core';
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
  randomMovies;
  randomNumber;
  randomMovie;
  p;
  previousPage = false;
  nextPage;
  totalPageNums;
  favourites: Movie[] = [];

  moviesUrl = `http://www.omdbapi.com/?apikey=f3b1fcc0`;

  // moviesUrl = `http://www.omdbapi.com/?apikey=2be45151`;

  ngOnInit() {
    this.randomMovies = ['batman', 'superman', 'avengers'];
    this.randomNumber = Math.floor(
      Math.random() * this.randomMovies.length - 1 + 1
    );
    this.randomMovie = this.randomMovies[this.randomNumber];
    this.loadData();
  }

  private loadData(url?: string, pageNumber?: number) {
    if (!url) {
      url = this.moviesUrl;
    }
    this.moviesService
      .fetchMovies(url, this.randomMovie, pageNumber)
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
          console.log('err: ', err);
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

  favourite(movie: Movie) {
    const title = movie.title;
    const storage = localStorage;
    this.favourites.push(movie);

    if (movie) {
      storage.setItem('movies', JSON.stringify(this.favourites));
      this.toastr.success(
        `${title} is now a favourite. Find it in 'Favourites' page`,
        'Favourites'
      );
    }
  }

  getNextPageData() {
    // console.log(this.totalPageNums);
    this.totalPageNums = Number(this.totalPageNums);
    const pageNumber = this.totalPageNums - (this.totalPageNums - 1) + 1;
    this.loadData(this.moviesUrl, pageNumber);
  }

  loadDetails(id: string) {
    // console.log('IMDB ID: ', id);
    this.router.navigate([`/movie/${id}`], {
      relativeTo: this.route
    });
  }
}
