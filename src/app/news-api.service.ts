import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NewsApiService {
  url = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${environment.API_KEY}`;

  constructor(private httpClient: HttpClient) {}

  getNews() {
    return this.httpClient.get(this.url).pipe(
      tap((data) => console.log(data)),
      map((data: any) => {
        return data.articles;
      })
    );
  }
}
