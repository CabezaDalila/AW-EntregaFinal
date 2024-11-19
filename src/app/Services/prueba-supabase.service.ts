import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PruebaSupabaseService {

  constructor(private http: HttpClient) { }

  pruebaSupabase () {
   const url= 'http://localhost:54321/functions/v1/hello-world';
   return  this.http.post(url,{name:'emanuel'}).toPromise();
  }
}
