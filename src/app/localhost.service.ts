import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocalhostService {
  localhost: string ="http://localhost:62284/";

  constructor(public http: HttpClient) {
    console.log('Hello LocalhostProvider Provider');
  }
}
