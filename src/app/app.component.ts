import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MovieCreateComponent } from './movies/components/movie-create/movie-create.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private dialog: MatDialog,
  ) {

  }


  onAddNewMovie() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(MovieCreateComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {

    });
  }
}
