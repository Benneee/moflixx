import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, Input } from '@angular/core';
import { Movie } from './movie.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  @Input() movies: Movie[];
  favourites = [];
  altImg = '../assets/no-img.png';
  @Input() error;
  @Input() showFavoriteBtn = false;
  @Input() showDeleteBtn = false;
  @Input() noContent: boolean;
  isLoading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit() {}
  loadDetails(id: string) {
    // console.log('IMDB ID: ', id);
    this.router.navigate([`/movie/${id}`], {
      relativeTo: this.route
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

  favourite(movie: Movie) {
    const title = movie.title;
    const storage = localStorage;

    this.favourites = this.getMoviesFromLS();
    const checkArray = this.favourites.some((m: any) => m.title === title);
    if (checkArray === false) {
      this.favourites.push(movie);
      storage.setItem('movies', JSON.stringify(this.favourites));
      this.toastr.success(`${title} added to Favourites`, 'Favourites');
    } else {
      this.toastr.info(`${title} already in 'Favourites'`, 'Favourites');
    }
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
}
