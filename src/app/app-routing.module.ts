import { MovieQuotesComponent } from './movie-quotes/movie-quotes.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'favourites', component: FavouritesComponent },
  { path: 'movie-quotes', component: MovieQuotesComponent },
  { path: 'movie/:movieId', component: MovieDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
