import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../movie/movie.model';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {
  favourites: any;
  altImg = '../assets/no-img.png';
  noContent = false;
  movies: Movie[];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.getAllMoviesFromLS();
  }

  private getAllMoviesFromLS() {
    if (localStorage.length > 0) {
      if (!localStorage.getItem('movies')) {
        this.noContent = true;
      } else {
        this.noContent = false;
        this.favourites = JSON.parse(localStorage.getItem('movies'));
        // this.favourites = Array.from(new Set(this.favourites));
        if (this.favourites) {
          this.movies = this.favourites.map(item => {
            return {
              title: item.title,
              imdbID: item.imdbID,
              img: item.img ? item.img : this.altImg,
              year: item.year
            };
          });
        }
      }
    }
  }

  loadDetails(id: string) {
    // console.log('IMDB ID: ', id);
    this.router.navigate([`/movie/${id}`], {
      relativeTo: this.route
    });
  }
}
