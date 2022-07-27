import { Component, OnInit } from '@angular/core';
import { combineLatest, forkJoin, Subject, zip } from 'rxjs';
import { withLatestFrom, take, first } from 'rxjs/operators';

type Color = 'white' | 'green' | 'red' | 'blue';
type Logo = 'fish' | 'dog' | 'bird' | 'cow';

@Component({
  selector: 'app-rxjs-demo',
  templateUrl: './rxjs-demo.component.html',
  styleUrls: ['./rxjs-demo.component.scss'],
})
export class RxjsDemoComponent implements OnInit {
  color$ = new Subject<Color>();
  logo$ = new Subject<Logo>();

  constructor() {}

  ngOnInit(): void {}

  setNewSubjects() {
    this.color$ = new Subject<Color>();
    this.logo$ = new Subject<Logo>();
  }

  zipButtonClicked() {
    /*
    When we zip color$ and logo$, we expect to receive an array of 2 items during subscribe,
    the first item is color and the second is logo (follow their orders in zip function).
    zip operator can accept more than 2 observables - no matter how many observables,
    they must all wait for each other, no man left behind!
    */
    console.log('=======zipButtonClicked=======');

    zip(this.color$, this.logo$).subscribe(([color, logo]) =>
      console.log(`${color} shirt with ${logo}`)
    );

    this.nextButtonClicked();
    this.setNewSubjects();
  }

  combineLatestButtonClicked() {
    /*
    I call combineLatest operator the independent operator.
    They are independent and don’t wait for each other.
    Either the color or logo value change will trigger the log.
    */
    console.log('=======combineLatestButtonClicked=======');

    combineLatest([this.color$, this.logo$]).subscribe(([color, logo]) =>
      console.log(`${color} shirt with ${logo}`)
    );

    this.nextButtonClicked();
    this.setNewSubjects();
  }

  withLatestFromButtonClicked() {
    /*
    I call withLatestFrom operator the primary/secondary operator.
    At first, the primary must meet the secondary.
    After that, the primary will take the lead, giving command.
    The secondary will follow.
    */
    console.log('=======withLatestFromButtonClicked=======');

    this.color$
      .pipe(withLatestFrom(this.logo$))
      .subscribe(([color, logo]) => console.log(`${color} shirt with ${logo}`));

    this.nextButtonClicked();
    this.setNewSubjects();
  }

  forkjoinTakeFirstButtonClicked() {
    const firstColor$ = this.color$.pipe(take(1));
    const firstLogo$ = this.logo$.pipe(first());

    console.log('=======forkjoinFirstButtonClicked=======');

    forkJoin([firstColor$, firstLogo$]).subscribe(([color, logo]) =>
      console.log(`${color} shirt with ${logo}`)
    );

    this.nextButtonClicked();
    this.forkJoinCompeteButtonClicked();
    this.setNewSubjects();
  }

  forkJoinButtonClicked() {
    /*
    forkJoin is a special case of combineLatest.
    It will wait for all observables to complete.
    */
    console.log('=======forkJoinButtonClicked=======');

    forkJoin([this.color$, this.logo$]).subscribe(([color, logo]) =>
      console.log(`${color} shirt with ${logo}`)
    );

    this.nextButtonClicked();
    this.forkJoinCompeteButtonClicked();
    this.setNewSubjects();
  }

  nextButtonClicked() {
    this.color$.next('white');
    this.logo$.next('fish');

    this.color$.next('green');
    this.logo$.next('dog');

    this.color$.next('red');
    this.logo$.next('bird');

    this.color$.next('blue');
  }

  forkJoinCompeteButtonClicked() {
    this.color$.complete();
    this.logo$.complete();
  }
}
