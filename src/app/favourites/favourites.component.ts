import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../movie/movie.model';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {
  favourites: Movie[];
  altImg = '../assets/no-img.png';
  noContent = false;
  movies: Movie[];
  favesNumber: any;
  @Input() showFavoriteBtn = false;
  @Input() showDeleteBtn = true;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getAllMoviesFromLS();
  }

  getMoviesFromLS() {
    let faves;
    faves =
      localStorage.getItem('movies') === null
        ? []
        : JSON.parse(localStorage.getItem('movies'));
    return faves;
  }

  deleteFromFavourites(movie: Movie) {
    const title = movie.title;
    const storage = localStorage;

    this.favourites = this.getMoviesFromLS();
    this.favourites.forEach((m, index) => {
      m.imdbID === movie.imdbID ? this.favourites.splice(index, 1) : null;
    });
    storage.setItem('movies', JSON.stringify(this.favourites));
    this.toastr.success(`${title} deleted from 'Favourites'`, 'Favourites');
    this.getAllMoviesFromLS();
  }

  private getAllMoviesFromLS() {
    if (localStorage.length > 0) {
      if (!localStorage.getItem('movies')) {
        this.noContent = true;
      } else {
        this.noContent = false;
        this.favourites = JSON.parse(localStorage.getItem('movies'));
        const faves: any[] = Array.from(new Set(this.favourites));
        if (faves) {
          this.movies = faves.map(item => {
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
