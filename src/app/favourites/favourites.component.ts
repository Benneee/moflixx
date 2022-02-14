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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
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
}
