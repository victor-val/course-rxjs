import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  fromEvent,
  map,
  Subscription,
  debounceTime,
  tap,
  merge,
  scan,
  filter,
  distinctUntilChanged,
  zip,
  forkJoin,
  endWith,
  concat,
  mergeMap,
} from 'rxjs';
import { displayLog } from '../../shared/display-log';
import { api } from './api';

@Component({
  selector: 'app-23-hoo-mergeall-mergemap',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>23-hoo-mergeall-mergemap works!</p>
    <h1>Get some comments</h1>
    <button id="btn">Click me!</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MergeAllComponent implements OnInit {
  subscription = new Subscription();

  ngOnInit() {
    const button = document.getElementById('btn')!!;

    const getComments = () => {
      //get observables from fake REST API.
      const comment1$ = api.getComment(1);
      const comment2$ = api.getComment(2);
      const comment3$ = api.getComment(3);
      const comment4$ = api.getComment(4);

      //subscribe to all the observables to get and display comments
      return concat(comment1$, comment2$, comment3$, comment4$).pipe(
        map(({id, comment}: any)=> `#${id} - ${comment}`),
        endWith('--------//--------')
      );
    };

    const observable2$ = api.getComment(1).pipe(map(({id, comment}: any)=> `#${id} - ${comment}`));

    /** get comments on button click */
    fromEvent(button, 'click')
      .pipe( //pipe y mergeMap en vez de otro subscribe mas
        mergeMap((evt) => getComments()),
        tap(console.log)
      )
      .subscribe(displayLog);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
