import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { MoviesModule } from './movies/movies.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HttpCoreInterceptor } from './http-core.interceptor';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MoviesModule,
    HttpClientModule,
    MatDialogModule,
    MatIconModule,
    MatFormFieldModule,
    MoviesModule,
    BrowserAnimationsModule,
  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: HttpCoreInterceptor,
    //   multi: true,
    // },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
