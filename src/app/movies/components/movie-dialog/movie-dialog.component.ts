import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MovieModel } from '../../models/movie';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MovieService } from '../../services/movie.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movie-dialog',
  templateUrl: './movie-dialog.component.html',
  styleUrls: ['./movie-dialog.component.scss']
})
export class MovieDialogComponent implements OnInit {

  movie!: MovieModel;
  form!: FormGroup;
  imageUrl!: string;
  public readonly apiPath = environment.apiPath;

  get f(): any { return this.form.controls }

  constructor(
    private formBuilder: FormBuilder,
    private movieService: MovieService,
    private dialog: MatDialogRef<MovieDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    if (data) {
      this.movie = data;
      if (!this.form) {
        this.buildForm();
      }
      this.bindForm();
    }
  }

  ngOnInit(): void {

  }

  buildForm() {
    this.form = this.formBuilder.group({
      title: new FormControl<any>('', { validators: [Validators.required] }),
      desc: new FormControl<any>(''),
      month: new FormControl<any>(''),
      year: new FormControl<any>(''),
      img: new FormControl<any>(''),
      logo: new FormControl<any>(''),
      runtime: new FormControl<any>(''),
    });
  }

  bindForm() {
    this.form.patchValue(this.movie);
  }

  onClose() {
    this.dialog.close();
  }

  getErrorMessage(control: AbstractControl) {
    return control.hasError('required') ? 'Required' : '';
  }

  onSave() {
    let _updatedMovie = this.movieService.movies.find(x => x.id == this.movie.id);
    if (_updatedMovie) {
      Object.assign(_updatedMovie, this.form.value);
      this.movie.img = this.imageUrl;
      console.log(this.movieService.movies);
      localStorage.setItem('movies', JSON.stringify(this.movieService.movies));
      this.dialog.close();
    }
  }

  onDelete() {
    this.movieService.movies = this.movieService.movies.filter(x => x.id !== this.movie.id);
    localStorage.setItem('movies', JSON.stringify(this.movieService.movies));
    this.dialog.close();
  }

  onSelectionChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  getImageUrl(movie: MovieModel) {
    const imgUrl = movie.img.startsWith('assets/images');
    return imgUrl;
  }
}
