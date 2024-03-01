import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MovieService } from '../../services/movie.service';
import { MovieModel } from '../../models/movie';

@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.scss']
})
export class MovieCreateComponent {

  form!: FormGroup;
  imageUrl!: string;
  movie: MovieModel = new MovieModel();

  get f(): any { return this.form.controls }
  constructor(
    private formBuilder: FormBuilder,
    private movieService: MovieService,
    private dialog: MatDialogRef<MovieCreateComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    if (!this.form) {
      this.buildForm();
    }
  }

  onClose() {
    this.dialog.close();
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

  getErrorMessage(control: AbstractControl) {
    return control.hasError('required') ? 'Required' : '';
  }

  onSave() {
    Object.assign(this.movie, this.form.value);
    this.movie.img = this.imageUrl;
    this.movie.id = this.movieService.movies.length + 1;
    this.movieService.movies.push(this.movie);
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
}
