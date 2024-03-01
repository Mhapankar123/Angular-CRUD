import { Injectable, OnInit } from "@angular/core";
import { MovieModel } from "../models/movie";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
}) export class MovieService {
  private _movies: MovieModel[] = [];
  get movies() { return this._movies }
  set movies(value) { this._movies = value }

  constructor(private http: HttpClient) { }

  getMoviesData() {
    return this.http.get<MovieModel[]>('/flutter-json/');
  }
}
