import { MoviesService } from './../providers/movies.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isCollapsed = true;
  favesNumber: any;

  constructor(private moviesService: MoviesService) {}

  ngOnInit() {}

  getLength() {
    this.favesNumber = this.moviesService.getLengthOfMoviesInFavourites();
    return this.favesNumber;
  }
}
