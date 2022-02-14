import { MoviesService } from "./../providers/movies.service";
import { Component, OnInit, Input } from "@angular/core";
import { Movie } from "./movie.model";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-movie",
  templateUrl: "./movie.component.html",
  styleUrls: ["./movie.component.scss"],
})
export class MovieComponent implements OnInit {
  @Input() movies: Movie[];
  favourites = [];
  altImg = "../assets/no-img.png";
  @Input() error;
  isLoading = false;
  checkArray: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private moviesService: MoviesService
  ) {}

  ngOnInit() {
    this.favourites = this.moviesService.getMoviesFromLS();
  }

  loadDetails(id: string) {
    this.router.navigate([`/movie/${id}`], {
      relativeTo: this.route,
    });
  }

  favourite(movie: Movie) {
    this.moviesService.favourite(movie);
  }

  deleteFromFavourites(movie: Movie) {
    this.moviesService.deleteFromFavourites(movie);
  }

  isInFavorites(imdbId: string) {
    return this.moviesService.isInFavorites(imdbId);
  }
}
