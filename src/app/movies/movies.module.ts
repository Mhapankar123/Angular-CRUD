import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MovieViewComponent } from './components/movie-view/movie-view.component';
import { MovieDialogComponent } from './components/movie-dialog/movie-dialog.component';
import { MovieCreateComponent } from './components/movie-create/movie-create.component';



@NgModule({
  declarations: [
    MovieViewComponent,
    MovieDialogComponent,
    MovieCreateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule
  ],
  exports: [
    MovieViewComponent,
    MovieDialogComponent,
    MovieCreateComponent
  ]
})
export class MoviesModule { }
