import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { MovieModel } from '../../models/movie';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MovieDialogComponent } from '../movie-dialog/movie-dialog.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movie-view',
  templateUrl: './movie-view.component.html',
  styleUrls: ['./movie-view.component.scss']
})
export class MovieViewComponent implements OnInit {

  public readonly apiPath = environment.apiPath;
  get movies() { return this.movieService.movies }

  constructor(
    private movieService: MovieService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    const _localData = localStorage.getItem('movies');
    if (!_localData) {
      let movies: MovieModel[] = [];
      this.movieService.getMoviesData().subscribe(res => {
        movies = res;
        movies.forEach((movie, index) => {
          movie.id = index + 1;
        });
        localStorage.setItem('movies', JSON.stringify(movies));
        this.movieService.movies = localStorage.getItem('movies') ? JSON.parse(localStorage.getItem('movies')!) : [];
      })
    } else {
      this.movieService.movies = localStorage.getItem('movies') ? JSON.parse(localStorage.getItem('movies')!) : [];
    }
  }

  onEdit(movie: MovieModel) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = movie;

    const dialogRef = this.dialog.open(MovieDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  getImageUrl(movie: MovieModel) {
    const imgUrl = movie.img.startsWith('assets/images');
    return imgUrl;
  }
}
