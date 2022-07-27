import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsApiService } from '../news-api.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  articles$!: Observable<any>;

  constructor(private newsapi: NewsApiService) {}

  ngOnInit(): void {
    this.articles$ = this.newsapi.getNews();
  }
}
