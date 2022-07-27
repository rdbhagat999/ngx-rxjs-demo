import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsComponent } from './news/news.component';
import { RxjsDemoComponent } from './rxjs-demo/rxjs-demo.component';

const routes: Routes = [
  { path: '', title: 'Home', redirectTo: 'rxjs', pathMatch: 'full' },
  { path: 'rxjs', title: 'Rxjs Demo', component: RxjsDemoComponent },
  { path: 'news', title: 'Top News', component: NewsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
