import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Movie } from "../movie/movie.model";
import { MoviesService } from "./../providers/movies.service";

@Component({
  selector: "app-favourites",
  templateUrl: "./favourites.component.html",
  styleUrls: ["./favourites.component.scss"],
})
export class FavouritesComponent implements OnInit {
  favourites: Movie[];
  altImg = "../assets/no-img.png";
  noContent = false;
  movies: Movie[];
  favesNumber: any;

  properlyModelledMovies: Movie[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private moviesService: MoviesService
  ) {}

  ngOnInit() {
    this.loadFavorites();
  }

  loadFavorites() {
    const unModelledFavorites: any[] = this.moviesService.getMoviesFromLS();
    const wholeFavorites = unModelledFavorites.map((movie: any) => {
      if (movie.title && movie.img) {
        this.properlyModelledMovies.push(movie);
      } else {
        return {
          title: movie.Title,
          year: movie.Year,
          img: movie.Poster ? movie.Poster : "../assets/no-img.png",
          imdbID: movie.imdbID,
        };
      }
    });

    if (this.properlyModelledMovies.length > 0) {
      const refined = wholeFavorites.filter((movie) => movie !== undefined);

      const filtered = [...refined, ...this.properlyModelledMovies];

      this.favourites = filtered.filter(
        (movie: any) => movie.img !== undefined && movie !== undefined
      );
    }
  }

  loadDetails(id: string) {
    this.router.navigate([`/movie/${id}`], {
      relativeTo: this.route,
    });
  }
}
