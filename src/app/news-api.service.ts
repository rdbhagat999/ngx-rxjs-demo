import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NewsApiService {
  url = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${environment.API_KEY}d`;

  constructor(private httpClient: HttpClient) {}

  getNews() {
    return this.httpClient.get(this.url).pipe(
      tap((data) => console.log(data)),
      catchError((err) => {
        console.log('Error:NewsApiService::getNews');
        return throwError(() => err);
      }),
      map((data: any) => {
        return data?.articles || [];
      })
    );
  }
}
