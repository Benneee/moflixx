import { Movie } from './../movie/movie.model';
import { MoviesService } from './../providers/movies.service';
import { Component, OnInit } from '@angular/core';

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
  constructor(private moviesService: MoviesService) {}
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

  moviesUrl = `http://www.omdbapi.com/?apikey=2be45151`;

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
          console.log(err);
        }
      });
  }

  getNextPageData() {
    // console.log(this.totalPageNums);
    this.totalPageNums = Number(this.totalPageNums);
    const pageNumber = this.totalPageNums - (this.totalPageNums - 1) + 1;
    this.loadData(this.moviesUrl, pageNumber);
  }
}
